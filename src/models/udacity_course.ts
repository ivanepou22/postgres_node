import client from '../database';

export type Course = {
  course_id: number;
  name: string;
  duration: number;
  description: string;
};
export class UdacityCourseStore {
  //read from database
  async index(): Promise<Course[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM udacity_courses';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get Courses ${error}`);
    }
  }

  async show(id: string): Promise<Course> {
    try {
      const sql = 'SELECT * FROM udacity_courses WHERE course_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find course ${id}. Error: ${err}`);
    }
  }

  async create(c: Course): Promise<Course> {
    try {
      const sql =
        'INSERT INTO udacity_courses (name, duration, description) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [c.name, c.duration, c.description]);

      const course = result.rows[0];

      conn.release();

      return course;
    } catch (err) {
      throw new Error(`Could not add new course ${c.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Course> {
    try {
      const sql = 'DELETE FROM udacity_courses WHERE course_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const course = result.rows[0];

      conn.release();

      return course;
    } catch (err) {
      throw new Error(`Could not delete course ${id}. Error: ${err}`);
    }
  }
}
