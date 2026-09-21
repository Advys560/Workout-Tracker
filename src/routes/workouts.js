const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workoutsController");

router.get("/", workoutsController.obtenerWorkouts);

router.get("/:id", workoutsController.obtenerWorkoutPorId);

router.post("/", workoutsController.crearWorkout);

router.put("/:id", workoutsController.actualizarWorkout);

router.patch("/:id", workoutsController.modificarWorkout);

router.delete("/:id", workoutsController.eliminarWorkout);

module.exports = router;