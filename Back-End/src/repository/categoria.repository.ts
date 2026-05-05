import { db } from "../database/connection.database";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2";

//Promise (Promessa) espero que tenha algum retorno desse tipo
export class CategoriaRepository {

    async findAll(): Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'SELECT * FROM Categorias'
        );
        return rows;
    }

    async findById(id: number): Promise<ICategoria[]> {
        const sql = 'SELECT * FROM categorias WHERE id_categoria=?;';
        const values = [id];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<ICategoria, 'id_categoria'>) {
        const sql = 'INSERT INTO categorias (descricao, ativo) VALUES (?,?);';
        const values = [dados._descricao, dados._ativo];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

    async update(id: number, dados: Omit<ICategoria, 'id_categoria'>) {
        const sql = 'UPDATE categorias SET descricao =?, ativo=? WHERE id_categoria=? ;';
        const values = [dados._descricao, dados._ativo, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

    async delete(id: number) {
        const sql = 'DELETE FROM categorias WHERE id_categoria=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async findByNome(descricao: string) {
        const sql = 'SELECT * FROM categorias WHERE descricao LIKE ?;';
        const values = [descricao];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        return rows;
    }


}