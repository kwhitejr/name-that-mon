-- CREATE DATABASE name_that_mon;

-- \c name_that_mon;

DROP TABLE IF EXISTS answer_count;

DROP TABLE IF EXISTS answer;

CREATE TABLE answer(
  id serial primary key,
  pokemon_id int REFERENCES pokemon (id),
  playthru_id int REFERENCES playthru (id),
  was_correct boolean
);

