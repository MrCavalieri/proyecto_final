const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rutas = require("./routes/router");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", rutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Servidor iniciado en el puerto ${PORT}`)
);
