DROP TABLE IF EXISTS todos;
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO todos (text, completed) VALUES ('Deploy to Cloudflare Workers', 0);
INSERT INTO todos (text, completed) VALUES ('Buy Groceries', 1);
