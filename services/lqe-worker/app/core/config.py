import os


class Settings:
    @property
    def env(self) -> str:
        return os.getenv("PY_ENV", "development")

    @property
    def port(self) -> int:
        return int(os.getenv("LQE_WORKER_PORT", "8000"))


settings = Settings()
