import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";

const app = express();

// Configuración de multer
const storage = multer.memoryStorage(); // Puedes usar diskStorage para guardar en disco
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api/users/login", (req, res) => {
  res.json({ message: "hello" });
});

// Endpoint para registrar usuarios
app.post("/api/users/create", upload.single("image"), (req, res) => {
  const user = JSON.parse(req.body.user); // Parsear el objeto 'user' del formulario
  const image = req.file; // Aquí estará la información del archivo

  console.log("user:", user);
  console.log("image:", image);

  // Simular respuesta
  res.json({ message: "Usuario registrado exitosamente", user, image });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
