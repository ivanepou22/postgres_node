import client from '../providers/database.provider';

export type Course = {
  id?: number;
  name: string;
  duration: number;
  description: string;
};

export type CourseUpdate = {
  course_id?: number;
  name?: string;
  duration?: number;
  description?: string;
};
export class UdacityCourseStore {
  //read from database
  async index(): Promise<Course[]> {
    try {
      const sql = 'SELECT * FROM udacity_courses';
      const result = await client.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get Courses ${error}`);
    }
  }

  async show(id: string): Promise<Course> {
    try {
      const sql = 'SELECT * FROM udacity_courses WHERE id=($1)';
      const result = await client.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find course ${id}. Error: ${err}`);
    }
  }

  async create(c: Course): Promise<Course> {
    try {
      const sql =
        'INSERT INTO udacity_courses (name, duration, description) VALUES($1, $2, $3) RETURNING *';
      const result = await client.query(sql, [
        c.name,
        c.duration,
        c.description
      ]);
      const course = result.rows[0];
      return course;
    } catch (err) {
      throw new Error(`Could not add new course ${c.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Course> {
    try {
      const sql = 'DELETE FROM udacity_courses WHERE id=($1) RETURNING *';
      const result = await client.query(sql, [id]);
      const course = result.rows[0];
      return course;
    } catch (err) {
      throw new Error(`Could not delete course ${id}. Error: ${err}`);
    }
  }

  async update(id: string, c: CourseUpdate): Promise<CourseUpdate> {
    try {
      let updates: string[] = [];
      let values: (string | number)[] = [];

      if (c.name) {
        updates.push(`name = $${values.length + 1}`);
        values.push(c.name);
      }
      if (c.duration) {
        updates.push(`duration = $${values.length + 1}`);
        values.push(c.duration);
      }
      if (c.description) {
        updates.push(`description = $${values.length + 1}`);
        values.push(c.description);
      }
      values.push(id);

      const sql = `UPDATE udacity_courses
                   SET ${updates.join(', ')}
                   WHERE id = $${values.length}
                   RETURNING *`;

      const result = await client.query(sql, values);
      const course = result.rows[0];
      return course;
    } catch (err) {
      throw new Error(`Could not update course ${id}. Error: ${err}`);
    }
  }
}
