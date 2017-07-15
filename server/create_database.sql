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

copy pokemon from '/Users/kevin/git/name-that-mon/server/pokemon-data.csv' DELIMITERS ',' CSV HEADER;
-- copy pokemon from '/Users/kwhi32/Projects/name-that-mon/server/pokemon-data.csv' DELIMITERS ',' CSV HEADER;
