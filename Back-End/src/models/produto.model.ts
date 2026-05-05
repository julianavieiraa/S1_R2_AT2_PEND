import { RowDataPacket } from "mysql2";

export interface IProdutoDB extends RowDataPacket {
  id_produto?: number;
  nome: string;
  preco: number;
  estoque: number;
  id_categoria: number;
}

export interface IProduto {
  mostrarDados(): string;
}

export class Produto implements IProduto {

  private id_produto?: number;
  private nome: string;
  private preco: number;
  private id_categoria: number;
  private imagens: string[];
  private estoque: number;

  constructor(
    nome: string,
    preco: number,
    id_categoria: number,
    imagens: string[],
    estoque: number = 0
  ) {

    this.validarNome(nome);
    this.validarPreco(preco);
    this.validarCategoriaId(id_categoria);
    this.validarImagens(imagens);

    this.nome = nome;
    this.preco = preco;
    this.id_categoria = id_categoria;
    this.imagens = imagens;
    this.estoque = estoque;
  }

  getId(): number | undefined {
    return this.id_produto;
  }

  getNome(): string {
    return this.nome;
  }

  getPreco(): number {
    return this.preco;
  }

  getCategoriaId(): number {
    return this.id_categoria;
  }

  getImagens(): string[] {
    return [...this.imagens];
  }

  getEstoque(): number {
    return this.estoque;
  }

  setNome(nome: string): void {
    this.validarNome(nome);
    this.nome = nome;
  }

  setPreco(preco: number): void {
    this.validarPreco(preco);
    this.preco = preco;
  }

  setCategoriaId(id_categoria: number): void {
    this.validarCategoriaId(id_categoria);
    this.id_categoria = id_categoria;
  }

  private validarNome(nome: string): void {

    if (!nome || nome.trim().length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres.");
    }

    if (nome.length > 100) {
      throw new Error("Nome muito longo.");
    }
  }

  private validarPreco(preco: number): void {

    if (preco <= 0) {
      throw new Error("Preço deve ser maior que zero.");
    }
  }

  private validarCategoriaId(id_categoria: number): void {

    if (!id_categoria || id_categoria <= 0) {
      throw new Error("Categoria inválida.");
    }
  }

  private validarImagens(imagens: string[]): void {

    if (!imagens || imagens.length === 0) {
      throw new Error("Produto deve ter pelo menos uma imagem.");
    }

    for (const url of imagens) {

      if (!url.startsWith("http")) {
        throw new Error(`URL inválida: ${url}`);
      }

    }
  }

  private validarQuantidade(quantidade: number): void {

    if (quantidade < 0) {
      throw new Error("Quantidade não pode ser negativa.");
    }

    if (!Number.isInteger(quantidade)) {
      throw new Error("Quantidade deve ser um número inteiro.");
    }
  }

  adicionarImagem(url: string): void {

    if (!url.startsWith("http")) {
      throw new Error("URL inválida.");
    }

    this.imagens.push(url);
  }

  removerImagem(url: string): void {

    const index = this.imagens.indexOf(url);

    if (index > -1) {
      this.imagens.splice(index, 1);
    }

    if (this.imagens.length === 0) {
      throw new Error("Produto deve manter pelo menos uma imagem.");
    }
  }

  atualizarEstoque(quantidade: number): void {

    this.validarQuantidade(quantidade);

    this.estoque += quantidade;
  }

  mostrarDados(): string {

    return `
Produto: ${this.nome}
Preço: R$ ${this.preco.toFixed(2)}
Estoque: ${this.estoque}
Categoria: ${this.id_categoria}
Imagens: ${this.imagens.length}
`;
  }
}