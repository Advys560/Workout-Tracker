const progressModel = require("../models/progressModel");
const usersModel = require("../models/usersModel");

function idValido(id) {
  return Number.isInteger(id) && id > 0;
}

function datosCompletos(datos) {
  return (
    Number.isInteger(Number(datos.user_id)) &&
    Number(datos.user_id) > 0 &&
    typeof datos.peso === "number" &&
    datos.peso > 0 &&
    typeof datos.fecha === "string" &&
    datos.fecha.trim() !== ""
  );
}

async function usuarioExiste(userId) {
  return usersModel.obtenerPorId(userId);
}

async function obtenerProgress(req, res) {
  try {
    const progress = await progressModel.obtenerProgress();

    res.status(200).json(progress);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al obtener los registros de progreso",
    });
  }
}

async function obtenerProgressPorId(req, res) {
  try {
    const id = Number(req.params.id);

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    const registro = await progressModel.obtenerProgressPorId(id);

    if (!registro) {
      return res.status(404).json({
        mensaje: "Registro de progreso no encontrado",
      });
    }

    res.status(200).json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al obtener el registro de progreso",
    });
  }
}

async function crearProgress(req, res) {
  try {
    const datos = req.body || {};

    if (!datosCompletos(datos)) {
      return res.status(400).json({
        mensaje: "user_id, peso y fecha son obligatorios",
      });
    }

    const usuario = await usuarioExiste(Number(datos.user_id));

    if (!usuario) {
      return res.status(400).json({
        mensaje: "El usuario no existe",
      });
    }

    const id = await progressModel.crearProgress({
      user_id: Number(datos.user_id),
      peso: datos.peso,
      fecha: datos.fecha,
    });

    res.status(201).json({
      mensaje: "Registro de progreso creado correctamente",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al crear el registro de progreso",
    });
  }
}

async function actualizarProgress(req, res) {
  try {
    const id = Number(req.params.id);
    const datos = req.body || {};

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    if (!datosCompletos(datos)) {
      return res.status(400).json({
        mensaje: "user_id, peso y fecha son obligatorios",
      });
    }

    const usuario = await usuarioExiste(Number(datos.user_id));

    if (!usuario) {
      return res.status(400).json({
        mensaje: "El usuario no existe",
      });
    }

    const registro = await progressModel.actualizarProgress(id, {
      user_id: Number(datos.user_id),
      peso: datos.peso,
      fecha: datos.fecha,
    });

    if (!registro) {
      return res.status(404).json({
        mensaje: "Registro de progreso no encontrado",
      });
    }

    res.status(200).json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al actualizar el registro de progreso",
    });
  }
}

async function modificarProgress(req, res) {
  try {
    const id = Number(req.params.id);
    const datos = req.body || {};

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    if (Object.keys(datos).length === 0) {
      return res.status(400).json({
        mensaje: "Debes enviar al menos un dato para modificar",
      });
    }

    const camposPermitidos = ["user_id", "peso", "fecha"];

    for (const campo of Object.keys(datos)) {
      if (!camposPermitidos.includes(campo)) {
        return res.status(400).json({
          mensaje: "Solo puedes modificar datos del progreso",
        });
      }
    }

    if (
      datos.user_id !== undefined &&
      (!Number.isInteger(Number(datos.user_id)) || Number(datos.user_id) <= 0)
    ) {
      return res.status(400).json({
        mensaje: "El user_id debe ser un número válido",
      });
    }

    if (
      datos.peso !== undefined &&
      (typeof datos.peso !== "number" || datos.peso <= 0)
    ) {
      return res.status(400).json({
        mensaje: "El peso debe ser un número mayor que 0",
      });
    }

    if (
      datos.fecha !== undefined &&
      (typeof datos.fecha !== "string" || datos.fecha.trim() === "")
    ) {
      return res.status(400).json({
        mensaje: "La fecha no puede estar vacía",
      });
    }

    if (datos.user_id !== undefined) {
      const usuario = await usuarioExiste(Number(datos.user_id));

      if (!usuario) {
        return res.status(400).json({
          mensaje: "El usuario no existe",
        });
      }

      datos.user_id = Number(datos.user_id);
    }

    const registro = await progressModel.modificarProgress(id, datos);

    if (!registro) {
      return res.status(404).json({
        mensaje: "Registro de progreso no encontrado",
      });
    }

    res.status(200).json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al modificar el registro de progreso",
    });
  }
}

async function eliminarProgress(req, res) {
  try {
    const id = Number(req.params.id);

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    const eliminado = await progressModel.eliminarProgress(id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: "Registro de progreso no encontrado",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al eliminar el registro de progreso",
    });
  }
}

module.exports = {
  obtenerProgress,
  obtenerProgressPorId,
  crearProgress,
  actualizarProgress,
  modificarProgress,
  eliminarProgress,
};
