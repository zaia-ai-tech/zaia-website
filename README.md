# zaia-website

The official website for Zaia AI.

## Simple REST API

This project contains a simple REST API built with Flask.

### Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Run the API:

```bash
python index.py
```

The API will be available at `http://localhost:5000`

### API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/<id>` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/<id>` - Update user
- `DELETE /api/users/<id>` - Delete user

### Example Usage

**Get all users:**

```bash
curl http://localhost:5000/api/users
```

**Create a new user:**

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Update a user:**

```bash
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

**Delete a user:**

```bash
curl -X DELETE http://localhost:5000/api/users/1
```
