import { Request, Response } from "express";
import { ItemPedidoService } from "../services/itemPedido.service";

export class ItemPedidoController {

    constructor(private _service = new ItemPedidoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const itens = await this._service.selecionarTodos();
            return res.status(200).json({ itens });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
            }
            return res.status(500).json({ message: "Erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

    criar = async (req: Request, res: Response) => {
        try {
            const { id_pedido, id_produto, quantidade } = req.body;

            if (!id_pedido || isNaN(id_pedido) || Number(id_pedido) <= 0) {
                return res.status(400).json({ message: "Pedido inválido" });
            }

            if (!id_produto || isNaN(id_produto) || Number(id_produto) <= 0) {
                return res.status(400).json({ message: "Produto inválido" });
            }

            if (!quantidade || isNaN(quantidade) || Number(quantidade) <= 0) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }

            const item = await this._service.criar(
                Number(id_pedido),
                Number(id_produto),
                Number(quantidade)
            );

            return res.status(201).json({ item });

        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Pedido não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Produto não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Estoque insuficiente") {
                    return res.status(400).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Erro ao criar item do pedido", errorMessage: error.message });
            }
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const id_item = Number(req.params.id_item);
            const { quantidade, preco_unitario } = req.body;

            if (!id_item || isNaN(id_item) || Number(id_item) <= 0) {
                return res.status(400).json({ message: "Id inválido" });
            }

            if (!quantidade || isNaN(quantidade) || Number(quantidade) <= 0) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }

            if (preco_unitario === undefined || isNaN(preco_unitario) || Number(preco_unitario) <= 0) {
                return res.status(400).json({ message: "Preço inválido" });
            }
            const item = await this._service.editar(
                id_item,
                Number(quantidade),
                Number(preco_unitario)
            );

            return res.status(200).json({ item });

        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Item do pedido não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Erro ao editar item do pedido", errorMessage: error.message });
            }

            return res.status(500).json({ message: "Erro ao editar item do pedido", errorMessage: "Erro desconhecido" });
        }
    }

    selecionarPorId = async (req: Request, res: Response) => {
        try {
            const id_item = Number(req.params.id_item);
            const item = await this._service.selecionarPorId(id_item);

            return res.status(200).json({ item });

        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Item do pedido não encontrado") {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
            }

            return res.status(500).json({ message: "Erro no servidor", errorMessage: "Erro desconhecido" });
        }
    }

}