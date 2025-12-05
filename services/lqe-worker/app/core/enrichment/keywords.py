FILTER_KEYWORDS = [
    "filtration",
    "hvac",
    "filter",
    "dust collector",
    "air filter",
    "hepa",
    "cleanroom",
    "industrial",
    "ventilation",
]


def keyword_score(text: str) -> int:
    text = text.lower()
    found = sum(1 for kw in FILTER_KEYWORDS if kw in text)
    if found == 0:
        return 10
    elif found == 1:
        return 40
    elif found == 2:
        return 60
    elif found == 3:
        return 75
    return 90
