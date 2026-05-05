import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaController = new CategoriaController();
const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', categoriaController.selecionarTodos);
categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.patch('/categorias/:id_categoria', categoriaController.editar);
categoriaRoutes.delete('/categorias/:id_categoria', categoriaController.deletar);
categoriaRoutes.get('/categorias/:id_categoria', categoriaController.selecionarPorId);

export default categoriaRoutes;