import re

EMAIL_PATTERN = re.compile(
    r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", flags=re.IGNORECASE
)


def extract_emails(text: str) -> list[str]:
    return list(set(EMAIL_PATTERN.findall(text)))
