import { ProdutoService } from "../services/produto.service";
import { Request, Response } from "express";

export class ProdutoController {

    constructor(private _service = new ProdutoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionarTodos();
            return res.status(200).json({ produtos });
        } catch (error: unknown) {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    }

    criar = async (req: Request, res: Response) => {
        try {
            const { nome, preco, estoque, id_categoria } = req.body;
            // const image = req.file?.filename;
            // if (!image) {
            //     return res.status(400).json({ message: "Imagem é obrigatória" });
            // }
            const { imagem } = req.body;

            const imagemFinal = imagem && imagem.trim() !== ""
                ? imagem
                : "https://via.placeholder.com/300x200?text=Sem+Imagem";

            if (!nome || typeof nome !== "string") {
                return res.status(400).json({ message: "Nome do produto é obrigatório" });
            }
            if (nome.trim().length < 3) {
                return res.status(400).json({ message: "Nome deve ter pelo menos 3 caracteres" });
            }
            if (preco === undefined || isNaN(preco)) {
                return res.status(400).json({ message: "Preço inválido" });
            }
            if (preco <= 0) {
                return res.status(400).json({ message: "Preço deve ser maior que zero" });
            }
            if (estoque === undefined || isNaN(estoque)) {
                return res.status(400).json({ message: "Estoque inválido" });
            }
            if (estoque < 0) {
                return res.status(400).json({ message: "Estoque não pode ser negativo" });
            }
            if (!id_categoria || isNaN(id_categoria) || id_categoria <= 0) {
                return res.status(400).json({ message: "Categoria inválida" });
            }

            // const novoProduto = await this._service.criar(
            //     nome,
            //     Number(preco),
            //     Number(estoque),
            //     Number(id_categoria),
            //     image
            // );
            const novoProduto = await this._service.criar(
                nome,
                Number(preco),
                Number(estoque),
                Number(id_categoria),
                imagemFinal
            );

            return res.status(201).json({ novoProduto });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    // editar = async (req: Request, res: Response) => {
    //     try {

    //         const id_produto = Number(req.params.id || req.params.id_produto);
    //         // const id_produto = Number(req.params.id_produto);
    //         const { nome, preco, estoque, id_categoria } = req.body;

    //         if (!req.params.id_produto || isNaN(id_produto) || id_produto <= 0) {
    //             return res.status(400).json({ message: "Id inválido" });
    //         }

    //         if (!nome || typeof nome !== "string") {
    //             return res.status(400).json({ message: "Nome do produto é obrigatório" });
    //         }

    //         if (nome.trim().length < 3) {
    //             return res.status(400).json({ message: "Nome deve ter pelo menos 3 caracteres" });
    //         }

    //         if (preco === undefined || isNaN(preco)) {
    //             return res.status(400).json({ message: "Preço inválido" });
    //         }

    //         if (Number(preco) <= 0) {
    //             return res.status(400).json({ message: "Preço deve ser maior que zero" });
    //         }

    //         if (estoque === undefined || isNaN(estoque)) {
    //             return res.status(400).json({ message: "Estoque inválido" });
    //         }

    //         if (Number(estoque) < 0) {
    //             return res.status(400).json({ message: "Estoque não pode ser negativo" });
    //         }

    //         if (!id_categoria || isNaN(id_categoria) || Number(id_categoria) <= 0) {
    //             return res.status(400).json({ message: "Categoria inválida" });
    //         }

    //         const alterado = await this._service.editar(
    //             id_produto,
    //             nome,
    //             Number(preco),
    //             Number(estoque),
    //             Number(id_categoria)
    //         );

    //         return res.status(200).json({ alterado });

    //     } catch (error: unknown) {
    //         console.error(error);

    //         if (error instanceof Error) {
    //             return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    //         }
    //         return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
    //     }
    // }

    editar = async (req: Request, res: Response) => {
        try {
            const id_produto = Number(req.params.id_produto);

            if (!id_produto || isNaN(id_produto) || id_produto <= 0) {
                return res.status(400).json({ message: "Id inválido" });
            }

            const { nome, preco, estoque, id_categoria, imagem } = req.body;

            const alterado = await this._service.editar(
                id_produto,
                nome,
                preco,
                estoque,
                id_categoria,
                imagem
            );

            return res.status(200).json({ alterado });

        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            });
        }
    };


    deletar = async (req: Request, res: Response) => {
        try {
            const id_produto = Number(req.params.id_produto);
            if (!req.params.id_produto || isNaN(id_produto) || id_produto <= 0) {
                return res.status(400).json({ message: "Id inválido" });
            }
            await this._service.deletar(id_produto);
            return res.status(200).json({ message: "Produto deletado com sucesso" });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if (error.message === "Produto não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
            }
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id_produto = Number(req.params.id_produto);
            if (!req.params.id_produto || isNaN(id_produto) || id_produto <= 0) {
                return res.status(400).json({ message: "Id inválido" });
            }
            const produto = await this._service.selecionarPorId(id_produto);
            return res.status(200).json({ produto });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if (error.message === "Produto não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
            }
            return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }
}