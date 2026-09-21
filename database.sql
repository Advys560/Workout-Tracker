CREATE DATABASE IF NOT EXISTS workout_tracker;

USE workout_tracker;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL
);

INSERT INTO users (nombre, correo)
SELECT 'Samuel', 'samuel@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE correo = 'samuel@gmail.com');

INSERT INTO users (nombre, correo)
SELECT 'Laura', 'laura@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE correo = 'laura@gmail.com');

INSERT INTO users (nombre, correo)
SELECT 'Carlos', 'carlos@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE correo = 'carlos@gmail.com');
