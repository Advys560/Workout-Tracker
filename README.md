# Workout Tracker API

API RESTful sencilla para practicar Node.js, Express y MySQL.

## Tecnologias

- Node.js
- Express
- MySQL
- mysql2
- dotenv

## Instalacion

```bash
npm install
```

Configura las variables de MySQL en `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=workout_tracker
```

Crea la base de datos ejecutando el archivo `database.sql` en MySQL.

## Ejecucion

```bash
npm run dev
```

La API se ejecuta en:

```text
http://localhost:3000
```

## Endpoints principales

```text
GET    /users
GET    /users/:id
GET    /users/search?nombre=Samuel
GET    /users/limit?limit=2
POST   /users
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

La arquitectura actual es:

```text
Ruta -> Controller -> Model -> MySQL
```
