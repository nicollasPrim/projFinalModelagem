const Produto = require('../model/produto')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const dados = await Produto.create(valores)
        console.log(dados)
        res.status(201).json(dados)
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err)
        res.status(500).json({ message: 'Erro ao cadastrar o produto.' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const valor = await Produto.findByPk(id)
        if (valor) {
            console.log(valor)
            res.status(200).json(valor)
        } else {
            console.warn('Produto não encontrado.')
            res.status(404).json({ message: 'Produto não encontrado.' })
        }
    } catch (err) {
        console.error('Erro ao consultar produto:', err)
        res.status(500).json({ message: 'Erro ao consultar o produto.' })
    }
}

const consultarNome = async(req, res) =>{
    try {
        const nome = req.params.nome.toLoweCase()
        const valor = await Produto.findAl({where: {nome:{[sequelize.Op.like]: `%${nome}`}}})
        if (valor) {
            console.log(valor)
            res.status(200).json(valor)        
        } else {
            console.error('Não há dados cadastrados!', err)
            res.status(404).json({
                message: 'Não há dados cadastrados!'
            })
        }
    } catch (err) {
        console.error('Não foi possivel consultar!', err)
        res.status(201).json({
            message: 'Não foi possivel consultar!'
        })
    }
}

const listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll()
        console.log(`🔍 ${produtos.length} produto(s) encontrados.`)
        res.status(200).json(produtos)
    } catch (err) {
        console.error('Erro ao listar produtos:', err)
        res.status(500).json({ message: 'Erro ao listar os produtos.' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const produto = await Produto.findByPk(id)
        if (produto) {
            await Produto.destroy({ where: { id: id } })
            console.log('Produto apagado com sucesso.')
            res.status(200).json({ message: 'Produto apagado com sucesso.' })
        } else {
            console.warn('Produto não encontrado para exclusão.')
            res.status(404).json({ message: 'Produto não encontrado.' })
        }
    } catch (err) {
        console.error('Erro ao apagar produto:', err)
        res.status(500).json({ message: 'Erro ao apagar o produto.' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        const produto = await Produto.findByPk(id)
        if (produto) {
            await Produto.update(valores, { where: { id: id } })
            const atualizado = await Produto.findByPk(id)
            console.log('Produto atualizado:', atualizado)
            res.status(200).json(atualizado)
        } else {
            console.warn('Produto não encontrado para atualização.')
            res.status(404).json({ message: 'Produto não encontrado.' })
        }
    } catch (err) {
        console.error('Erro ao atualizar produto:', err)
        res.status(500).json({ message: 'Erro ao atualizar o produto.' })
    }
}

module.exports = { cadastrar, consultar, consultarNome, listar, atualizar, apagar }