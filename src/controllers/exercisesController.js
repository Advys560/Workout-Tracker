const exercisesModel = require("../models/exercisesModel");
const workoutsModel = require("../models/workoutsModel");

function datosValidos(exercise) {
  const { workout_id, nombre, series, repeticiones } = exercise;

  return (
    Number.isInteger(Number(workout_id)) &&
    Number(workout_id) > 0 &&
    typeof nombre === "string" &&
    nombre.trim() !== "" &&
    typeof series === "number" &&
    typeof repeticiones === "number" &&
    series > 0 &&
    repeticiones > 0
  );
}

function idValido(id) {
  return Number.isInteger(id) && id > 0;
}

async function obtenerExercises(req, res) {
  try {
    const exercises = await exercisesModel.obtenerExercises();

    res.status(200).json(exercises);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener los ejercicios",
    });
  }
}

async function obtenerExercisePorId(req, res) {
  try {
    const id = Number(req.params.id);

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    const exercise = await exercisesModel.obtenerExercisePorId(id);

    if (!exercise) {
      return res.status(404).json({
        mensaje: "Ejercicio no encontrado",
      });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener el ejercicio",
    });
  }
}

async function crearExercise(req, res) {
  try {
    const { workout_id, nombre, series, repeticiones } = req.body || {};

    if (!datosValidos({ workout_id, nombre, series, repeticiones })) {
      return res.status(400).json({
        mensaje: "workout_id, nombre, series y repeticiones son obligatorios",
      });
    }

    const workout = await workoutsModel.obtenerWorkoutPorId(workout_id);

    if (!workout) {
      return res.status(400).json({
        mensaje: "El workout no existe",
      });
    }

    const id = await exercisesModel.crearExercise({
      workout_id,
      nombre,
      series,
      repeticiones,
    });

    res.status(201).json({
      mensaje: "Ejercicio creado correctamente",
      id: id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al crear el ejercicio",
    });
  }
}

async function actualizarExercise(req, res) {
  try {
    const id = Number(req.params.id);
    const { workout_id, nombre, series, repeticiones } = req.body || {};

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    if (!datosValidos({ workout_id, nombre, series, repeticiones })) {
      return res.status(400).json({
        mensaje: "workout_id, nombre, series y repeticiones son obligatorios",
      });
    }

    const workout = await workoutsModel.obtenerWorkoutPorId(workout_id);

    if (!workout) {
      return res.status(400).json({
        mensaje: "El workout no existe",
      });
    }

    const exercise = await exercisesModel.obtenerExercisePorId(id);

    if (!exercise) {
      return res.status(404).json({
        mensaje: "Ejercicio no encontrado",
      });
    }

    await exercisesModel.actualizarExercise(id, {
      workout_id,
      nombre,
      series,
      repeticiones,
    });

    res.status(200).json({
      mensaje: "Ejercicio actualizado correctamente",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al actualizar el ejercicio",
    });
  }
}

async function modificarExercise(req, res) {
  try {
    const id = Number(req.params.id);
    const exercise = req.body || {};

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    if (Object.keys(exercise).length === 0) {
      return res.status(400).json({
        mensaje: "Debes enviar al menos un dato para modificar",
      });
    }

    const camposPermitidos = [
      "workout_id",
      "nombre",
      "series",
      "repeticiones",
    ];

    for (const campo of Object.keys(exercise)) {
      if (!camposPermitidos.includes(campo)) {
        return res.status(400).json({
          mensaje: "Solo puedes modificar datos del ejercicio",
        });
      }
    }

    if (
      exercise.workout_id !== undefined &&
      (!Number.isInteger(Number(exercise.workout_id)) ||
        Number(exercise.workout_id) <= 0)
    ) {
      return res.status(400).json({
        mensaje: "El workout_id debe ser un número válido",
      });
    }

    if (
      exercise.nombre !== undefined &&
      (typeof exercise.nombre !== "string" ||
        exercise.nombre.trim() === "")
    ) {
      return res.status(400).json({
        mensaje: "El nombre no puede estar vacío",
      });
    }

    if (
      exercise.series !== undefined &&
      (typeof exercise.series !== "number" || exercise.series <= 0)
    ) {
      return res.status(400).json({
        mensaje: "Las series deben ser un número mayor que 0",
      });
    }

    if (
      exercise.repeticiones !== undefined &&
      (typeof exercise.repeticiones !== "number" ||
        exercise.repeticiones <= 0)
    ) {
      return res.status(400).json({
        mensaje: "Las repeticiones deben ser un número mayor que 0",
      });
    }

    if (exercise.workout_id !== undefined) {
      const workout = await workoutsModel.obtenerWorkoutPorId(
        exercise.workout_id,
      );

      if (!workout) {
        return res.status(400).json({
          mensaje: "El workout no existe",
        });
      }
    }

    const exerciseActual = await exercisesModel.obtenerExercisePorId(id);

    if (!exerciseActual) {
      return res.status(404).json({
        mensaje: "Ejercicio no encontrado",
      });
    }

    await exercisesModel.modificarExercise(id, exercise);

    res.status(200).json({
      mensaje: "Ejercicio modificado correctamente",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al modificar el ejercicio",
    });
  }
}

async function eliminarExercise(req, res) {
  try {
    const id = Number(req.params.id);

    if (!idValido(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero válido",
      });
    }

    const resultado = await exercisesModel.eliminarExercise(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Ejercicio no encontrado",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al eliminar el ejercicio",
    });
  }
}

module.exports = {
  obtenerExercises,
  obtenerExercisePorId,
  crearExercise,
  actualizarExercise,
  modificarExercise,
  eliminarExercise,
};
