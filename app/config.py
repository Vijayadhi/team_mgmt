from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    mongodb_url: str = Field(alias="MONGODB_URL")
    mongodb_db: str = Field(alias="MONGODB_DB")
    session_secret: str = Field(alias="SESSION_SECRET")
    default_admin_email: str = Field(alias="DEFAULT_ADMIN_EMAIL")
    default_admin_firstname: str = Field(alias="DEFAULT_ADMIN_FIRSTNAME")
    default_admin_lastname: str = Field(alias="DEFAULT_ADMIN_LASTNAME")
    default_admin_password: str = Field(alias="DEFAULT_ADMIN_PASSWORD")
    gemini_api_key: str | None = Field(default=None, alias="GEMINI_API_KEY")
    gemini_model: str = Field(default="gemini-2.5-flash", alias="GEMINI_MODEL")
    smtp_host: str = Field(default="smtp.gmail.com", alias="SMTP_HOST")
    smtp_port: int = Field(default=587, alias="SMTP_PORT")
    smtp_user: str | None = Field(default=None, alias="SMTP_USER")
    smtp_password: str | None = Field(default=None, alias="SMTP_PASSWORD")
    smtp_from_email: str | None = Field(default=None, alias="SMTP_FROM_EMAIL")
    smtp_use_tls: bool = Field(default=True, alias="SMTP_USE_TLS")
    app_timezone: str = Field(default="Asia/Kolkata", alias="APP_TIMEZONE")
    allowed_hosts: str = Field(default="*", alias="ALLOWED_HOSTS")
    external_trigger_token: str | None = Field(default=None, alias="EXTERNAL_TRIGGER_TOKEN")
    rate_limit_per_minute: int = Field(default=180, alias="RATE_LIMIT_PER_MINUTE")
    auth_rate_limit_per_minute: int = Field(default=30, alias="AUTH_RATE_LIMIT_PER_MINUTE")
    max_request_bytes: int = Field(default=1_048_576, alias="MAX_REQUEST_BYTES")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
