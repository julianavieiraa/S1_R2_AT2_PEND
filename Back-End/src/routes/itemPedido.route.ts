import { Router } from "express";
import { ItemPedidoController } from "../controllers/itemPedido.controller";

const itemPedidoController = new ItemPedidoController()

const itemPedidoRoutes = Router()

itemPedidoRoutes.get("/itens-pedido", itemPedidoController.selecionarTodos);
itemPedidoRoutes.post("/itens-pedido", itemPedidoController.criar);
itemPedidoRoutes.patch("/itens-pedido/:id_item", itemPedidoController.editar);

export default itemPedidoRoutes