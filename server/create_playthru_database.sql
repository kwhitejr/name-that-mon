CREATE DATABASE name_that_mon;

\c name_that_mon;

DROP TABLE IF EXISTS playthru;

CREATE TABLE playthru(
   id serial primary key,
   user_initials text,
   quiz_type text not null,
   quiz_set text,
   start_time bigint,
   end_time bigint,
   clue_count int,
   correct_answer_stack int[], -- array of pokemon ids
   wrong_answer int REFERENCES pokemon (id) -- pokemon id
);

-- ALTER TABLE playthru ALTER COLUMN id SET DEFAULT 1;