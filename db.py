import sqlite3

conn = sqlite3.connect("komponenter.db")

c = conn.cursor

c.execute("""
CREATE TABLE IF NOT EXISTS produkter (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name        TEXT NOT NULL,
    spec        TEXT,
    price       INTEGER NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    active      INTEGER DEFAULT 1
  );
)


""")