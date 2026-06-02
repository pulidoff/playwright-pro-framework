const { test, expect } = require('../../fixtures/apiFixtures');

test.describe('Auth API — reqres.in', () => {
  const VALID_EMAIL    = 'eve.holt@reqres.in';
  const VALID_PASSWORD = 'cityslicka';

  test('POST /login with valid credentials returns a token', async ({ soManager }) => {
    const { status, body } = await soManager.login(VALID_EMAIL, VALID_PASSWORD);

    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('POST /login with missing password returns 400', async ({ soManager }) => {
    const { status, body } = await soManager.login(VALID_EMAIL, '');

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  test('POST /register with valid credentials returns id and token', async ({ soManager }) => {
    const { status, body } = await soManager.register(VALID_EMAIL, VALID_PASSWORD);

    expect(status).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');
  });

  test('POST /register without password returns 400', async ({ soManager }) => {
    const { status, body } = await soManager.register('sydney@fife', '');

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
