import { Modalidade } from "./modalidade.model";

export class Faixa {
    id!: number;
    nome!: string;
    descricao!: string;
    preco!: number;
    estoque!: number;
    nomeImagem!: string;
    modalidade!: Modalidade;
}
