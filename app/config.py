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

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
