# OTT Platform "My List" Feature - Project
This project simulates an Over-the-Top (OTT) platform where users can manage their personal content list ("My List"). Built using NestJS, the application allows users to add, view, and remove movies and TV shows from their list. The goal of the project was to improve the existing codebase by implementing the "My List" feature and addressing various requirements, such as validation, error handling, and testing.

## Key Implementations:
Implemented the "My List" feature with endpoints to add, view, and remove items.
Ensured data validation to prevent adding duplicate items.
Created unit and integration tests for the new functionalities.
Updated Swagger documentation to reflect the newly added endpoints.

## Getting Started
Prerequisites
To set up the project locally, you will need the following tools installed:

Node.js v18 or above
Docker & Docker Compose (for environment setup)
Setup Instructions
1. Clone the Repository
Clone the repository and navigate to the project directory:

bash
Copy code
git clone https://github.com/karan-saj/stage-backend-machine-coding-round
cd stage-backend-machine-coding-round
2. Install Dependencies
Run the following command to install the required dependencies:

bash
Copy code
npm install
3. Set Up the Database and Run the Project
Run the application with Docker Compose:

bash
Copy code
docker-compose up --build
This will build the necessary containers and start the project locally.

## Swagger Documentation
Once the project is running, you can access the Swagger API Documentation at:

Swagger API Documentation - http://127.0.0.1:3000/api#/

## API Endpoints
1. My List Endpoints
The following endpoints are now available:

GET /users/{userId}
GET /users/list/{userId}
POST /users/list
DELETE /users/list/{userId}/{itemId}

2. Existing Endpoints for Movies and TV Shows
The following endpoints were already implemented and are available:

GET /movies: Lists all movies.
POST /movies: Adds a new movie.
GET /tvshows: Lists all TV shows.
POST /tvshows: Adds a new TV show.

## Testing
Running Unit Tests
To run the unit tests for the application, use:

bash
Copy code
npm run test
Running Linting & Formatting
To check the code for any linting or formatting issues, run:

bash
Copy code
npm run lint
npm run format

## Improvements
1. Caching implementation for GET user/list
2. Pagination for GET user/list
3. Check while updating list for duplicate entry is, content being present
4. Get user details api created
5. Date transformation for movie and tv show object
6. Seed module created to pre seed db

## Future Improvemts
1. Error and logging inhancement
2. Optimisig service classes to use utility methods for db operations and validation
3. Adding more unit and integration test coverage
4. Cleaning User controller return object based on business logic
5. Having retry mechanisim for db layer
6. Caching implementation for get api and updating cache on post calls
