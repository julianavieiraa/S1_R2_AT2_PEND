import { db } from "../database/connection.database";
import { ResultSetHeader } from "mysql2";

export class ImagemRepository {

    async create(url: string, id_produto: number) {
        const sql = 'INSERT INTO imagens_produto (url, id_produto) VALUES (?,?)'
        const values = [url, id_produto];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

}