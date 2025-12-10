import re

PHONE_PATTERN = re.compile(
    r"\b(?:\+?\d{1,3}[-.\s]?)?(?:\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4})\b"
)


def extract_phones(text: str) -> list[str]:
    return list(set(PHONE_PATTERN.findall(text)))
