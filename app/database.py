from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config import get_settings


class Database:
    client: AsyncIOMotorClient | None = None
    db: AsyncIOMotorDatabase | None = None


database = Database()


async def connect_to_mongo() -> None:
    settings = get_settings()
    database.client = AsyncIOMotorClient(settings.mongodb_url)
    database.db = database.client[settings.mongodb_db]
    await ensure_indexes()


async def close_mongo_connection() -> None:
    if database.client:
        database.client.close()


def get_database() -> AsyncIOMotorDatabase:
    if database.db is None:
        raise RuntimeError("Database is not initialized")
    return database.db


async def ensure_indexes() -> None:
    db = get_database()
    await db.users.create_index("email", unique=True)
    await db.daily_updates.create_index([("user_id", 1), ("date", 1)], unique=True)
    await db.daily_updates.create_index([("lead_id", 1), ("date", -1)])
    await db.weekly_reports.create_index([("lead_id", 1), ("week_start", -1), ("week_end", -1)])
    await db.update_requests.create_index([("lead_id", 1), ("status", 1), ("created_at", -1)])
    await db.update_requests.create_index([("user_id", 1), ("date", 1), ("status", 1)])
    await db.notification_logs.create_index([("type", 1), ("user_id", 1), ("target_date", 1)], unique=True)
    await db.leave_days.create_index([("user_id", 1), ("date", 1)], unique=True)
