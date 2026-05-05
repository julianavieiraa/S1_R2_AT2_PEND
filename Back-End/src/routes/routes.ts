import { Router } from "express";
import categoriaRoutes from "./categoria.route";
import produtoRoutes from "./produto.route";
import clienteRoutes from "./cliente.route";
import vendedorRoutes from "./vendedor.routes";
import pedidoRoutes from "./pedido.routes";
import itemPedidoRoutes from "./itemPedido.route";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', pedidoRoutes);
router.use('/', itemPedidoRoutes);

export default router;


