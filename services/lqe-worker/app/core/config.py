import os


class Settings:
    @property
    def env(self) -> str:
        return os.getenv("PY_ENV", "development")

    @property
    def port(self) -> int:
        return int(os.getenv("LQE_WORKER_PORT", "8000"))

    @property
    def upload_dir(self) -> str:
        # must watch Node API upload dir in dev
        return os.getenv("LQE_WORKER_UPLOAD_DIR", "/tmp/lqe-uploads")


settings = Settings()
