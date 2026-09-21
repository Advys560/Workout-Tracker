const db = require("../config/db");

async function obtenerTodos() {
  const [filas] = await db.query("SELECT id, nombre, correo FROM users");

  return filas;
}

async function obtenerPorId(id) {
  const [filas] = await db.query(
    "SELECT id, nombre, correo FROM users WHERE id = ?",
    [id],
  );

  return filas[0];
}

async function buscarPorNombre(nombre) {
  const [filas] = await db.query(
    "SELECT id, nombre, correo FROM users WHERE LOWER(nombre) = LOWER(?)",
    [nombre],
  );

  return filas;
}

async function obtenerLimitados(limit) {
  const [filas] = await db.query(
    "SELECT id, nombre, correo FROM users LIMIT ?",
    [limit],
  );

  return filas;
}

async function crear(datos) {
  const [resultado] = await db.query(
    "INSERT INTO users (nombre, correo) VALUES (?, ?)",
    [datos.nombre, datos.correo],
  );

  return {
    id: resultado.insertId,
    nombre: datos.nombre,
    correo: datos.correo,
  };
}

async function actualizar(id, nombre, correo) {
  const usuario = await obtenerPorId(id);

  if (!usuario) {
    return null;
  }

  await db.query(
    "UPDATE users SET nombre = ?, correo = ? WHERE id = ?",
    [nombre, correo, id],
  );

  return obtenerPorId(id);
}

async function actualizarParte(id, nombre, correo) {
  const usuario = await obtenerPorId(id);

  if (!usuario) {
    return null;
  }

  await db.query(
    "UPDATE users SET nombre = COALESCE(?, nombre), correo = COALESCE(?, correo) WHERE id = ?",
    [nombre ?? null, correo ?? null, id],
  );

  return obtenerPorId(id);
}

async function eliminar(id) {
  const [resultado] = await db.query("DELETE FROM users WHERE id = ?", [id]);

  return resultado.affectedRows > 0;
}
const obtenerWorkoutsPorUsuario = async (userId) => {
    const [rows] = await db.query(
        "SELECT * FROM workouts WHERE user_id = ?",
        [userId]
    );

    return rows;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  buscarPorNombre,
  obtenerLimitados,
  crear,
  actualizar,
  actualizarParte,
  eliminar,
  obtenerWorkoutsPorUsuario
};
