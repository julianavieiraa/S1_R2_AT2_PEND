import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";
import uploadImage from "../middleware/uploadImage.middleware";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionarTodos);
produtoRoutes.get('/produtos/:id_produto', produtoController.selecionarPorId);
produtoRoutes.post("/produtos",uploadImage, produtoController.criar);
produtoRoutes.put('/produtos/:id_produto', produtoController.editar);
produtoRoutes.delete("/produtos/:id_produto", produtoController.deletar);

export default produtoRoutes;