const express = require("express");
const router = express.Router();

const progressController = require("../controllers/progressController");

router.get("/", progressController.obtenerProgress);
router.get("/:id", progressController.obtenerProgressPorId);
router.post("/", progressController.crearProgress);
router.put("/:id", progressController.actualizarProgress);
router.patch("/:id", progressController.modificarProgress);
router.delete("/:id", progressController.eliminarProgress);

module.exports = router;
