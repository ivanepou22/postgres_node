import { Course, UdacityCourseStore } from '../courses.model';

const store = new UdacityCourseStore();

describe('Udacity Course model', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of courses', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
