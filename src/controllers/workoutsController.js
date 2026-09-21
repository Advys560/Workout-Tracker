const workoutsModel = require("../models/workoutsModel");

const obtenerWorkouts = async (req, res) => {
    try {
        const workouts = await workoutsModel.obtenerWorkouts();

        res.status(200).json(workouts);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener los workouts"
        });
    }
};

const obtenerWorkoutPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const workout = await workoutsModel.obtenerWorkoutPorId(id);

        if (!workout) {
            return res.status(404).json({
                mensaje: "Workout no encontrado"
            });
        }

        res.status(200).json(workout);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener el workout"
        });
    }
};

const crearWorkout = async (req, res) => {
    try {
        const { user_id, nombre, descripcion, fecha } = req.body;

        if (!user_id || !nombre || !fecha) {
            return res.status(400).json({
                mensaje: "user_id, nombre y fecha son obligatorios"
            });
        }

        const id = await workoutsModel.crearWorkout({
            user_id,
            nombre,
            descripcion,
            fecha
        });

        res.status(201).json({
            mensaje: "Workout creado correctamente",
            id: id
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al crear el workout"
        });
    }
};

const actualizarWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, nombre, descripcion, fecha } = req.body;

        if (!user_id || !nombre || !fecha) {
            return res.status(400).json({
                mensaje: "user_id, nombre y fecha son obligatorios"
            });
        }

        const resultado = await workoutsModel.actualizarWorkout(id, {
            user_id,
            nombre,
            descripcion,
            fecha
        });

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Workout no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Workout actualizado correctamente"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al actualizar el workout"
        });
    }
};

const modificarWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await workoutsModel.modificarWorkout(
            id,
            req.body
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Workout no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Workout modificado correctamente"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al modificar el workout"
        });
    }
};

const eliminarWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await workoutsModel.eliminarWorkout(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Workout no encontrado"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar el workout"
        });
    }
};

module.exports = {
    obtenerWorkouts,
    obtenerWorkoutPorId,
    crearWorkout,
    actualizarWorkout,
    modificarWorkout,
    eliminarWorkout
};