
Next 14 (Hux Assesment Project) Documentation
This documentation provides an overview of the Next 14 project, including instructions on how to configure the server, set up environment variables, and use the available endpoints.

Getting Started
Clone the repository from GitHub:
bash
Copy code
git clone https://github.com/your/repository.git
Navigate to the project directory:
bash
Copy code
cd next-14-project
Install dependencies:
bash
Copy code
npm install
Configuration
Server Configuration 
The backend server can be started using:
bash
Copy code
npm start
The frontend server can be started using:
bash
Copy code
npm run dev
Environment Variables (.env file)
Create a .env file in the root directory of the project with the following content:

Copy code
DB_CONNECTION_STRING=""
JWT_SECRET=""
Replace the values for DB_CONNECTION_STRING with your database connection string and JWT_SECRET with your desired JWT secret key.

Endpoints
Register User:
Method: POST
Endpoint: http://localhost:5000/api/users
Login User:
Method: POST
Endpoint: http://localhost:5000/api/users/login
Logout User:
Method: POST
Endpoint: http://localhost:5000/api/users/logout
Create Contact:
Method: POST
Endpoint: http://localhost:5000/api/contacts
Edit Contact:
Method: PUT
Endpoint: http://localhost:5000/api/contacts/:id
Get Single Contact:
Method: GET
Endpoint: http://localhost:5000/api/contacts/:id
Delete Contact:
Method: DELETE
Endpoint: http://localhost:5000/api/contacts/:id
Usage
Start the backend server using npm start.
Start the frontend server using npm run dev.
Use the provided endpoints to register, login, logout users, manage contacts, and perform other necessary actions.
Additional Information
Make sure to replace placeholders such as :id in the endpoints with actual values.
For detailed API usage and request/response formats, refer to the API documentation or code comments in the project.
Ensure that your database is properly configured and accessible before running the server.
Customize the JWT secret key for enhanced security.
