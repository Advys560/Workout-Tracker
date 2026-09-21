const usersModel = require("../models/usersModel");

async function obtenerUsuarios(req, res) {
  const usuarios = await usersModel.obtenerTodos();

  res.json(usuarios);
}

async function buscarUsuarios(req, res) {
  const nombre = req.query.nombre;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      mensaje: "Debes ingresar un nombre para buscar",
    });
  }

  const usuarios = await usersModel.buscarPorNombre(nombre);

  res.json(usuarios);
}

async function limitarUsuarios(req, res) {
  const limit = Number(req.query.limit);

  if (!Number.isInteger(limit) || limit <= 0) {
    return res.status(400).json({
      mensaje: "El límite debe ser un número entero mayor que cero",
    });
  }

  const usuarios = await usersModel.obtenerLimitados(limit);

  res.json(usuarios);
}

async function obtenerUsuarioPorId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
    });
  }

  const usuario = await usersModel.obtenerPorId(id);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  res.json(usuario);
}

async function crearUsuario(req, res) {
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

  const nuevoUsuario = await usersModel.crear({
    nombre: nombre,
    correo: correo,
  });

  res.status(201).json(nuevoUsuario);
}

async function actualizarUsuario(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
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

  const usuario = await usersModel.actualizar(id, nombre, correo);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  res.json(usuario);
}

async function actualizarParteUsuario(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
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

  const usuario = await usersModel.actualizarParte(id, nombre, correo);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  res.json(usuario);
}

async function eliminarUsuario(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensaje: "El ID debe ser un número entero válido",
    });
  }

  const usuarioEliminado = await usersModel.eliminar(id);

  if (!usuarioEliminado) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }

  res.status(204).send();
}

const obtenerWorkoutsPorUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const workouts = await usersModel.obtenerWorkoutsPorUsuario(id);

        res.status(200).json(workouts);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener los workouts del usuario"
        });
    }
};

module.exports = {
  obtenerUsuarios,
  buscarUsuarios,
  limitarUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  actualizarParteUsuario,
  eliminarUsuario,
  obtenerWorkoutsPorUsuario
};

