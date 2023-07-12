import request from 'supertest';
import { expect } from 'chai';
import app from './server.mjs';

describe('User Registration and Login', () => {
  let userToken = '';

  // Test the user registration endpoint
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        userName: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Created new User');
    expect(response.body.result.name).to.equal('John Doe');
    expect(response.body.result.userName).to.equal('johndoe');
    expect(response.body.result.email).to.equal('johndoe@example.com');
  });

  // Test the user login endpoint
  it('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Logged In');
    expect(response.body.email).to.equal('johndoe@example.com');
    expect(response.body.token).to.exist;

    userToken = response.body.token;
  });

  // Test the getUser endpoint
  it('should get all users', async () => {
    const response = await request(app)
      .get('/getUser')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });

  // Test the addPost endpoint
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/addPost')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'New Post',
        content: 'This is a new post',
        tags: ['#tag1', '#tag2'],
      });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('New post created');
    expect(response.body.result.title).to.equal('New Post');
    expect(response.body.result.content).to.equal('This is a new post');
    expect(response.body.result.tags).to.deep.equal(['#tag1', '#tag2']);
  });
});
