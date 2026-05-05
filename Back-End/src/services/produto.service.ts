import { ProdutoRepository } from "../repository/produto.repository";
import { ImagemRepository } from "../repository/imagem.repository";

export class ProdutoService {

    constructor(
        private _repository = new ProdutoRepository(),
        private _imagemRepository = new ImagemRepository()
    ) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(
        nome: string,
        preco: number,
        estoque: number,
        id_categoria: number,
        imagem: string
    ) {
        const idProduto = await this._repository.create({
            nome,
            preco,
            estoque,
            id_categoria
        });
        await this._imagemRepository.create(imagem, idProduto);
        return { idProduto, nome, preco, estoque, id_categoria, imagem };
    }

    async editar(
        id: number,
        nome?: string,
        preco?: number,
        estoque?: number,
        id_categoria?: number,
        imagem?: string
    ) {
        const produtoArray = await this._repository.findById(id);
        const produtoAtual = produtoArray[0];

        if (!produtoAtual) {
            throw new Error("Produto não encontrado");
        }

        const dadosAtualizados = {
            nome: nome ?? produtoAtual.nome,
            preco: preco ?? produtoAtual.preco,
            estoque: estoque ?? produtoAtual.estoque,
            id_categoria: id_categoria ?? produtoAtual.id_categoria
        };

        await this._repository.updateProduto(id, dadosAtualizados);

        if (imagem) {
            await this._repository.updateImagem(id, imagem);
        }

        return { ...dadosAtualizados, imagem };
    }


    async deletar(id: number) {

        const result = await this._repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Produto não encontrado");
        }
        return result;
    }

    async selecionarPorId(id: number) {
        const produto = await this._repository.findById(id);
        if (produto.length === 0) {
            throw new Error("Produto não encontrado");
        }
        return produto;
    }

    async buscarPorNome(nome: string) {
        const produto = await this._repository.findByNome(nome);
        return produto;
    }

}