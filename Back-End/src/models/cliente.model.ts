import { RowDataPacket } from "mysql2";
import { Pessoa } from "./pessoa.model";

export interface ICliente extends RowDataPacket {
    id_cliente?: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    endereco: string;
}

export class Cliente extends Pessoa {

    private _id_cliente?: number;
    private _cpf: string;
    private _endereco: string;

    constructor(
        nome: string,
        email: string,
        telefone: string,
        cpf: string,
        endereco: string,
        id_cliente?: number
    ) {
        super(nome, email, telefone);
        this._cpf = cpf;
        this._endereco = endereco;
        this._id_cliente = id_cliente;
    }

    // GET
    public get Id(): number | undefined {
        return this._id_cliente;
    }

    public get Cpf(): string {
        return this._cpf;
    }

    public get Endereco(): string {
        return this._endereco;
    }

    // FACTORY

    public static criar(
        nome: string,
        email: string,
        cpf: string,
        telefone: string,
        endereco: string
    ) {
        return new Cliente(nome, email, telefone, cpf, endereco);
    }

    public static editar(
        id_cliente: number,
        nome: string,
        email: string,
        cpf: string,
        telefone: string,
        endereco: string
    ) {
        return new Cliente(nome, email, telefone, cpf, endereco, id_cliente);
    }

    public static validarId(id: number) {

        if (isNaN(id) || id <= 0) {
            throw new Error("Id inválido");
        }

    }

    public mostrarDados(): string {
        return `Id: ${this._id_cliente} | Cliente: ${this.getNome()} | Email: ${this.getEmail()} | CPF: ${this._cpf} | Telefone: ${this.getTelefone()} | Endereço: ${this._endereco}`;
    }

}