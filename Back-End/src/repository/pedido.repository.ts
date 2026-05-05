import { db } from "../database/connection.database";
import { ResultSetHeader } from "mysql2";
import { IPedidoDB } from "../models/pedido.model";

export class PedidoRepository {

    async findAll(): Promise<IPedidoDB[]> {

        const [rows] = await db.execute<IPedidoDB[]>(
            "SELECT * FROM pedidos"
        );

        return rows;
    }

    async create(dados: Omit<IPedidoDB, "id_pedido">): Promise<number> {

        const sql = `
    INSERT INTO pedidos (id_cliente, id_vendedor, valor_total)
    VALUES (?,?,?)
    `;

        const values = [
            dados.id_cliente,
            dados.id_vendedor,
            dados.valor_total
        ];

        const [result] = await db.execute<ResultSetHeader>(sql, values);

        return result.insertId;
    }

    async findPedidosDetalhados() {

        const sql = `
    SELECT 
        p.id_pedido,
        c.nome AS cliente,
        v.nome AS vendedor,
        pr.nome AS produto,
        ip.quantidade,
        ip.preco_unitario,
        (ip.quantidade * ip.preco_unitario) AS total_item,
        p.valor_total
    FROM pedidos p
    JOIN clientes c ON p.id_cliente = c.id_cliente
    JOIN vendedores v ON p.id_vendedor = v.id_vendedor
    JOIN itens_pedido ip ON p.id_pedido = ip.id_pedido
    JOIN produtos pr ON ip.id_produto = pr.id_produto
    ORDER BY p.id_pedido;
    `;

        const [rows] = await db.execute(sql)

        return rows
    }

    async delete(id: number) {
        const sql = 'DELETE FROM pedidos WHERE id_pedido=?';
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }

}