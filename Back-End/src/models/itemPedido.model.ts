import { RowDataPacket } from "mysql2";

export interface IItemPedidoDB extends RowDataPacket {
    id_item?: number
    id_pedido: number
    id_produto: number
    quantidade: number
    preco_unitario: number
}

export class ItemPedido {

    private _id_item?: number
    private _id_pedido: number
    private _id_produto: number
    private _quantidade: number
    private _preco_unitario: number

    constructor(
        id_pedido: number,
        id_produto: number,
        quantidade: number,
        preco_unitario: number,
        id_item?: number
    ) {

        ItemPedido.validarId(id_pedido)
        ItemPedido.validarId(id_produto)

        if (quantidade <= 0) {
            throw new Error("Quantidade inválida")
        }

        if (preco_unitario <= 0) {
            throw new Error("Preço inválido")
        }

        this._id_pedido = id_pedido
        this._id_produto = id_produto
        this._quantidade = quantidade
        this._preco_unitario = preco_unitario
        this._id_item = id_item
    }

    get Id() {
        return this._id_item
    }

    get IdPedido() {
        return this._id_pedido
    }

    get IdProduto() {
        return this._id_produto
    }

    get Quantidade() {
        return this._quantidade
    }

    get PrecoUnitario() {
        return this._preco_unitario
    }

    static criar(
        id_pedido: number,
        id_produto: number,
        quantidade: number,
        preco_unitario: number
    ) {
        return new ItemPedido(
            id_pedido,
            id_produto,
            quantidade,
            preco_unitario
        )
    }

    static validarId(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new Error("Id inválido")
        }
    }

}