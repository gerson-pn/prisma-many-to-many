import { Banco, Correntista } from "@prisma/client"
import { cadastrarCorrentista, cadastrarCorrentistaBanco, cadastrarCorrentistaBancos, deletarCorrentista, deletarRelacionamentoBanco, obterCorrentistaPorId } from "./crud/correntista/funcoes"

const bb: Banco = {
    id: 0,
    nome: "Banco do Brasil",
    cnpj: "00000000000"
}

const itau: Banco = {
    id: 0,
    nome: "Itau",
    cnpj: "11111111111"
}

const caixa: Banco = {
    id: 0,
    nome: "Caixa",
    cnpj: "22222222222"
}

const correntista: Correntista = {
    id: 0,
    nome: "Daniel Pascal",
    cpf: "88888888888"
}

const correntistaNovo: Correntista = {
    id: 0,
    nome: "Dom Pedro",
    cpf: "11111111111"
}

const correntistaSozinho: Correntista = {
    id: 0,
    nome: "Meryl Streep",
    cpf: "99999999999"
}

setTimeout(async () => { cadastrarCorrentistaBanco(correntista, bb) }, 1000);
setTimeout(async () => { cadastrarCorrentistaBancos(correntistaNovo, [caixa, itau]) }, 1000);

setTimeout(async () => { cadastrarCorrentista(correntistaSozinho) }, 3000);
setTimeout(async () => { obterCorrentistaPorId(1) }, 3000);

setTimeout(async () => { deletarCorrentista(1) }, 5000);

setTimeout(async () => { deletarRelacionamentoBanco(2, 2) }, 10000);