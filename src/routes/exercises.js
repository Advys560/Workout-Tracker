const express = require("express");

const router = express.Router();

const exercisesController = require("../controllers/exercisesController");

router.get("/", exercisesController.obtenerExercises);
router.get("/:id", exercisesController.obtenerExercisePorId);
router.post("/", exercisesController.crearExercise);

router.put("/:id", exercisesController.actualizarExercise);

router.patch("/:id", exercisesController.modificarExercise);

router.delete("/:id", exercisesController.eliminarExercise);

module.exports = router;