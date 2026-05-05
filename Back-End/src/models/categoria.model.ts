import { RowDataPacket } from "mysql2";

export interface ICategoria extends RowDataPacket {
    id_categoria?: number;
    descricao?: string;
    ativo?: boolean;
    dataCad?: Date;
}

export class Categoria {

    private _id_categoria?: number;
    private _descricao: string = '';
    private _ativo: boolean;
    private _dataCad?: Date;

    constructor(descricao: string, ativo: boolean = true, id_categoria?: number) {
        this.Descricao = descricao;
        this._ativo = ativo;
        this._id_categoria = id_categoria;
    }

    // GETTERS

    public get Id(): number | undefined {
        return this._id_categoria;
    }

    public get Descricao(): string {
        return this._descricao;
    }

    public get Ativo(): boolean {
        return this._ativo;
    }

    public get DataCad(): Date | undefined {
        return this._dataCad;
    }

    // SETTER

    public set Descricao(value: string) {
        this._validarDescricao(value);
        this._descricao = value;
    }

    // FACTORY

    public static criar(descricao: string): Categoria {
        return new Categoria(descricao, true);
    }

    public static editar(descricao: string, ativo: boolean, id_categoria: number): Categoria {
        return new Categoria(descricao, ativo, id_categoria);
    }

    private _validarDescricao(value: string): void {

        if (!value || value.trim().length < 3) {
            throw new Error("Nome da categoria deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 45) {
            throw new Error("Nome da categoria deve ter no máximo 45 caracteres");
        }

    }

    public static validarId(id_categoria: number): void {

        if (isNaN(id_categoria) || id_categoria <= 0) {
            throw new Error("Id inválido");
        }

    }

}