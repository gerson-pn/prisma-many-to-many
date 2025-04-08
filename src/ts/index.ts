import { Banco, PrismaClient, Correntista } from '@prisma/client'

const prisma = new PrismaClient()

const cadastrar = async (correntista: Correntista, banco: Banco) => {

    let resultado = await prisma.correntista.create({
        data: {
            nome: correntista.nome,
            cpf: correntista.cpf,
            bancos: {
                create: [{
                    nome: banco.nome,
                    cnpj: banco.cnpj
                }]
            }
        }
    })

    console.log(`Correntista cadastrado:`)
    console.log(`Nome: ${correntista.nome}, CPF: ${correntista.cpf}`)
    console.log(`Banco cadastrado:`)
    console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
}

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

cadastrar(correntista, bb)