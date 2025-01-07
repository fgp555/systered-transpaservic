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
  const responseObject = {
    success: true,
    data: {
      id: 4,
      name: "Admin",
      lastname: "Transpaservic",
      email: "admin@transpaservic.com.co",
      phone: "3174232179",
      image: "https://cdn.pixabay.com/photo/2023/05/09/20/36/ai-generated-7982424_1280.jpg",
      session_token:
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkB0cmFuc3Bhc2VydmljLmNvbS5jbyIsImlhdCI6MTczNjM1NTc4NiwiZXhwIjoxNzM2NDQyMTg2fQ.pFYkK6M83_Mh_27Z2HRbBdnfKTx6amNCbs63WW075XI",
      roles: [
        {
          id: 1,
          name: "USUARIO",
          image: null,
          route: "client/products/list",
        },
        {
          id: 3,
          name: "ADMIN",
          image: null,
          route: "sell/orders/list",
        },
      ],
    },
    message: "El usuario ha sido autenticado",
  };

  res.json(responseObject);
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
