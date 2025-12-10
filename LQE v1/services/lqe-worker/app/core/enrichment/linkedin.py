import re

LINKEDIN_PATTERN = re.compile(
    r"(https?://(?:www\.)?linkedin\.com/company/[A-Za-z0-9\-_/]+)", flags=re.IGNORECASE
)


def detect_linkedin(text: str) -> str | None:
    m = LINKEDIN_PATTERN.search(text)
    return m.group(1) if m else None
