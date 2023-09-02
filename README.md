## Installation

```bash
$ npm install
```

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
