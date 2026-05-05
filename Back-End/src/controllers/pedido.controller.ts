import { PedidoService } from "../services/pedido.service";
import { Request, Response } from "express";

export class PedidoController {

    constructor(private _service = new PedidoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const pedidos = await this._service.selecionarTodos();
            return res.status(200).json({ pedidos });
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
            const { id_cliente, id_vendedor, valor_total } = req.body;

            if (!id_cliente || isNaN(id_cliente) || Number(id_cliente) <= 0) {
                return res.status(400).json({ message: 'Cliente inválido' });
            }

            if (!id_vendedor || isNaN(id_vendedor) || Number(id_vendedor) <= 0) {
                return res.status(400).json({ message: 'Vendedor inválido' });
            }

            if (valor_total === undefined || isNaN(valor_total) || Number(valor_total) < 0) {
                return res.status(400).json({ message: "Valor inválido" });
            }

            const pedido = await this._service.criar(
                Number(id_cliente),
                Number(id_vendedor),
                Number(valor_total)
            );

            return res.status(201).json({ pedido });

        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Cliente não encontrado") {
                    return res.status(404).json({ message: error.message });
                }

                if (error.message === "Vendedor não encontrado") {
                    return res.status(404).json({ message: error.message });
                }

                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }

                if (error.message === "Valor inválido") {
                    return res.status(400).json({ message: error.message });
                }

                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }

            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    pedidosDetalhados = async (req: Request, res: Response) => {
        try {
            const pedidos = await this._service.pedidosDetalhados();
            return res.status(200).json({ pedidos });
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
            const id_pedido = Number(req.params.id_pedido);

            if (!id_pedido || isNaN(id_pedido) || id_pedido <= 0) {
                return res.status(400).json({ message: "Id inválido" });
            }

            await this._service.deletar(id_pedido);

            return res.status(200).json({ message: "Pedido deletado com sucesso" });
        } catch (error: unknown) {
            console.error(error);

            if (error instanceof Error) {
                if (error.message === "Pedido não encontrado") {
                    return res.status(404).json({ message: error.message });
                }

                if (error.message === "Id inválido") {
                    return res.status(400).json({ message: error.message });
                }

                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }

            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

}