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
        name: 'Jimmy',
        userName: 'jimmy',
        email: 'jimmy@gmail.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Created new User');
    expect(response.body.result.name).toBe('Jimmy');
    expect(response.body.result.userName).toBe('jimmy');
    expect(response.body.result.email).toBe('jimmy@gmail.com');
  });

  // Test the user login
  it('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'jimmy@gmail.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged In');
    expect(response.body.email).toBe('jimmy@gmail.com');
    expect(response.body.token).toBeDefined();

    userToken = response.body.token; 
  });

  it('should get the user profile', async () => {
    const response = await request(app)
      .get('/api/getUser')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});