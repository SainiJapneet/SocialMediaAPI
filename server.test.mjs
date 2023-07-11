// Import the necessary modules and functions
import request from 'supertest';
import app from './server'; // Assuming you have exported the Express app from server.mjs

describe('User Registration and Login', () => {
  let userToken = '';

  // Test the user registration endpoint
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'John Doe',
        userName: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Created new User');
    expect(response.body.result.name).toBe('John Doe');
    expect(response.body.result.userName).toBe('johndoe');
    expect(response.body.result.email).toBe('john@example.com');
  });

  // Test the user login endpoint
  it('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged In');
    expect(response.body.email).toBe('john@example.com');
    expect(response.body.token).toBeDefined();

    userToken = response.body.token; // Save the token for later use in authenticated requests
  });

  // Test an authenticated request using the user token
  it('should get the user profile', async () => {
    const response = await request(app)
      .get('/api/getUser')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});