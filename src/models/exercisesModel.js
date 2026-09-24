const db = require("../config/db");

const obtenerExercises = async () => {
    const [rows] = await db.query(
        "SELECT * FROM exercises"
    );

    return rows;
};

const obtenerExercisePorId = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM exercises WHERE id = ?",
        [id]
    );

    return rows[0];
};

const crearExercise = async (exercise) => {
    const { workout_id, nombre, series, repeticiones } = exercise;

    const [result] = await db.query(
        "INSERT INTO exercises (workout_id, nombre, series, repeticiones) VALUES (?, ?, ?, ?)",
        [workout_id, nombre, series, repeticiones]
    );

    return result.insertId;
};

const actualizarExercise = async (id, exercise) => {
    const { workout_id, nombre, series, repeticiones } = exercise;

    const [result] = await db.query(
        "UPDATE exercises SET workout_id = ?, nombre = ?, series = ?, repeticiones = ? WHERE id = ?",
        [workout_id, nombre, series, repeticiones, id]
    );

    return result;
};

const modificarExercise = async (id, exercise) => {
    const campos = [];
    const valores = [];

    if (exercise.workout_id !== undefined) {
        campos.push("workout_id = ?");
        valores.push(exercise.workout_id);
    }

    if (exercise.nombre !== undefined) {
        campos.push("nombre = ?");
        valores.push(exercise.nombre);
    }

    if (exercise.series !== undefined) {
        campos.push("series = ?");
        valores.push(exercise.series);
    }

    if (exercise.repeticiones !== undefined) {
        campos.push("repeticiones = ?");
        valores.push(exercise.repeticiones);
    }

    valores.push(id);

    const [result] = await db.query(
        `UPDATE exercises SET ${campos.join(", ")} WHERE id = ?`,
        valores
    );

    return result;
};

const eliminarExercise = async (id) => {
    const [result] = await db.query(
        "DELETE FROM exercises WHERE id = ?",
        [id]
    );

    return result;
};

module.exports = {
    obtenerExercises,
    obtenerExercisePorId,
    crearExercise,
    actualizarExercise,
    modificarExercise,
    eliminarExercise
};