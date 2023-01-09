import client from '../providers/database.provider';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds: string = process.env.SALT_ROUNDS || '10';
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
};

export type UserUpdate = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find the user ${id} Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(
        u.password + pepper,
        parseInt(saltRounds)
      );
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await client.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hashedPassword
      ]);
      const newUser = result.rows[0];
      return newUser;
    } catch (err) {
      throw new Error(`Could not create new user. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await client.query(sql, [id]);
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Could not delete the user ${id}. Error: ${err}`);
    }
  }

  async update(id: string, u: UserUpdate): Promise<UserUpdate> {
    try {
      let setClause: string = '';
      const values: (string | number)[] = [id];

      if (u.first_name) {
        setClause += 'first_name = ($2),';
        values.push(u.first_name);
      }

      if (u.last_name) {
        setClause += 'last_name = ($3),';
        values.push(u.last_name);
      }

      // Remove the trailing comma from the setClause
      setClause = setClause.slice(0, -1);

      const sql = `UPDATE users SET ${setClause} WHERE id = ($1) RETURNING *`;
      const result = await client.query(sql, values);
      const updatedUser = result.rows[0];
      return updatedUser;
    } catch (err) {
      throw new Error(`Could not update user ${u.id}. Error: ${err}`);
    }
  }
}