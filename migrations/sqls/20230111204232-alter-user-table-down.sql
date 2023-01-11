/* Replace with your SQL commands */
DROP TYPE roles;
ALTER TABLE users
  DROP COLUMN email,
  DROP COLUMN role;