# NestJS & React Skill Test


## Backend
## Introduction

Requiements :
- Framework :  NestJS v10.0 or higher
- Database : postgresql database
- ORM : typeOrm
- Auth System : Passport or JWT

Notation Criteria: 
The criteria that we are looking for are the following:
- For these use cases, don’t forget to code as if your code will go into production.
- Documentation: Is the project and the code properly documented?
- Correctness: Are all specs followed? Are all errors handled and all return in correct format(JSON)
- Technology: Which libraries or approaches are used? Do they make sense for the task? Justify why you've decided to use those technologies to solve the code challenge.
- Code quality: Is the code understandable and maintainable? What programming paradigm is being used? Is it implemented correctly? Is the project linted? Are you using MVC architecture ?

# Use case Test 1 : Entities

- Create one Entity User with following fields and constraints:

| Fields    | Constraints                                                   |
| --------- | ------------------------------------------------------------- |
| FirstName | Min: 2 chars, Max: 25 chars                                   |
| LastName  | Min: 2 chars, Max: 25 chars                                   |
| Email     | Unique                                                        |
| Password  | Min: 6 chars, max: 50 chars<br><br>At least contains 1 number |
| Role      | String                                                        |
| Active    | True/False. True by default                                   |
| CreatedAt | Auto generated                                                |
| UpdatedAt | Auto generated                                                |

- Create one Entity “Client” with following fields and constraints:
- The entity “Client” should be a child of “User” entity.
- The database should contains only one table “User” but no table “Client”
- The following fields should be implemented for the Client :

| Fields | Constraints     |
| ------ | --------------- |
| Avatar | Url             |
| Photos | Array of Photos |

- Create one Entity Photo with following fields and constraints

|           |                |
| --------- | -------------- |
| **Fields**    | **Constraints**    |
| Name      | String         |
| Url       | url            |
| User      | User (Owner)   |
| CreatedAt | Auto generated |
| UpdatedAt | Auto generated |

# Use case Test 2 : APIs Part 1

Create the following REST APIs:

| **Endpoint**       | **Authentication** | **Specifications**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST /api/register | Anonymous          | - Register new Client<br><br>  <br><br>- A FullName field will be auto generated and stored in the database from FirstName + “ “ + LastName<br><br>  <br><br>- Client can upload multiple images during registration (at least 4 images should be uploaded)<br><br>  <br><br>A client cannot exist in the database without an avatar : <br><br>- A default avatar will be assigned to any new Client created from this API or created elsewhere in this Application in the future. For the avatar File, you can get any picture on google image. |
| POST /api/login    | Anonymous          | Login existing Client with email/password<br><br>If successful, this should return a JWT token.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

# Use case Test 3 : Authentication and API Part 2

Before creating the following API endpoint, you need to add Authentication with JWT token to the application, using Bearer token with Passport library.

|   |   |   |
|---|---|---|
|API|Authentication|Specifications|
|GET /api/users/me|Authenticated as Client|- Get “relevant” Client details <br><br>- An authentication token is mandatory|

# Use case Test 4 (Optional) : Upload photos to AWS S3

Upload user’s photos to AWS S3 bucket when registering user.

AWS credentials: XXXXXX





## Frontend

This is a test to appreciate the level of your skills in React
## Introduction

Requiements:
For all this test you will use APIs created from the backend test (Symfony or Express or Nest) that you previously coded in the previous assignment.

- Framework :  
- React JS with last version or Next JS if you prefer
- The application should be create with ; create-react-app or create-next-app
- Library: the following libraries are strongly recommended but not required:
- React Router
- Redux or ReduxToolKit
- ReactHookform

Notation Criteria: The criteria that we are looking for are the following:
- For these use cases, don’t forget to code as if your code will go into production.
- Documentation: Is the project and the code properly documented?
- Correctness: Are all specs followed? Are all errors handled and all return in correct format(JSON)
- Technology: Which libraries or approaches are used? Do they make sense for the task? Justify why you've decided to use those technologies to solve the code challenge.
- Code quality: Is the code understandable and maintainable? What programming paradigm is being used? Is it implemented correctly? Is the project linted? Are you using MVC architecture ?

# Use case Test 1 : Register and Login features

| Features | Specifications                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Register | - Visible on /register<br>- Register new user with following fields<br>  - FirstName (Min: 2 chars, Max: 25 chars)<br>  - LastName (Min: 2 chars, Max: 25 chars)<br>  - Email<br>  - Password (Min: 6 chars, max: 50 chars, At least contains 1 number)<br>  - Photos (can be multiples): At least 4 photos should be selected<br>- When successful, display a success page.<br>- Errors should be displayed to the user inside the form close to the wrong field. <br><br>You are free to choose the design |
| Login    | - Visible on /login<br>- Login existing user<br>- When successful display the user’s profile page<br>- When not successful, the errors should be displayed to the user inside the form close to the wrong field                                                                                                                                                                                                                                                                                              |
# Use case Test 2 : User’s Profile

| Features | Specifications                                                                                                                                                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile  | - Upon successful login display this page visible on /profile<br>- Display current user’s FullName and the avatar. Also display a list of user’s photos in a beautiful carousel. You’re free to choose a 3rd party library or code your own. |


# Documentation

# Backend

```bash
$ cd backend
```

## Installation

```bash
$ npm install
```

## Configuration
Copy file `.env.example` to `.env` and fill env variables for DB/JWT/AWS.

## Running the DB

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

[Postman collection can be found here](./docs/cobbleweb-test.postman_collection.json)

### Register new client:

```
POST /api/auth/register

Headers:
  Content-Type: multipart/form-data

Body:
  {
    "email": Email
    "password": String with length 6-50 containing at least one digit
    "firstName": String with length 2-25
    "lastName": String with length 2-25
    "photos": Array of Files
  }

Responses:

  On success:
    { "access_token": Login access token }

  On validation or email duplication errors:
    { "statusCode": 400, "message": String or array of validation errors }
```

### Log in as a client:

```
POST /api/auth/login

Headers:
  Content-Type: application/json

Body:
  {
    "email": Email
    "password": String with length 6-50
  }

Responses:

  On success:
    { "access_token": Login access token }

  On validation or email duplication errors:
    { "statusCode": 400, "message": String or array of validation errors }
```

### Get details of authenticated client:

```
GET /api/users/me

Headers:
  Authorization: Bearer paste_jwt_token_here

Responses:

  On success:
    {
      "id": 1
      "email": "...",
      "firstName": "...",
      "lastName": "...",
      "active": true,
      "role": "client",
      "created_at": "2023-09-02T08:06:01.719Z",
      "updated_at": "2023-09-02T08:06:01.719Z",
      "avatar": "https://robohash.org/First-Last-Name",
      "photos": [
          {
              "id": 1,
              "name": "img_04.jpg",
              "url": "https://cw-recruitment-tests.s3.eu-west-1.amazonaws.com/698b8455-1197-4e3a-831b-b8834168359d.jpg"
          },
          ...
      ]
    }

  On auth error:
    { "statusCode": 401, "message": Authorization token is not provided / is invalid }
```

# Frontend

```bash
$ cd frontend
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm start
```
