# User Management Dashboard

This is a user management web application built using React, Axios, and React Bootstrap. The application allows users to:

- View a list of users
- Create a new user
- Edit an existing user
- Delete a user
- View user details

The application is designed for administrators to manage users, including first name, last name, email, and department.

## Features

- **User Management**:
  - View a list of users with their details.
  - Create a new user.
  - Edit an existing user.
  - Delete a user.
  - View detailed information about a specific user.

## Technologies Used

- **Frontend**:

  - React
  - Axios
  - React Bootstrap
  - FontAwesome

- **Backend** (not included in this repository - a mock API is used):
  - Mock API (https://67a6184a510789ef0dfa5f16.mockapi.io/users)

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Step-by-Step Setup

1. Clone the repository (if you have one, otherwise skip this step):

   ```bash
   git clone [https://github.com/your-username/user-management-app.git](https://www.google.com/search?q=https://github.com/your-username/user-management-app.git)  # Replace with your repo URL
   ```

2. Navigate to the project directory:

   ```bash
   cd user-management-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm start
   ```

   This will start the application at `http://localhost:3000`.

## Usage

Once the application is running, you can:

- **View Users:** The list of users is displayed on the main page.
- **Create User:** Click the "Create User" button to open the creation form.
- **Edit User:** Click the pen icon next to a user to open the edit form.
- **Delete User:** Click the trash icon next to a user to delete that user.
- **View User Details:** Click the "View" button next to a user to see their detailed information in a modal.

## API Endpoints (Mock API)

The application uses a mock API for data. The following endpoints are available:

- **GET** `/users`: Fetch all users.
- **POST** `/users`: Create a new user.
- **PUT** `/users/:id`: Update a specific user.
- **DELETE** `/users/:id`: Delete a user.
