/* Replace with your SQL commands */
CREATE TYPE roles AS ENUM ('user', 'admin');
ALTER TABLE users
    ADD COLUMN email VARCHAR(15),
    ADD COLUMN role roles;