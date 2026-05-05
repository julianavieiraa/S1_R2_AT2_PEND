export interface IPessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {

    private nome: string = "";
    private email: string = "";
    private telefone: string = "";

    constructor(nome: string, email: string, telefone: string) {
        this.setNome(nome);
        this.setEmail(email);
        this.setTelefone(telefone);
    }

    // GETTERS
    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    getTelefone(): string {
        return this.telefone;
    }

    // SETTERS
    setNome(nome: string): void {
        this.validarNome(nome);
        this.nome = nome;
    }

    setEmail(email: string): void {
        this.validarEmail(email);
        this.email = email;
    }

    setTelefone(telefone: string): void {
        this.validarTelefone(telefone);
        this.telefone = telefone;
    }

    // VALIDAÇÕES
    private validarNome(nome: string): void {
        if (!nome || nome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }
        if (nome.length > 100) {
            throw new Error("Nome muito longo.");
        }
    }

    private validarEmail(email: string): void {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            throw new Error("Email inválido.");
        }
    }

    private validarTelefone(telefone: string): void {
        if (!telefone || telefone.trim().length < 10) {
            throw new Error("Telefone deve ter pelo menos 10 dígitos.");
        }
    }

    mostrarDados(): string {
        return `Nome: ${this.nome} | Email: ${this.email} | Telefone: ${this.telefone}`;
    }
}