import { db } from "../database/connection.database";
import { IItemPedidoDB } from "../models/itemPedido.model";
import { ResultSetHeader } from "mysql2";

export class ItemPedidoRepository {

    async findAll(): Promise<IItemPedidoDB[]> {
        const sql = 'SELECT * FROM itens_pedido;';
        const [rows] = await db.execute<IItemPedidoDB[]>(sql);
        return rows;
    }

    async findByPedido(id: number): Promise<IItemPedidoDB[]> {
        const sql = 'SELECT * FROM itens_pedido WHERE id_pedido=?;';
        const values = [id];
        const [rows] = await db.execute<IItemPedidoDB[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<IItemPedidoDB, 'id_item'>) {
        const sql = 'INSERT INTO itens_pedido(id_pedido, id_produto, quantidade, preco_unitario) VALUES (?,?,?,?);'
        const values = [
            dados.id_pedido,
            dados.id_produto,
            dados.quantidade,
            dados.preco_unitario
        ];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number) {
        const sql = 'DELETE FROM itens_pedido WHERE id_item=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async somarItensPedido(id: number) {
        const sql = 'SELECT SUM(quantidade * preco_unitario) AS total FROM itens_pedido WHERE id_pedido=?;';
        const values = [id];
        const [rows] = await db.execute<any[]>(sql, values);
        return rows[0]?.total ?? 0;
    }

    async atualizarTotalPedido(id: number, total: number) {
        const sql = 'UPDATE pedidos SET valor_total=? WHERE id_pedido=?;';
        const values = [total, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: any) {
        const sql = 'UPDATE itens_pedido SET quantidade=?, preco_unitario=?  WHERE id_item=?;'
        const values = [dados.quantidade, dados.preco_unitario, id];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async findById(id: number): Promise<IItemPedidoDB[]> {
        const sql = 'SELECT * FROM itens_pedido WHERE id_item=?;';
        const values = [id];
        const [rows] = await db.execute<IItemPedidoDB[]>(sql, values);
        return rows;
    }

    async findProdutoById(id: number) {
        const sql = 'SELECT * FROM produtos WHERE id_produto=?;';
        const values = [id];
        const [rows] = await db.execute<any[]>(sql, values);
        return rows;
    }

    async findPedidoById(id: number) {
        const sql = 'SELECT * FROM pedidos WHERE id_pedido=?;';
        const values = [id];
        const [rows] = await db.execute<any[]>(sql, values);
        return rows;
    }

    async atualizarEstoqueProduto(id: number, estoque: number) {
        const sql = 'UPDATE produtos SET estoque=? WHERE id_produto=?;';
        const values = [estoque, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}