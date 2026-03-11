import argparse
import asyncio
from datetime import datetime, timezone

from app.database import close_mongo_connection, connect_to_mongo, get_database
from app.security import hash_password


async def main() -> None:
    parser = argparse.ArgumentParser(description="Create a new team lead account")
    parser.add_argument("--email", required=True)
    parser.add_argument("--first-name", required=True)
    parser.add_argument("--last-name", default="")
    parser.add_argument("--password", required=True)
    parser.add_argument("--team-name", default="Team Daily Tracker")
    args = parser.parse_args()

    await connect_to_mongo()
    db = get_database()
    existing = await db.users.find_one({"email": args.email.lower()})
    if existing:
        print("A user with this email already exists.")
        await close_mongo_connection()
        return

    await db.users.insert_one(
        {
            "first_name": args.first_name.strip(),
            "last_name": args.last_name.strip(),
            "email": args.email.lower().strip(),
            "password_hash": hash_password(args.password),
            "role": "lead",
            "team_name": args.team_name.strip() or "Team Daily Tracker",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
        }
    )
    await close_mongo_connection()
    print("Team lead created successfully.")


if __name__ == "__main__":
    asyncio.run(main())
