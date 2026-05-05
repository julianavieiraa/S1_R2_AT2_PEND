import { CategoriaService } from "../services/categoria.service";
import { Request, Response } from "express";

export class CategoriaController {
    constructor(private _service = new CategoriaService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const categorias = await this._service.selecionarTodos();
            return res.status(200).json({ categorias });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    criar = async (req: Request, res: Response) => {
        try {
            const { descricao } = req.body;
            console.log(descricao);
            const novoRegistro = await this._service.criar(descricao);
            return res.status(201).json({ novoRegistro });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const { descricao, ativo } = req.body;
            const id_categoria = Number(req.params.id_categoria);

            const alterado = await this._service.editar(id_categoria, descricao, ativo);

            return res.status(200).json({ alterado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id_categoria = Number(req.params.id_categoria);
            if (!req.params.id_categoria || isNaN(id_categoria) || id_categoria <= 0) {
                return res.status(400).json({ message: "Id inválido" });
            }
            await this._service.deletar(id_categoria);
            return res.status(200).json({ message: "Categoria deletada com sucesso" });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if (error.message === "Categoria não encontrada") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id_categoria = Number(req.params.id_categoria);

            const categoria = await this._service.selecionarPorId(id_categoria);

            return res.status(200).json({ categoria });

        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                if (error.message === "Categoria não encontrada") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }

            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    buscarPorNome = async (req: Request, res: Response) => {
        try {
            const descricao = req.query.descricao;

            if (!descricao || typeof descricao !== 'string') {
                return res.status(400).json({ message: 'Parâmetro "nome" é obrigatório' });
            }

            const categorias = await this._service.buscarPorNome(descricao);

            return res.status(200).json({ categorias });

        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

}