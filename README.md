# Social Media API

This is a RESTful API for a social media application that allows users to register, log in, create posts, add comments, and perform other related operations.

## Features

- User registration: Users can register by providing their name, username, email, and password.
- User login: Registered users can log in using their email and password.
- Get user by ID: Retrieve user information by their user ID.
- Update user: Update user information such as name, username, and email.
- Delete user: Delete a user account.
- Create post: Authenticated users can create new posts by providing a title, content, and tags.
- Get post by ID: Retrieve a post by its ID.
- Update post: Update post information such as title, content, and tags.
- Delete post: Delete a post.
- Add comment: Authenticated users can add comments to a post by providing the content and post ID.
- Get comment by ID: Retrieve a comment by its ID.
- Update comment: Update comment content.
- Delete comment: Delete a comment.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`

## Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables in the `.env` file:

```plaintext
DB_URL=<MongoDB connection string>
SECRET_KEY=<Secret key for JWT token generation>
```

## Usage

1. Start the server: `npm start`
2. Use a tool like Postman to send HTTP requests to the API endpoints.
3. Register a user using the `/register` endpoint.
4. Log in using the `/login` endpoint to obtain an access token.
5. Use the obtained access token in the Authorization header for subsequent requests that require authentication.

## API Endpoints

- **POST /api/register**: Register a new user.
- **POST /api/login**: Log in a user.
- **GET /api/getUser**: Get all users.
- **GET /api/getUser/:id**: Get a user by ID.
- **PATCH /api/updateUser/:id**: Update a user by ID.
- **DELETE /api/deleteUser/:id**: Delete a user by ID.
- **POST /api/addPost**: Create a new post.
- **GET /api/getPost**: Get all posts.
- **GET /api/getPost/:id**: Get a post by ID.
- **PATCH /api/updatePost/:id**: Update a post by ID.
- **DELETE /api/deletePost/:id**: Delete a post by ID.
- **POST /api/addComment**: Add a comment to a post.
- **GET /api/getComment**: Get all comments.
- **GET /api/getComment/:id**: Get a comment by ID.
- **PATCH /api/updateComment/:id**: Update a comment by ID.
- **DELETE /api/deleteComment/:id**: Delete a comment by ID.

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of any errors. Refer to the API endpoint documentation for specific error scenarios.

## Testing

To run the tests, use the following command: `npm test`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or additional features.
