import { ItemPedidoRepository } from "../repository/itemPedido.repository";
import { ItemPedido } from "../models/itemPedido.model";

export class ItemPedidoService {

    constructor(private _repository = new ItemPedidoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(
        id_pedido: number,
        id_produto: number,
        quantidade: number
    ) {
        if (!id_pedido || isNaN(id_pedido) || id_pedido <= 0) {
            throw new Error("Id inválido");
        }

        if (!id_produto || isNaN(id_produto) || id_produto <= 0) {
            throw new Error("Id inválido");
        }

        if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
            throw new Error("Quantidade inválida");
        }

        const pedido = await this._repository.findPedidoById(id_pedido);
        if (pedido.length === 0) {
            throw new Error("Pedido não encontrado");
        }

        const produto = await this._repository.findProdutoById(id_produto);
        if (produto.length === 0) {
            throw new Error("Produto não encontrado");
        }

        if (produto[0].estoque < quantidade) {
            throw new Error("Estoque insuficiente");
        }

        const preco_unitario = produto[0].preco;

        const item = ItemPedido.criar(
            id_pedido,
            id_produto,
            quantidade,
            preco_unitario
        );

        const result = await this._repository.create({
            id_pedido: item.IdPedido,
            id_produto: item.IdProduto,
            quantidade: item.Quantidade,
            preco_unitario: item.PrecoUnitario
        });

        const novoEstoque = produto[0].estoque - quantidade;
        await this._repository.atualizarEstoqueProduto(id_produto, novoEstoque);

        const total = await this._repository.somarItensPedido(id_pedido);
        await this._repository.atualizarTotalPedido(id_pedido, total);

        return {
            id: result.insertId,
            id_pedido: item.IdPedido,
            id_produto: item.IdProduto,
            quantidade: item.Quantidade,
            preco_unitario: item.PrecoUnitario
        };
    }

    async editar(id_item: number, quantidade: number, preco_unitario: number) {
        if (!id_item || isNaN(id_item) || id_item <= 0) {
            throw new Error("Id inválido");
        }

        const itemAtual = await this._repository.findById(id_item);

        if (itemAtual.length === 0) {
            throw new Error("Item do pedido não encontrado");
        }

        const item = await this._repository.update(id_item, { quantidade, preco_unitario });

        const total = await this._repository.somarItensPedido(itemAtual[0].id_pedido);
        await this._repository.atualizarTotalPedido(itemAtual[0].id_pedido, total);

        return item;
    }

    async selecionarPorId(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error("Id inválido");
        }

        const item = await this._repository.findById(id);

        if (item.length === 0) {
            throw new Error("Item do pedido não encontrado");
        }

        return item[0];
    }
}