const express = require('express');
const Database = require('sqlite3');
const cors = require('cors');
const path = require('path');
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));
 
const db = new Database('pc komponenter.db');
 


db.exec(`
  CREATE TABLE IF NOT EXISTS kategori(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
  );

   CREATE TABLE IF NOT EXISTS produkter (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name        TEXT NOT NULL,
    spec        TEXT,
    price       INTEGER NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    active      INTEGER DEFAULT 1
  );
CREATE TABLE IF NOT EXISTS kunder (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT UNIQUE NOT NULL,
    phone      TEXT,
    address    TEXT,
    created_at TEXT DEFAULT 
  ); 

  CREATE TABLE IF NOT EXISTS bestilling (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_ref  TEXT UNIQUE NOT NULL,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    total      INTEGER NOT NULL,
    status     TEXT DEFAULT 'venter',
    notes      TEXT,
    created_at TEXT DEFAULT 
  );

  CREATE TABLE IF NOT EXISTS bestilling_items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id     INTEGER NOT NULL REFERENCES orders(id),
    product_id   INTEGER NOT NULL REFERENCES products(id),
    product_name TEXT NOT NULL,
    price        INTEGER NOT NULL
  );
`);
