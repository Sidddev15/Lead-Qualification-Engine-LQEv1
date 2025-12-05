from fastapi import APIRouter, HTTPException
from uuid import uuid4
from datetime import datetime, timezone
from typing import List

from app.core.models import (
    LQERunRequest,
    LQERunResponse,
    LQERunLead,
    ScoreBreakdown,
)
from app.core.extraction import extract_companies_from_uploads
from app.core.enrichment.enrich_main import enrich_company

router = APIRouter()


def _tier_from_score(score: int) -> str:
    if score >= 90:
        return "HOT"
    if score >= 70:
        return "WARM"
    if score >= 40:
        return "COLD"
    return "IGNORE"


@router.post("/pipeline/run", response_model=LQERunResponse)
async def run_pipeline(payload: LQERunRequest) -> LQERunResponse:
    if payload.inputMode == "manual":
        if not payload.companies:
            raise HTTPException(400, "companies is required in manual mode")
        companies = payload.companies
    else:
        if not payload.uploadContext:
            raise HTTPException(400, "uploadContext missing")
        companies = extract_companies_from_uploads(
            payload.uploadContext, payload.inputMode
        )

    enriched = []
    for name in companies:
        data = enrich_company(name)
        enriched.append((name, data))

    leads: List[LQERunLead] = []

    for name, info in enriched:
        # temporary scoring logic
        scores = ScoreBreakdown(
            industryRelevance=info["keywordScore"],
            contactQuality=50 + len(info["emails"]) * 10,
            companySize=info["companySizeScore"],
            webPresence=80 if info["website"] else 30,
            linkedinActivity=60 if info["linkedin"] else 20,
            keywordMatch=info["keywordScore"],
            finalScore=min(
                100,
                int(
                    0.3 * info["keywordScore"]
                    + 0.2 * (50 + len(info["emails"]) * 10)
                    + 0.2 * info["companySizeScore"]
                    + 0.2 * (80 if info["website"] else 30)
                    + 0.1 * (60 if info["linkedin"] else 20)
                ),
            ),
        )

        tier = _tier_from_score(scores.finalScore)

        notes = f"Detected website: {info['website']}. Keyword score={info['keywordScore']}."

        leads.append(
            LQERunLead(
                id=str(uuid4()),
                companyName=name,
                website=info["website"],
                emails=info["emails"],
                phones=info["phones"],
                linkedin=info["linkedin"],
                scores=scores,
                tier=tier,  # type: ignore
                notes=notes,
            )
        )

    run_id = str(uuid4())
    meta = {
        "inputMode": payload.inputMode,
        "totalCompanies": len(leads),
        "processedAt": datetime.now(timezone.utc).isoformat(),
    }

    return LQERunResponse(runId=run_id, leads=leads, meta=meta)
