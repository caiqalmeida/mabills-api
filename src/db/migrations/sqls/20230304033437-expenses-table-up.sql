/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS expenses (
ID SERIAL PRIMARY KEY,
DATE DATE,
CATEGORY VARCHAR(255),
DESCRIPTION VARCHAR(255),
TOTAL_VALUE INT);