-- CREATE DATABASE aabea

--\c aabea

CREATE TABLE users(

id serial PRIMARY KEY,
username VARCHAR ( 255 ) UNIQUE NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL,
password VARCHAR ( 255 ) NOT NULL,
isAdmin BOOLEAN NOT NULL,
createdAt TIMESTAMP NOT NULL,
updatedAt TIMESTAMP NOT NULL
)

 
        