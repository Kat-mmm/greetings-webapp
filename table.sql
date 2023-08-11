CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    greet_count INT NOT NULL DEFAULT 0
);