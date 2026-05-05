import { Request, Response } from "express";
import { VendedorService } from "../services/vendedor.service";
import { Vendedor } from "../models/vendedor.model";

export class VendedorController {

    constructor(private _service = new VendedorService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const vendedores = await this._service.selecionarTodos();

            return res.status(200).json({
                vendedores: vendedores.map((v: any) =>
                    new Vendedor(v.nome, v.email, v.telefone, v.id_vendedor).mostrarDados()
                )
            });
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
            const id_vendedor = Number(req.params.id_vendedor);
            const v = await this._service.selecionarPorId(id_vendedor);

            return res.status(200).json({
                vendedor: new Vendedor(v.nome, v.email, v.telefone, v.id_vendedor).mostrarDados()
            });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Vendedor não encontrado") {
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
            const { nome, email, telefone } = req.body;

            if (!nome || !email || !telefone) return res.status(400).json({ message: "Nome, email e telefone são obrigatórios" });

            const vendedor = await this._service.criar(nome, email, telefone);

            return res.status(201).json({ vendedor });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Email já cadastrado") {
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

    editar = async (req: Request, res: Response) => {
        try {
            const id_vendedor = Number(req.params.id_vendedor);
            const { nome, email, telefone } = req.body;

            const vendedor = await this._service.editar(id_vendedor, nome, email, telefone);

            return res.status(200).json({ vendedor });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Vendedor não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                if (error.message === "Email já cadastrado") {
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
            const id_vendedor = Number(req.params.id_vendedor);

            await this._service.deletar(id_vendedor);

            return res.status(200).json({ message: "Vendedor deletado com sucesso" });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Vendedor não encontrado") {
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