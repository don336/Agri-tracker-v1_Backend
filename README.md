# Crop Management System - Backend

## Overview

The **Crop Management System** backend is a Node.js and Express-based REST API designed to handle crop data, field management, and sales tracking. It provides authentication, CRUD operations, and business logic for managing crops, fields, and transactions. The system uses MongoDB as the database and integrates with JWT for secure authentication.

## Features

- **User Authentication** (Signup, Login, JWT Authentication)
- **Field Management** (Create, Update, Delete fields)
- **Crop Tracking** (Planting history, Current crops, Soil type)
- **Sales Management** (Track sales of harvested crops)
- **Role-Based Access Control (RBAC)** (Admin and User roles)

## Technologies Used

- **Node.js** - Backend runtime
- **Express.js** - Web framework for handling routes
- **MongoDB** - NoSQL database for storing crop data
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **UUID** - Unique ID generation for users and fields

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/d/on336/Agritrack-v.1_backend.git
   cd Agritrack-v.1_backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

### **Authentication**

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Login and get token |

### **Fields**

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | `/api/fields`     | Get all fields       |
| POST   | `/api/fields`     | Create a new field   |
| PUT    | `/api/fields/:id` | Update a field by ID |
| DELETE | `/api/fields/:id` | Delete a field by ID |

### **Crops**

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/crops`     | Get all crops       |
| POST   | `/api/crops`     | Add a new crop      |
| PUT    | `/api/crops/:id` | Update crop details |
| DELETE | `/api/crops/:id` | Remove a crop       |

### **Sales**

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/sales`     | Get all sales records |
| POST   | `/api/sales`     | Record a new sale     |
| DELETE | `/api/sales/:id` | Delete a sale record  |

## Folder Structure

```
backend/
│-- src/
│   │-- controllers/      # Business logic for routes
│   │-- models/           # Mongoose schemas
│   │-- routes/           # Express route handlers
│   │-- middleware/       # Authentication and validation middleware
│   │-- config/           # Database configuration
│   │-- app.ts            # Main application entry point
│-- .env                  # Environment variables
│-- package.json          # Dependencies and scripts
│-- README.md             # Documentation
```

## Running Tests

To run tests:

```sh
npm test
```

##

## Contributing

Pull requests are welcome. Please follow best coding practices and ensure tests pass before submitting a PR.

## License

This project is licensed under the [MIT License](LICENSE).

