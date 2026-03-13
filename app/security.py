import secrets
from hashlib import pbkdf2_hmac

import bcrypt


PBKDF2_ITERATIONS = 600_000
PBKDF2_PREFIX = "pbkdf2_sha256"


def _pbkdf2_hash(password: str, salt: bytes) -> str:
    digest = pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return digest.hex()


def hash_password(password: str) -> str:
    cleaned = password.strip()
    salt = secrets.token_hex(16)
    checksum = _pbkdf2_hash(cleaned, bytes.fromhex(salt))
    return f"{PBKDF2_PREFIX}${PBKDF2_ITERATIONS}${salt}${checksum}"


def _verify_pbkdf2(plain_password: str, hashed_password: str) -> bool:
    try:
        _, iterations, salt, checksum = hashed_password.split("$", 3)
        derived = pbkdf2_hmac(
            "sha256",
            plain_password.encode("utf-8"),
            bytes.fromhex(salt),
            int(iterations),
        ).hex()
        return secrets.compare_digest(derived, checksum)
    except Exception:
        return False


def _verify_bcrypt(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8"),
        )
    except Exception:
        return False


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password:
        return False
    if hashed_password.startswith(f"{PBKDF2_PREFIX}$"):
        return _verify_pbkdf2(plain_password, hashed_password)
    if hashed_password.startswith("$2"):
        return _verify_bcrypt(plain_password, hashed_password)
    return False
