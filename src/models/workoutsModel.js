const db = require("../config/db");

const obtenerWorkouts = async () => {
    const [rows] = await db.query("SELECT * FROM workouts");
    return rows;
};

const obtenerWorkoutPorId = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM workouts WHERE id = ?",
        [id]
    );

    return rows[0];
};

const crearWorkout = async (workout) => {
    const { user_id, nombre, descripcion, fecha } = workout;

    const [result] = await db.query(
        "INSERT INTO workouts (user_id, nombre, descripcion, fecha) VALUES (?, ?, ?, ?)",
        [user_id, nombre, descripcion, fecha]
    );

    return result.insertId;
};

// PUT
const actualizarWorkout = async (id, workout) => {
    const { user_id, nombre, descripcion, fecha } = workout;

    const [result] = await db.query(
        "UPDATE workouts SET user_id = ?, nombre = ?, descripcion = ?, fecha = ? WHERE id = ?",
        [user_id, nombre, descripcion, fecha, id]
    );

    return result;
};

// PATCH
const modificarWorkout = async (id, workout) => {
    const campos = [];
    const valores = [];

    if (workout.user_id !== undefined) {
        campos.push("user_id = ?");
        valores.push(workout.user_id);
    }

    if (workout.nombre !== undefined) {
        campos.push("nombre = ?");
        valores.push(workout.nombre);
    }

    if (workout.descripcion !== undefined) {
        campos.push("descripcion = ?");
        valores.push(workout.descripcion);
    }

    if (workout.fecha !== undefined) {
        campos.push("fecha = ?");
        valores.push(workout.fecha);
    }

    valores.push(id);

    const [result] = await db.query(
        `UPDATE workouts SET ${campos.join(", ")} WHERE id = ?`,
        valores
    );

    return result;
};

// DELETE
const eliminarWorkout = async (id) => {
    const [result] = await db.query(
        "DELETE FROM workouts WHERE id = ?",
        [id]
    );

    return result;
};

module.exports = {
    obtenerWorkouts,
    obtenerWorkoutPorId,
    crearWorkout,
    actualizarWorkout,
    modificarWorkout,
    eliminarWorkout
};