
# Authenticated URL Shortener

## Overview

This project is an authenticated URL shortener built using Nest.js for the backend. It allows users to register, log in, shorten URLs, and retrieve their shortened URLs. The project uses JWT for secure authentication and ensures all URL shortening routes are accessible only to authenticated users.

## Features

- User Registration
- User Login
- Secure Password Storage (hashed)
- Token-based Authentication (JWT)
- Authenticated Routes for URL Shortening
- UI for Login, Registration, and URL Shortening

## Technologies Used

- **Backend:** Nest.js
- **Frontend:** React
- **Authentication:** JWT

## Getting Started

### Prerequisites

- Node.js
- npm 

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Sharangyawali/UrlShortener.git
    cd UrlShortener
    ```
2. Change directory to nestjs:

    ```bash
    cd nestjs
    npm install
    ```
3. Set up nestjs environment variables :

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET_KEY=your_jwt_secret
    ```
4. Start the backend server:

    ```bash
    npm run start:dev
    ```

4. Change directory to reactjs:

    ```bash
    cd ..
    cd reactjs
    npm install
    ```

5. Set up reactjs environment variables :

    Create a `.env` file in the root directory and add the following variables:

    ```env
    REACT_APP_API_URL= http://localhost:4001/api/
    ```
6. Start the frontend:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **POST /api/auth/register:** Register a new user
- **POST /api/auth/login:** Log in a user and generate a JWT

### URL Shortening

- **POST /api/urlshortner/generate-short-url:** Shorten a URL (Authenticated route)
- **POST /api/urlshortner/get-actual-url:** Get actual URL (Authenticated route)

## Frontend Implementation

### URL Shortening Form

The URL shortening form consists of an input field where users can enter the actual URL they wish to shorten. Upon submission, the form sends a request to the backend to create a shortened URL.

### Displaying Generated Short URLs

After a URL is shortened, the frontend displays the generated short URL to the user. This is  done by updating the UI to show the new short URL along with a copy button for user convenience.
