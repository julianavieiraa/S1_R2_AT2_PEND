import { db } from "../database/connection.database";
import { ResultSetHeader } from "mysql2";
import { IProdutoDB } from "../models/produto.model";

export class ProdutoRepository {

    // async findAll(): Promise<IProdutoDB[]> {

    //     const [rows] = await db.execute<IProdutoDB[]>(
    //         'SELECT * FROM produtos'
    //     );
    //     return rows;
    // }

    async findAll(): Promise<any[]> {
        const [rows] = await db.execute<any[]>(`
        SELECT 
            p.id_produto,
            p.nome,
            p.preco,
            p.estoque,
            p.id_categoria,
            i.url AS imagem
        FROM produtos p
        LEFT JOIN imagens_produto i
            ON i.id_produto = p.id_produto
    `);

        return rows;
    }

    async findById(id: number): Promise<IProdutoDB[]> {
        const sql = 'SELECT * FROM produtos WHERE id_produto=?;';
        const values = [id];
        const [rows] = await db.execute<IProdutoDB[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<IProdutoDB, "id_produto">): Promise<number> {
        const sql = 'INSERT INTO produtos (nome, preco, estoque, id_categoria) VALUES (?,?,?,?)'
        const values = [
            dados.nome,
            dados.preco,
            dados.estoque,
            dados.id_categoria
        ];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result.insertId;
    }

    // async update(id: number, dados: Omit<IProdutoDB, "id_produto">) {
    //     const sql = 'UPDATE produtos SET nome=?, preco=?, estoque=?, id_categoria=? WHERE id_produto=?;'
    //     const values = [
    //         dados.nome,
    //         dados.preco,
    //         dados.estoque,
    //         dados.id_categoria,
    //         id
    //     ];
    //     const [rows] = await db.execute<ResultSetHeader>(sql, values);
    //     return rows;
    // }

    async updateImagem(id_produto: number, url: string) {
        const sql = `
        UPDATE imagens_produto 
        SET url=? 
        WHERE id_produto=?;
    `;

        const values = [url, id_produto];

        return await db.execute(sql, values);
    }

    async delete(id: number) {
        const sql = "DELETE FROM produtos WHERE id_produto=?;";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async findByNome(nome: string): Promise<IProdutoDB[]> {
        const sql = "SELECT * FROM produtos WHERE nome LIKE ?;";
        const values = [`%${nome}%`];
        const [rows] = await db.execute<IProdutoDB[]>(sql, values);
        return rows;
    }


    async updateProduto(id: number, dados: any) {
        const sql = 'UPDATE produtos SET nome=?, preco=?, estoque=?, id_categoria=?  WHERE id_produto=?;';

        const values = [
            dados.nome ?? null,
            dados.preco ?? null,
            dados.estoque ?? null,
            dados.id_categoria ?? null,
            id
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}