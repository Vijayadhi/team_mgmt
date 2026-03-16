# API Endpoints

Base path: `/api`

Session and auth:
- `GET /api/session`
  Returns the logged-in user, role, and app title.
- `POST /api/logout`
  Clears the current session.

Notifications:
- `GET /api/notifications`
  Returns the latest notifications for the logged-in user.
- `POST /api/notifications/{notification_id}/read`
  Marks a notification as read.

Lead dashboard and settings:
- `GET /api/admin/dashboard`
  Returns the full lead dashboard payload.
- `POST /api/admin/team-name`
  Body: `{ "team_name": "..." }`
- `POST /api/admin/missed-days-range`
  Body: `{ "missed_days_from": "YYYY-MM-DD", "missed_days_to": "YYYY-MM-DD" }`
- `POST /api/admin/change-password`
  Body: `{ "current_password": "...", "new_password": "...", "confirm_password": "..." }`

Lead member management:
- `POST /api/admin/users`
  Body: `{ "first_name": "...", "last_name": "...", "email": "..." }`
- `POST /api/admin/users/{user_id}/toggle`
- `POST /api/admin/users/{user_id}/reset-password`

Lead approvals and compliance:
- `POST /api/admin/requests/{request_id}/approve`
- `POST /api/admin/requests/{request_id}/reject`
- `POST /api/admin/requests/{request_id}/reset`
- `POST /api/admin/missing-days/leave`
  Body: `{ "user_id": "...", "missing_dates": ["YYYY-MM-DD"], "reason": "..." }`
- `POST /api/admin/missing-days/warning`
  Body: `{ "user_id": "...", "missing_dates": ["YYYY-MM-DD"] }`

Lead reports:
- `POST /api/admin/reports/generate`
  Body: `{ "week_start": "YYYY-MM-DD", "week_end": "YYYY-MM-DD" }`
- `GET /api/admin/reports/{report_id}`
  Returns the editable report payload.
- `POST /api/admin/reports/{report_id}/save`
  Saves and finalizes the edited report.
- `POST /api/admin/reports/{report_id}/delete`
  Deletes a stored weekly report.

Lead task management:
- `POST /api/admin/tasks`
  Body: `{ "assignee_id": "...", "title": "...", "description": "...", "eta": "YYYY-MM-DD", "remarks": "...", "status": "todo|in_progress|blocked|done" }`
- `GET /api/tasks`
  Returns assigned tasks for the current lead or member.
- `POST /api/tasks/{task_id}`
  Lead can edit assignment fields; member can update status, proof, and acknowledgement.

Member dashboard and updates:
- `GET /api/member/dashboard`
  Query params:
  - `section`
  - `edit_date`
  - `request_date`
- `GET /api/member/daily-update-status`
  Query params:
  - `target_date`
- `POST /api/member/daily-update`
  Body:
  ```json
  {
    "entry_date": "YYYY-MM-DD",
    "plan": "...",
    "extra_work": "...",
    "challenges": "...",
    "eta": "...",
    "delivery_mode": "wfh|client_place|in_office",
    "batch_name": "...",
    "track_name": "...",
    "proof_of_work": "...",
    "client_name": "...",
    "request_reason": "...",
    "is_corporate": true,
    "is_university": false
  }
  ```
- `POST /api/member/change-password`
  Body: `{ "current_password": "...", "new_password": "...", "confirm_password": "..." }`

Member todo:
- `GET /api/member/todos`
  Query params:
  - `deadline_from`
  - `deadline_to`
  - `completion`
- `POST /api/member/todos`
- `POST /api/member/todos/{todo_id}`

External trigger endpoint:
- `POST /api/external/missed-days/audit`
  Required header:
  - `X-Trigger-Token: <EXTERNAL_TRIGGER_TOKEN>`
  Body:
  ```json
  {
    "from_date": "YYYY-MM-DD",
    "to_date": "YYYY-MM-DD",
    "send_emails": true,
    "lead_email": "optional-lead@example.com"
  }
  ```
  Behavior:
  - returns each member with missing dates in the requested range
  - sends mail only to the member when missed count is `1`
  - sends mail to both member and TL when missed count is greater than `1`

Notes:
- All `/api/*` endpoints except the external trigger require a valid session cookie.
- The external trigger endpoint is intended for AWS Lambda, cron jobs, Postman, or scheduler integrations.
- Member past-date edits continue to create approval requests instead of directly mutating approved history.
