"""Application configuration loaded from environment variables."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with defaults for local development."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Hackathon Project"
    debug: bool = True

    database_url: str = "sqlite+aiosqlite:///./app.db"

    anthropic_api_key: str
    anthropic_model: str = "claude-sonnet-4-20250514"


settings = Settings()