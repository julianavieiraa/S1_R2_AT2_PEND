import { ClienteController } from "../controllers/cliente.controller";
import { Router } from "express";

const clienteController = new ClienteController();
const clienteRoutes = Router();

clienteRoutes.get('/clientes', clienteController.selecionarTodos);
clienteRoutes.post('/clientes', clienteController.criar);
clienteRoutes.patch('/clientes/:id_cliente', clienteController.editar);
clienteRoutes.delete('/clientes/:id_cliente', clienteController.deletar);
clienteRoutes.get('/clientes/:id_cliente', clienteController.selecionarPorId);

export default clienteRoutes;