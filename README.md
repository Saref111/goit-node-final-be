# Project Ucranes03 Backend

This is the backend server for the Project Ucranes03, a web application for searching and viewing recipes. The server handles user authentication, recipe management, and various other features necessary for the application.

## Table of Contents

- [Features](#features)
- [Technologies and Libraries](#technologies-and-libraries)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Registration, login, and user profile management.
- **Recipe Management**: Create, update, delete, and view recipes.
- **Favorites**: Add recipes to favorites.
- **Follow Users**: Follow and unfollow other users.
- **Filter and Search**: Filter recipes by categories, areas, and ingredients.
- **Testimonials**: Get user testimonials.

## Technologies and Libraries

This project uses the following technologies and libraries:

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB.
- **Passport**: Authentication middleware for Node.js.
- **JSON Web Token (JWT)**: For secure authentication.
- **Cloudinary**: For managing and delivering images.
- **Multer**: Middleware for handling `multipart/form-data`.
- **Joi**: For data validation.
- **dotenv**: For managing environment variables.
- **Morgan**: HTTP request logger middleware.
- **bcrypt**: For hashing passwords.
- **cors**: For enabling Cross-Origin Resource Sharing.

## Installation

1. **Clone the repository:**
```sh
git clone https://github.com/Saref111/goit-node-final-be.git
cd goit-node-final-be
```

2. **Install dependencies:**
```sh
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory and add the necessary environment variables:
```env
DB_HOST=your_database_host
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=token_lifetime
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Start the server:**
```sh
npm start
```

For development, use:
```sh
npm run dev
```

The server will be available at `http://localhost:3000`.

## Usage

1. **Register or Log In:**
    - Use the provided API endpoints to register a new user or log in with existing credentials.

2. **Manage Recipes:**
    - Use the API to create, update, delete, and view recipes.

3. **Manage Favorites:**
    - Add and remove recipes from your favorites list using the appropriate endpoints.

4. **Follow Users:**
    - Follow and unfollow other users using the provided API endpoints.

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user.
- `GET /api/users/current`: Get current logged-in user.
- `GET /api/users/info`: Get own user info.
- `GET /api/users/info/:id`: Get user info by ID.
- `PATCH /api/users/avatars`: Update user avatar.
- `GET /api/users/followers`: Get own followers.
- `GET /api/users/followers/:id`: Get followers by user ID.
- `GET /api/users/following`: Get own followings.
- `PATCH /api/users/addFollowing/:id`: Follow a user.
- `PATCH /api/users/removeFollowing/:id`: Unfollow a user.
- `POST /api/users/logout`: Log out a user.

### Recipe Routes

- `GET /api/recipes`: Get recipes with query parameters.
- `GET /api/recipes/details/:id`: Get recipe details by ID.
- `GET /api/recipes/popular`: Get popular recipes.
- `GET /api/recipes/own`: Get own recipes.
- `POST /api/recipes/own`: Create a new recipe.
- `DELETE /api/recipes/own/:id`: Delete a recipe.
- `GET /api/recipes/favorite`: Get favorite recipes.
- `PATCH /api/recipes/addFavorite/:id`: Add a recipe to favorites.
- `PATCH /api/recipes/removeFavorite/:id`: Remove a recipe from favorites.

### Category Routes

- `GET /api/categories`: Get all categories.

### Area Routes

- `GET /api/areas`: Get all areas.

### Ingredient Routes

- `GET /api/ingredients`: Get all ingredients.

### Testimonial Routes

- `GET /api/testimonials`: Get all testimonials.

## Contributors

- [Iryna Holova - Team Lead, developer](https://github.com/Iryna-Holova)
- [Vladyslav Mazurkevych - Scrum Master, developer](https://github.com/mazurkevych30)
- [Yurii Filimonchuk - developer](https://github.com/filimon4uck)
- [Maxim Krygin - developer](https://github.com/Maxus94)
- [Yulia Cherina - developer](https://github.com/dianatima)
- [Ivan Borovyk - developer](https://github.com/Saref111)
- [Oleksandr Oleksandrenko - developer](https://github.com/lexandr10)
- [Valerii Pometun - developer](https://github.com/Valerii2022)

## License

This project is licensed under the ISC License. See the [LICENSE](./LICENSE.md) file for details.

## Contact

For any questions or feedback, please open an issue on GitHub.
