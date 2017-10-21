CREATE DATABASE name_that_mon;

\c name_that_mon

DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon(
   id int primary key not null,
   name text not null,
   type1 text not null,
   type2 text,
   total int,
   hp int,
   attack int,
   defense int,
   special_attack int,
   special_defense int,
   speed int,
   generation int not null,
   legendary boolean
);

-- copy pokemon from '/Users/kevin/git/name-that-mon/server/pokemon-data.csv' DELIMITERS ',' CSV HEADER;
-- copy pokemon from '/Users/kwhi32/Projects/name-that-mon/server/pokemon-data.csv' DELIMITERS ',' CSV HEADER;
-- /home/admin/apps/name-that-mon/server
copy pokemon from './server/pokemon-data.csv' DELIMITERS ',' CSV HEADER;

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

DROP TABLE IF EXISTS answer;

CREATE TABLE answer(
  id serial primary key,
  pokemon_id int REFERENCES pokemon (id),
  playthru_id int REFERENCES playthru (id),
  was_correct boolean
);

-- pg_ctl -D /usr/local/var/postgres9.6 -l logfile start

/*
pg_upgrade \
  -d /usr/local/var/postgres \
  -D /usr/local/var/postgres9.6 \
  -b /usr/local/Cellar/postgresql/9.5.4_1/bin/ \
  -B /usr/local/Cellar/postgresql/9.6.3/bin/ \
  -v

mv /usr/local/var/postgres /usr/local/var/postgres9.5
mv /usr/local/var/postgres9.6 /usr/local/var/postgres

*/