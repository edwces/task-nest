# task-nest

todo like app similiar to todoist built with nest.js and next.js

Features:

- create / list / edit todo
- Dashboard
- Tags
- sorting todos
- JWT refresh token Auth
- forgot password / changing password
- due dates
- bookmarks

## Tech Used:

### Client

- Next.js
- react-query
- mantine
- zustand
- framer motion

### Server

- nest.js
- mikro-orm
- redis
- postgresql
- docker

# Building

### Backend

To build backend run in projects root directory

```
docker compose up
```

All API dependencies should be automatically installed into image

### Frontend

To install dependencies run yarn in web directory

```
yarn install
yarn dev
```
