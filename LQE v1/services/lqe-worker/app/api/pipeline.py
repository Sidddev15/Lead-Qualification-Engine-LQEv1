from fastapi import APIRouter, HTTPException
from uuid import uuid4
from datetime import datetime, timezone
from typing import List

from app.core.models import (
    LQERunRequest,
    LQERunResponse,
    LQERunLead,
)
from app.core.extraction import extract_companies_from_uploads
from app.core.enrichment.enrich_main import enrich_company
from app.core.scoring import compute_scores_from_enrichment

router = APIRouter()


@router.post("/pipeline/run", response_model=LQERunResponse)
async def run_pipeline(payload: LQERunRequest) -> LQERunResponse:
    # 1. Extract companies
    if payload.inputMode == "manual":
        if not payload.companies:
            raise HTTPException(400, "companies is required in manual mode")
        companies = payload.companies
        source_files = 0
        extracted_count = len(companies)
    else:
        if not payload.uploadContext:
            raise HTTPException(400, "uploadContext is required for file modes")

        companies = extract_companies_from_uploads(
            payload.uploadContext, payload.inputMode
        )
        source_files = len(payload.uploadContext.files)
        extracted_count = len(companies)

    # 2. Enrich each company
    enriched = []
    for name in companies:
        data = enrich_company(name)
        enriched.append((name, data))

    # 3. Score + build leads
    leads: List[LQERunLead] = []

    for name, info in enriched:
        scores, tier, reasons, notes = compute_scores_from_enrichment(name, info)

        leads.append(
            LQERunLead(
                id=str(uuid4()),
                companyName=name,
                website=info.get("website"),
                emails=info.get("emails", []) or [],
                phones=info.get("phones", []) or [],
                linkedin=info.get("linkedin"),
                scores=scores,
                tier=tier,  # type: ignore
                notes=notes,
                reasons=reasons,
            )
        )

    # 4. Response Meta
    run_id = str(uuid4())
    meta = {
        "inputMode": payload.inputMode,
        "totalCompanies": len(leads),
        "processedAt": datetime.now(timezone.utc).isoformat(),
        "extraction": {
            "sourceFiles": source_files,
            "extractedCompanies": extracted_count,
        },
    }

    return LQERunResponse(runId=run_id, leads=leads, meta=meta)
