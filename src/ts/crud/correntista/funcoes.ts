import { Correntista, Banco, PrismaClient } from "@prisma/client"

/*const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})*/

const prisma = new PrismaClient()

const obterCorrentistaPorId = async (correntistaId: number) => {
    let resultado = await prisma.correntista.findUnique({
        where: {
            id: correntistaId
        },
        include: {
            bancos: true
        }
    })

    if (resultado) {
        console.log(`--------------------------------------`)
        console.log(`Correntista obtido:`)
        console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
        if (resultado.bancos.length > 0) {
            console.log(`Bancos obtidos:`)
            resultado.bancos.forEach(banco => {
                console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
            })
        }
        console.log(`--------------------------------------\n`)
    } else {
        console.log(`--------------------------------------`)
        console.log(`correntista não encontrado`)
        console.log(`--------------------------------------\n`)
    }
}

const cadastrarCorrentista = async (correntista: Correntista) => {

    let resultado = await prisma.correntista.create({
        data: {
            nome: correntista.nome,
            cpf: correntista.cpf
        },
        include: {
            bancos: true
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Correntista cadastrado:`)
    console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
    if (resultado.bancos.length > 0) {
        console.log(`Bancos cadastrados:`)
        resultado.bancos.forEach(banco => {
            console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

const cadastrarCorrentistaBanco = async (correntista: Correntista, banco: Banco) => {

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
        },
        include: {
            bancos: true
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Correntista cadastrado:`)
    console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
    if (resultado.bancos.length > 0) {
        console.log(`Bancos cadastrados:`)
        resultado.bancos.forEach(banco => {
            console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

const cadastrarCorrentistaBancos = async (correntista: Correntista, bancos: Banco[]) => {

    let resultado = await prisma.correntista.create({
        data: {
            nome: correntista.nome,
            cpf: correntista.cpf,
            bancos: {
                create: bancos.map(banco => ({
                    nome: banco.nome,
                    cnpj: banco.cnpj
                }))
            }
        },
        include: {
            bancos: true
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Correntista cadastrado:`)
    console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
    if (resultado.bancos.length > 0) {
        console.log(`Bancos cadastrados:`)
        resultado.bancos.forEach(banco => {
            console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

const deletarCorrentista = async (correntistaId: number) => {

    let resultado = await prisma.correntista.delete({
        where: {
            id: correntistaId
        },
        include: {
            bancos: true
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Correntista deletado:`)
    console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
    if (resultado.bancos.length > 0) {
        console.log(`Bancos antes vinculados:`)
        resultado.bancos.forEach(banco => {
            console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

const deletarRelacionamentoBanco = async (correntistaId: number, bancoId: number) => {

    let resultado = await prisma.correntista.update({
        where: {
            id: correntistaId
        },
        data: {
            bancos: {
                disconnect: [{ id: bancoId }]
            }
        },
        include: {
            bancos: true
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Correntista desconectado:`)
    console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
    if (resultado.bancos.length > 0) {
        console.log(`Bancos antes vinculados:`)
        resultado.bancos.forEach(banco => {
            console.log(`Nome: ${banco.nome}, CNPJ: ${banco.cnpj}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

export {
    deletarRelacionamentoBanco,
    obterCorrentistaPorId,
    cadastrarCorrentista,
    cadastrarCorrentistaBanco,
    cadastrarCorrentistaBancos,
    deletarCorrentista
}