# Team Daily Tracker

A minimal FastAPI + MongoDB application for team members to submit daily plans and end-of-day updates, and for team leads to manage users and generate weekly AI summaries with PDF export.

## Features

- Session-based login for team leads and team members
- Team lead user management
- Team lead self-service password change from the admin dashboard
- Add member by email, with first name as default password
- Disable or re-enable member accounts
- Reset member password back to the first name
- Member self-service password change from the member dashboard
- Member daily update form for plan, completed work, extra work, challenges, ETA, proof of work, client, and category
- Team lead dashboard to filter updates by date or name
- Weekly report generation using Gemini 2.5 Flash when `GEMINI_API_KEY` is configured
- Editable report preview before confirmation
- PDF download and saved report history in Mongo
- CLI script to reset any user password by email

## Project Structure

- `app/main.py`: FastAPI entry point
- `app/routers/`: auth, member, and admin routes
- `app/services/ai_summary.py`: Gemini summary generation with local fallback
- `app/services/report_pdf.py`: PDF rendering
- `app/templates/`: Bootstrap templates
- `scripts/create_lead.py`: CLI for creating additional team lead accounts
- `scripts/reset_password.py`: CLI for resetting any user password by email

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and update the values.
4. Ensure MongoDB is running locally or update `MONGODB_URL`.
5. Start the app:

```bash
uvicorn app.main:app --reload
```

6. Open `http://127.0.0.1:8000/login`.

## Default Lead Account

On first startup, the application seeds one team lead account from `.env`:

- `DEFAULT_ADMIN_EMAIL`
- `DEFAULT_ADMIN_PASSWORD`

## Create Additional Team Leads

Use this command to add more TL accounts:

```bash
python -m scripts.create_lead --email demotla@iamneo.ai --first-name demo --last-name tl --password admin
```

## Reset Any User Password by Email

Use this command when you want to reset a team lead or team member password directly from the terminal:

```bash
python scripts/reset_password.py --email lead@example.com --new-password NewStrongPassword123
```

## Gemini Integration

To enable AI summaries, set:

- `GEMINI_API_KEY`
- `GEMINI_MODEL=gemini-2.5-flash`

If the Gemini call fails or the API key is missing, the app falls back to a deterministic local summary so report generation still works.

## Notes

- Team members are scoped to a single team lead through `lead_id`.
- Finalized weekly reports are stored in MongoDB and can be reopened or downloaded later.
- The frontend is intentionally minimal and server-rendered with Jinja2 and Bootstrap.


### azure - CI/CD ###