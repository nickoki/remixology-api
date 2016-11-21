# remixology-api
API for [Remixology app](https://github.com/nickoki/remixology)

## Stack

- NodeJS
- Express
- MongoDB
- Mongoose
- PassportJS ([JWT Strategy](https://github.com/themikenicholson/passport-jwt))

## Routes

- `api.remixology.io` root URL

**Public**

- GET `/drinks` returns a list of all Drink instances in the database

- POST `/signup` creates a new User instance

- POST `/authenticate` checks email and password, assigns a JWT

**Protected**

- POST `/drinks` creates new Drink instance

- PUT `/drinks` updates existing Drink instance

- DELETE `/drinks/:id` removes Drink instance
