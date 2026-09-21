const express = require("express");

const router = express.Router();

const usuarios = [
  {
    id: 1,
    nombre: "Samuel",
    correo: "samuel@gmail.com",
  },
  {
    id: 2,
    nombre: "Laura",
    correo: "laura@gmail.com",
  },
  {
    id: 3,
    nombre: "Carlos",
    correo: "carlos@gmail.com",
  },
];

router.get("/", (req, res) => {
  res.json(usuarios);
});

router.get("/search", (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      mensaje: "Debes ingresar un nombre para buscar",
    });
  }

  const usuariosFiltrados = usuarios.filter(
    (usuario) => usuario.nombre.toLowerCase() === nombre.toLowerCase(),
  );

  res.json(usuariosFiltrados);
});

router.get("/limit", (req, res) => {
  const limit = Number(req.query.limit);

  if (!Number.isInteger(limit) || limit <= 0) {
    return res.status(400).json({
      mensaje: "El límite debe ser un número entero mayor que cero",
    });
  }

  const usuariosLimitados = usuarios.slice(0, limit);

  res.json(usuariosLimitados);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
    });
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  res.json(usuario);
});

router.post("/", (req, res) => {
  const nombre = req.body ? req.body.nombre : undefined;
  const correo = req.body ? req.body.correo : undefined;

  if (
    typeof nombre !== "string" ||
    typeof correo !== "string" ||
    nombre.trim() === "" ||
    correo.trim() === ""
  ) {
    return res.status(400).json({
      mensaje: "El nombre y el correo son obligatorios",
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: nombre,
    correo: correo,
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
    });
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  const nombre = req.body ? req.body.nombre : undefined;
  const correo = req.body ? req.body.correo : undefined;

  if (
    typeof nombre !== "string" ||
    typeof correo !== "string" ||
    nombre.trim() === "" ||
    correo.trim() === ""
  ) {
    return res.status(400).json({
      mensaje: "El nombre y el correo son obligatorios",
    });
  }

  usuario.nombre = nombre;
  usuario.correo = correo;

  res.json(usuario);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
    });
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  const nombre = req.body ? req.body.nombre : undefined;
  const correo = req.body ? req.body.correo : undefined;

  if (nombre === undefined && correo === undefined) {
    return res.status(400).json({
      mensaje: "Debes enviar al menos un dato para actualizar",
    });
  }

  if (
    nombre !== undefined &&
    (typeof nombre !== "string" || nombre.trim() === "")
  ) {
    return res.status(400).json({
      mensaje: "El nombre no puede estar vacío",
    });
  }

  if (
    correo !== undefined &&
    (typeof correo !== "string" || correo.trim() === "")
  ) {
    return res.status(400).json({
      mensaje: "El correo no puede estar vacío",
    });
  }

  if (nombre !== undefined) {
    usuario.nombre = nombre;
  }

  if (correo !== undefined) {
    usuario.correo = correo;
  }

  res.json(usuario);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
    });
  }

  const posicion = usuarios.findIndex((usuario) => usuario.id === id);

  if (posicion === -1) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  usuarios.splice(posicion, 1);

  res.status(204).send();
});

module.exports = router;
