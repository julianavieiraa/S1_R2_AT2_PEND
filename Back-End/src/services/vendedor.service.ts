import { VendedorRepository } from "../repository/vendedor.repository";
import { Vendedor } from "../models/vendedor.model";

export class VendedorService {

    constructor(private _repository = new VendedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarPorId(id: number) {
        Vendedor.validarId(id);

        const vendedor = await this._repository.findById(id);

        if (vendedor.length === 0) {
            throw new Error("Vendedor não encontrado");
        }

        return vendedor[0];
    }

    async criar(nome: string, email: string, telefone: string) {
        const vendedorEmail = await this._repository.findByEmail(email);
        if (vendedorEmail.length > 0) {
            throw new Error("Email já cadastrado");
        }

        const vendedorTelefone = await this._repository.findByTelefone(telefone);
        if (vendedorTelefone.length > 0) {
            throw new Error("Telefone já cadastrado");
        }

        const vendedor = Vendedor.criar(nome, email, telefone);

        const result = await this._repository.create({
            nome: vendedor.getNome(),
            email: vendedor.getEmail(),
            telefone: vendedor.getTelefone()
        });

        return { id: result.insertId, vendedor };
    }

    async editar(id: number, nome?: string, email?: string, telefone?: string) {
        Vendedor.validarId(id);

        const vendedorAtual = await this._repository.findById(id);

        if (vendedorAtual.length === 0) {
            throw new Error("Vendedor não encontrado");
        }

        const atual = vendedorAtual[0];

        if (email) {
            const vendedorEmail = await this._repository.findByEmail(email);
            if (vendedorEmail.length > 0 && vendedorEmail[0].id_vendedor !== id) {
                throw new Error("Email já cadastrado");
            }
        }

        if (telefone) {
            const vendedorTelefone = await this._repository.findByTelefone(telefone);
            if (vendedorTelefone.length > 0 && vendedorTelefone[0].id_vendedor !== id) {
                throw new Error("Telefone já cadastrado");
            }
        }

        const vendedor = Vendedor.editar(
            id,
            nome ?? atual.nome,
            email ?? atual.email,
            telefone ?? atual.telefone
        );

        const result = await this._repository.update(id, {
            nome: vendedor.getNome(),
            email: vendedor.getEmail(),
            telefone: vendedor.getTelefone()
        });

        return result;
    }

    async deletar(id: number) {
        Vendedor.validarId(id);

        const result = await this._repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Vendedor não encontrado");
        }

        return result;
    }
}