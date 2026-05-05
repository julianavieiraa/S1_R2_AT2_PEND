import { PedidoController } from "../controllers/pedido.controller";
import { Router } from "express";

const pedidoController = new PedidoController();
const pedidoRoutes = Router();

pedidoRoutes.get('/pedidos', pedidoController.selecionarTodos);
pedidoRoutes.post('/pedidos', pedidoController.criar);
pedidoRoutes.get('/pedidos-detalhados', pedidoController.pedidosDetalhados)
pedidoRoutes.delete('/pedidos/:id_pedido', pedidoController.deletar);

export default pedidoRoutes;
