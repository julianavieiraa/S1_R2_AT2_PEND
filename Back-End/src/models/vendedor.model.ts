import { RowDataPacket } from "mysql2";
import { Pessoa } from "./pessoa.model";

export interface IVendedor extends RowDataPacket {
    id_vendedor?: number;
    nome: string;
    email: string;
    telefone: string;
}

export class Vendedor extends Pessoa {

    private _id_vendedor?: number;

    constructor(
        nome: string,
        email: string,
        telefone: string,
        id_vendedor?: number
    ) {
        super(nome, email, telefone);
        this._id_vendedor = id_vendedor;
    }

    // GET
    public get Id(): number | undefined {
        return this._id_vendedor;
    }

    // FACTORY
    public static criar(nome: string, email: string, telefone: string) {
        return new Vendedor(nome, email, telefone);
    }

    public static editar(id_vendedor: number, nome: string, email: string, telefone: string) {
        return new Vendedor(nome, email, telefone, id_vendedor);
    }

    public static validarId(id_vendedor: number) {

        if (isNaN(id_vendedor) || id_vendedor <= 0) {
            throw new Error("Id inválido");
        }

    }

    mostrarDados(): string {
    return `Id: ${this.Id} | Nome: ${this.getNome()} | Email: ${this.getEmail()} | Telefone: ${this.getTelefone()}`
}

}