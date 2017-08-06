CREATE DATABASE name_that_mon;

\c name_that_mon;

DROP TABLE IF EXISTS answer_count;

CREATE TABLE answer_count(
   id int REFERENCES pokemon (id),
   correct_count int,
   incorrect_count int,
);

-- ALTER TABLE playthru ALTER COLUMN id SET DEFAULT 1;