import { db } from "../database/connection.database";
import { ICliente } from "../models/cliente.model";
import { ResultSetHeader } from "mysql2";

export class ClienteRepository {

    async findAll(): Promise<ICliente[]> {
        const sql = "SELECT * FROM clientes;";
        const [rows] = await db.execute<ICliente[]>(sql);
        return rows;
    }

    async findById(id: number): Promise<ICliente[]> {
        const sql = "SELECT * FROM clientes WHERE id_cliente=?;";
        const values = [id];
        const [rows] = await db.execute<ICliente[]>(sql, values);
        return rows;
    }

    async findByTelefone(telefone: string): Promise<ICliente[]> {
        const sql = "SELECT * FROM clientes WHERE telefone=?;";
        const values = [telefone];
        const [rows] = await db.execute<ICliente[]>(sql, values);
        return rows;
    }

    async create(dados: Omit<ICliente, "id_cliente">) {
        const sql = `
        INSERT INTO clientes
        (nome, email, cpf, telefone, endereco)
        VALUES (?,?,?,?,?);
        `;

        const values = [
            dados.nome,
            dados.email,
            dados.cpf,
            dados.telefone,
            dados.endereco
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<ICliente, "id_cliente">) {
        const sql = `
        UPDATE clientes
        SET nome=?, email=?, cpf=?, telefone=?, endereco=?
        WHERE id_cliente=?;
        `;

        const values = [
            dados.nome,
            dados.email,
            dados.cpf,
            dados.telefone,
            dados.endereco,
            id
        ];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number) {
        const sql = "DELETE FROM clientes WHERE id_cliente=?;";
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}