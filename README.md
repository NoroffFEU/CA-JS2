# Social Media Application
## Made by [Julie](https://github.com/julieoyen) and [Aksel](https://github.com/AkselOldeide) 

[Deploy here](https://ca-javascript2.netlify.app)

This is a client-side social media application built for the JavaScript 2 course assignment. It allows users to register, log in, create, edit, and delete posts using a provided API. 

## Features

- Register new users
- Login with JWT authentication
- Create, edit, and delete posts
- View individual posts and recent post listings
- Logout to clear the session

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/NoroffFEU/CA-JS2/
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

## Usage

- **Register**: `/auth/register`
- **Login**: `/auth/login`
- **Create Post**: `/post/create`
- **Edit Post**: `/post/edit/:id`
- **Delete Post**: Accessible from post view
- **View Posts**: `/post/:id`
- **Logout**: Clears token from local storage

## API

The app integrates with the Noroff Social API, utilizing JWT tokens stored in `localStorage` for authentication.
