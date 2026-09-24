const db = require("../config/db");

async function obtenerProgress() {
  const [filas] = await db.query(
    "SELECT id, user_id, peso, fecha FROM progress",
  );

  return filas;
}

async function obtenerProgressPorId(id) {
  const [filas] = await db.query(
    "SELECT id, user_id, peso, fecha FROM progress WHERE id = ?",
    [id],
  );

  return filas[0];
}

async function crearProgress(datos) {
  const [resultado] = await db.query(
    "INSERT INTO progress (user_id, peso, fecha) VALUES (?, ?, ?)",
    [datos.user_id, datos.peso, datos.fecha],
  );

  return resultado.insertId;
}

async function actualizarProgress(id, datos) {
  const registro = await obtenerProgressPorId(id);

  if (!registro) {
    return null;
  }

  await db.query(
    "UPDATE progress SET user_id = ?, peso = ?, fecha = ? WHERE id = ?",
    [datos.user_id, datos.peso, datos.fecha, id],
  );

  return obtenerProgressPorId(id);
}

async function modificarProgress(id, datos) {
  const registro = await obtenerProgressPorId(id);

  if (!registro) {
    return null;
  }

  const campos = [];
  const valores = [];

  if (datos.user_id !== undefined) {
    campos.push("user_id = ?");
    valores.push(datos.user_id);
  }

  if (datos.peso !== undefined) {
    campos.push("peso = ?");
    valores.push(datos.peso);
  }

  if (datos.fecha !== undefined) {
    campos.push("fecha = ?");
    valores.push(datos.fecha);
  }

  valores.push(id);

  await db.query(
    `UPDATE progress SET ${campos.join(", ")} WHERE id = ?`,
    valores,
  );

  return obtenerProgressPorId(id);
}

async function eliminarProgress(id) {
  const [resultado] = await db.query(
    "DELETE FROM progress WHERE id = ?",
    [id],
  );

  return resultado.affectedRows > 0;
}

module.exports = {
  obtenerProgress,
  obtenerProgressPorId,
  crearProgress,
  actualizarProgress,
  modificarProgress,
  eliminarProgress,
};
