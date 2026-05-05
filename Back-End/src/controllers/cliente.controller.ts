import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";
import { Cliente } from "../models/cliente.model";

export class ClienteController {
    constructor(private _service = new ClienteService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const clientes = await this._service.selecionarTodos();

            return res.status(200).json({ clientes: clientes.map((c: any) => new Cliente(c.nome, c.email, c.telefone, c.cpf, c.endereco, c.id_cliente).mostrarDados()) });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
            }
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id_cliente = Number(req.params.id_cliente);
            const c = await this._service.selecionarPorId(id_cliente);

            return res.status(200).json({ cliente: new Cliente(c.nome, c.email, c.telefone, c.cpf, c.endereco, c.id_cliente).mostrarDados() });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Cliente não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
            }

            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

    criar = async (req: Request, res: Response) => {
        try {
            const { nome, email, cpf, telefone, endereco } = req.body;
            if (!nome || !email || !cpf) return res.status(400).json({ message: "Nome, email e cpf são obrigatórios" });
            const cliente = await this._service.criar(nome, email, cpf, telefone, endereco);
            return res.status(201).json({ cliente });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if (error.message === "Telefone já cadastrado") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
            }
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const id_cliente = Number(req.params.id_cliente);
            const { nome, email, cpf, telefone, endereco } = req.body;

            const cliente = await this._service.editar(id_cliente, nome, email, cpf, telefone, endereco);

            return res.status(200).json({ cliente });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Cliente não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                if (error.message === "Telefone já cadastrado") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
            }

            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id_cliente = Number(req.params.id_cliente);

            await this._service.deletar(id_cliente);

            return res.status(200).json({ message: "Cliente deletado com sucesso" });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Cliente não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
            }

            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }
}