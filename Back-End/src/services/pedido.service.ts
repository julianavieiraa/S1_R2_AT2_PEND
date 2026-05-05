import { PedidoRepository } from "../repository/pedido.repository";
import { Pedido } from "../models/pedido.model";
import { ClienteRepository } from "../repository/cliente.repository";
import { VendedorRepository } from "../repository/vendedor.repository";

export class PedidoService {

  constructor(
    private _repository = new PedidoRepository(),
    private _clienteRepository = new ClienteRepository(),
    private _vendedorRepository = new VendedorRepository()
  ) { }

  async selecionarTodos() {
    return await this._repository.findAll();
  }

  async criar(
    id_cliente: number,
    id_vendedor: number,
    valor_total: number
  ) {

    Pedido.validarId(id_cliente);
    Pedido.validarId(id_vendedor);
    Pedido.validarValor(valor_total);

    const cliente = await this._clienteRepository.findById(id_cliente);
    if (cliente.length === 0) {
      throw new Error("Cliente não encontrado");
    }

    const vendedor = await this._vendedorRepository.findById(id_vendedor);
    if (vendedor.length === 0) {
      throw new Error("Vendedor não encontrado");
    }

    const pedido = Pedido.criar(
      id_cliente,
      id_vendedor,
      valor_total
    );

    const idPedido = await this._repository.create({
      id_cliente: pedido.IdCliente,
      id_vendedor: pedido.IdVendedor,
      valor_total: pedido.ValorTotal
    });

    return {
      idPedido,
      id_cliente: pedido.IdCliente,
      id_vendedor: pedido.IdVendedor,
      valor_total: pedido.ValorTotal
    };

  }

  async pedidosDetalhados() {
    return await this._repository.findPedidosDetalhados();
  }

  async deletar(id: number) {

    Pedido.validarId(id);

    const result = await this._repository.delete(id);

    if (result.affectedRows === 0) {
      throw new Error("Pedido não encontrado");
    }

    return result;

  }

}