import { CategoriaRepository } from "../repository/categoria.repository";
import { Categoria } from "../models/categoria.model";

export class CategoriaService {

    constructor(private _repository = new CategoriaRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(descricao: string) {

        const categoria = Categoria.criar(descricao);

        return await this._repository.create(categoria);

    }

    async editar(id: number, descricao: string, ativo: boolean) {
        Categoria.validarId(id);
        const categoria = Categoria.editar(descricao, ativo, id);
        return await this._repository.update(id, categoria);

    }

    async deletar(id: number) {

        Categoria.validarId(id);

        const resultado = await this._repository.delete(id);

        if (resultado.affectedRows === 0) {
            throw new Error("Categoria não encontrada");
        }

        return resultado;

    }

    async selecionarPorId(id: number) {

        Categoria.validarId(id);

        const categoria = await this._repository.findById(id);

        if (!categoria || categoria.length === 0) {
            throw new Error("Categoria não encontrada");
        }

        return categoria;

    }

    async buscarPorNome(nome: string) {
        return await this._repository.findByNome(nome);
    }


}