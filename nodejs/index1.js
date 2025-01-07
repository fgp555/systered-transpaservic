import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api/users/login", (req, res) => {
  console.log("req", req);
  res.json({ message: "hello" });
});

app.post("/api/users/create", (req, res) => {
  console.log("req", req.body);
  res.json({ message: "hello" });
});

app.listen(3000);
console.log("http://localhost:3000");
