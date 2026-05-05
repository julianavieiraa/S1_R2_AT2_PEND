import { ClienteRepository } from "../repository/cliente.repository";
import { Cliente } from "../models/cliente.model";

export class ClienteService {
    constructor(private _repository = new ClienteRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        Cliente.validarId(id);

        const cliente = await this._repository.findById(id);

        if (cliente.length === 0) {
            throw new Error("Cliente não encontrado");
        }

        return cliente[0];
    }

    async criar(
        nome: string,
        email: string,
        cpf: string,
        telefone?: string,
        endereco?: string
    ) {
        if (telefone) {
            const telefoneExistente = await this._repository.findByTelefone(telefone);

            if (telefoneExistente.length > 0) {
                throw new Error("Telefone já cadastrado");
            }
        }

        const cliente = Cliente.criar(
            nome,
            email,
            cpf,
            telefone ?? "",
            endereco ?? ""
        );

        const id = await this._repository.create({
            nome: cliente.getNome(),
            email: cliente.getEmail(),
            cpf: cliente.Cpf,
            telefone: cliente.getTelefone(),
            endereco: cliente.Endereco
        });

        return { id, cliente };
    }

    async editar(
        id: number,
        nome?: string,
        email?: string,
        cpf?: string,
        telefone?: string,
        endereco?: string
    ) {
        Cliente.validarId(id);

        const clienteAtual = await this._repository.findById(id);

        if (clienteAtual.length === 0) {
            throw new Error("Cliente não encontrado");
        }

        const atual = clienteAtual[0];

        if (telefone) {
            const telefoneExistente = await this._repository.findByTelefone(telefone);

            if (telefoneExistente.length > 0 && telefoneExistente[0].id_cliente !== id) {
                throw new Error("Telefone já cadastrado");
            }
        }

        const cliente = Cliente.editar(
            id,
            nome ?? atual.nome,
            email ?? atual.email,
            cpf ?? atual.cpf,
            telefone ?? atual.telefone,
            endereco ?? atual.endereco
        );

        const result = await this._repository.update(id, {
            nome: cliente.getNome(),
            email: cliente.getEmail(),
            cpf: cliente.Cpf,
            telefone: cliente.getTelefone(),
            endereco: cliente.Endereco
        });

        return result;
    }

    async deletar(id: number) {
        Cliente.validarId(id);

        const result = await this._repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Cliente não encontrado");
        }

        return result;
    }
}