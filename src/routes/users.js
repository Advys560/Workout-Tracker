const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const {
  obtenerUsuarios,
  buscarUsuarios,
  limitarUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  actualizarParteUsuario,
  eliminarUsuario,
} = require("../controllers/usersController");

router.get("/", obtenerUsuarios);
router.get("/search", buscarUsuarios);
router.get("/limit", limitarUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.post("/", crearUsuario);
router.get("/:id/workouts", usersController.obtenerWorkoutsPorUsuario);
router.put("/:id", actualizarUsuario);
router.patch("/:id", actualizarParteUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
