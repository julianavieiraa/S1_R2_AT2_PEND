import { db } from "../database/connection.database";
import { IVendedor } from "../models/vendedor.model";
import { ResultSetHeader } from "mysql2";

export class VendedorRepository {

    async findAll(): Promise<IVendedor[]> {
        const sql = 'SELECT * FROM vendedores;';
        const [rows] = await db.execute<IVendedor[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<IVendedor[]> {
        const sql = 'SELECT * FROM vendedores WHERE id_vendedor=?;';
        const values = [id];
        const [rows] = await db.execute<IVendedor[]>(sql, values);
        return rows;
    }

    async findByEmail(email: string): Promise<IVendedor[]> {
        const sql = 'SELECT * FROM vendedores WHERE email=?;';
        const values = [email];
        const [rows] = await db.execute<IVendedor[]>(sql, values);
        return rows;
    }

    async findByTelefone(telefone: string): Promise<IVendedor[]> {
        const sql = 'SELECT * FROM vendedores WHERE telefone=?;';
        const values = [telefone];
        const [rows] = await db.execute<IVendedor[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<IVendedor, "id_vendedor">) {
        const sql = 'INSERT INTO vendedores(nome, email, telefone) VALUES (?,?,?);';
        const values = [
            dados.nome,
            dados.email,
            dados.telefone
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<IVendedor, "id_vendedor">) {
        const sql = 'UPDATE vendedores SET nome=?, email=?, telefone=? WHERE id_vendedor=?;';
        const values = [
            dados.nome,
            dados.email,
            dados.telefone,
            id
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number) {
        const sql = 'DELETE FROM vendedores WHERE id_vendedor=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}