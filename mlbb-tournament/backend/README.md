# MLBB Tournament API

## Setup

1. Install Python 3.11 or later.
2. From this `backend` folder, create and activate a virtual environment.
3. Install dependencies: `pip install -r requirements.txt`
4. Create the database: `python manage.py migrate`
5. Start the API: `python manage.py runserver`

## Admin dashboard

Create an administrator account with `python manage.py createsuperuser`, then visit `http://127.0.0.1:8000/admin/`.
The dashboard supports roster editing directly within each team, tournament capacity tracking, and filtered match management.

## Endpoints

- `GET /api/tournaments/` — tournament information
- `GET /api/tournaments/<id>/` — one tournament
- `GET /api/teams/?tournament=<id>` — registered teams
- `POST /api/teams/register/` — register a team and its five players
- `GET /api/matches/?tournament=<id>` — matches and statuses

### Registration payload

```json
{
  "tournament": 1,
  "name": "Skyforge Titans",
  "captain_name": "Aether",
  "email": "captain@example.com",
  "phone_number": "+1 555 0100",
  "players": [
    {"in_game_name": "Aether", "is_captain": true},
    {"in_game_name": "PlayerTwo"},
    {"in_game_name": "PlayerThree"},
    {"in_game_name": "PlayerFour"},
    {"in_game_name": "PlayerFive"}
  ]
}
```
