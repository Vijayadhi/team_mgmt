import argparse
import asyncio

from app.database import close_mongo_connection, connect_to_mongo, get_database
from app.security import hash_password


async def main() -> None:
    parser = argparse.ArgumentParser(description="Reset a user password by email")
    parser.add_argument("--email", required=True)
    parser.add_argument("--new-password", required=True)
    args = parser.parse_args()

    await connect_to_mongo()
    db = get_database()
    user = await db.users.find_one({"email": args.email.lower().strip()})
    if not user:
        print("No user found with that email.")
        await close_mongo_connection()
        return

    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"password_hash": hash_password(args.new_password.strip())}},
    )
    await close_mongo_connection()
    print("Password updated successfully.")


if __name__ == "__main__":
    asyncio.run(main())
