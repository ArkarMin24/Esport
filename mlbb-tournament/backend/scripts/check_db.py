import sqlite3
from pathlib import Path
p = Path(__file__).resolve().parent.parent / 'db.sqlite3'
print('DB Path:', p)
if not p.exists():
    print('DB does not exist')
else:
    con = sqlite3.connect(str(p))
    cur = con.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
    rows = cur.fetchall()
    print('Tables:', [r[0] for r in rows])
    # check for django_session
    print('has django_session?', any(r[0]=='django_session' for r in rows))
