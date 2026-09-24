const express = require("express");

const usersRouter = require("./routes/users");
const workoutsRoutes = require("./routes/workouts");
const exercisesRoutes = require("./routes/exercises");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Workout Tracker API funcionando");
});

app.use("/users", usersRouter);
app.use("/workouts", workoutsRoutes);
app.use("/exercises", exercisesRoutes);

app.get("/headers", (req, res) => {
    const tipoContenido = req.get("Content-Type");

    res.json({
        contentType: tipoContenido
    });
});

app.get("/api-key", (req, res) => {
    const apiKey = req.get("X-API-Key");

    res.json({
        apiKey: apiKey
    });
});

  app.get("/response-header", (req, res) => {
    res.set("X-API-Version", "1.0");

    res.json({
      mensaje: "Cabecera agregada correctamente",
    });
  });

  app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
      mensaje: "Ocurrió un error interno en el servidor",
    });
  });

module.exports = app;
