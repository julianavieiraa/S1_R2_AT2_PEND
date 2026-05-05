import { RowDataPacket } from "mysql2";

export interface IPedidoDB extends RowDataPacket {
    id_pedido?: number;
    id_cliente: number;
    id_vendedor: number;
    valor_total: number;
}

export class Pedido {

    private _id_pedido?: number;
    private _id_cliente: number;
    private _id_vendedor: number;
    private _valor_total: number;

    constructor(
        id_cliente: number,
        id_vendedor: number,
        valor_total: number,
        id_pedido?: number
    ) {

        Pedido.validarId(id_cliente);
        Pedido.validarId(id_vendedor);
        Pedido.validarValor(valor_total);

        this._id_cliente = id_cliente;
        this._id_vendedor = id_vendedor;
        this._valor_total = valor_total;
        this._id_pedido = id_pedido;
    }

    get Id() {
        return this._id_pedido;
    }

    get IdCliente() {
        return this._id_cliente;
    }

    get IdVendedor() {
        return this._id_vendedor;
    }

    get ValorTotal() {
        return this._valor_total;
    }

    static criar(
        id_cliente: number,
        id_vendedor: number,
        valor_total: number
    ) {
        return new Pedido(id_cliente, id_vendedor, valor_total);
    }

    static validarId(id: number) {

        if (isNaN(id) || id <= 0) {
            throw new Error("Id inválido");
        }

    }

    static validarValor(valor: number) {

        if (valor < 0) {
            throw new Error("Valor inválido")
        }

    }

}