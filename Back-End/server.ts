import express from "express";
import { EnvVar } from "./src/config/EnvVar";
import router from "./src/routes/routes";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/", router);

app.listen(EnvVar.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${EnvVar.SERVER_PORT}`);
});



