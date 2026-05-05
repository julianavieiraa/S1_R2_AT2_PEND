import { Router } from "express";   
import { VendedorController } from "../controllers/vendedor.controller";

const vendedorController = new VendedorController();
const vendedorRoutes = Router();

vendedorRoutes.get('/vendedores', vendedorController.selecionarTodos);
vendedorRoutes.post('/vendedores', vendedorController.criar);
vendedorRoutes.get('/vendedores/:id_vendedor', vendedorController.selecionarPorId);
vendedorRoutes.patch('/vendedores/:id_vendedor', vendedorController.editar);
vendedorRoutes.delete('/vendedores/:id_vendedor', vendedorController.deletar);


export default vendedorRoutes;