# project2-express-auth
# Express JWT Authentication Server

This is a simple Express.js server demonstrating user authentication using JWT (JSON Web Tokens) and password hashing with bcrypt.

## Features

- User login with username and password
- Passwords are securely hashed with bcrypt
- JWT token generation upon successful login
- Protected route accessible only with a valid JWT token

## Installation

1. Clone the repository or copy the code to your local machine.

2. Install dependencies:

```bash
npm install express jsonwebtoken bcrypt
```

## Usage

1. Start the server:
```bash
node server.js
```
The server listens on port 3000.

2. Login to receive a JWT token:
```json
{
  "username": "user1",
  "password": "password1"
}
```

If authentication is successful, the response will include a JWT token:

```json
{
  "token": "<your-jwt-token>"
}
```
Access protected routes:

Send a GET request to /protected with the Authorization header containing the JWT token:

```makefile
Authorization: Bearer <your-jwt-token>
```
If the token is valid, you will receive access to the protected content.

## Users
The server has two predefined users:

Username	Password
user1	password1
user2	password2

Passwords are stored hashed using bcrypt.


