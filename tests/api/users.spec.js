const { test, expect } = require('../../fixtures/apiFixtures');

test.describe('Users API — reqres.in', () => {
  test('GET /users returns a paginated list of users', async ({ soManager }) => {
    const { status, body } = await soManager.getUsers(1);

    expect(status).toBe(200);
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /users/:id returns a single user', async ({ soManager }) => {
    const { status, body } = await soManager.getUserById(2);

    expect(status).toBe(200);
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
  });

  test('GET /users/:id returns 404 for a non-existent user', async ({ soManager }) => {
    const { status } = await soManager.getUserById(9999);

    expect(status).toBe(404);
  });

  test('POST /users creates a new user and returns 201', async ({ soManager }) => {
    const { status, body } = await soManager.createUser('Jane Doe', 'QA Engineer');

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'Jane Doe');
    expect(body).toHaveProperty('job', 'QA Engineer');
    expect(body).toHaveProperty('createdAt');
  });

  test('PUT /users/:id updates a user and returns 200', async ({ soManager }) => {
    const { status, body } = await soManager.updateUser(2, 'Jane Doe', 'Senior QA');

    expect(status).toBe(200);
    expect(body).toHaveProperty('name', 'Jane Doe');
    expect(body).toHaveProperty('job', 'Senior QA');
    expect(body).toHaveProperty('updatedAt');
  });
});
