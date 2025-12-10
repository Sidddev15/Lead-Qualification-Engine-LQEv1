import re
import requests
import tldextract

URL_PATTERN = re.compile(
    r"(https?://[A-Za-z0-9.\-]+\.[A-Za-z]{2,})(?:/[\w\-./?%&=]*)?", flags=re.IGNORECASE
)


def detect_website(text: str) -> str | None:
    matches = URL_PATTERN.findall(text)
    if matches:
        return matches[0]

    domain_pattern = re.compile(r"\b([A-Za-z0-9\-]+\.[A-Za-z]{2,})\b")
    m = domain_pattern.search(text)
    if m:
        return f"http://{m.group(1)}"

    return None


def probe_website(url: str) -> bool:
    try:
        r = requests.head(url, timeout=3)
        return r.status_code < 400
    except:
        return False


def normalize_website(url: str) -> str:
    if not url:
        return None

    if not url.startswith("http"):
        url = "http://" + url

        # standardize
        extracted = tldextract.extract(url)
        domain = f"{extracted.domain}.{extracted.suffix}"
        return f"http://{domain}"
