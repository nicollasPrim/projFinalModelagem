const Produto = require('../model/produto')

const cadastrar = async(req, res) =>{
    const valores = req.body
    try {
        const dados = await Produto.create(valores)
        console.log(dados)
        res.status(201).json(dados)
    } catch (err) {
        console.error('Não foi possivel cadastrar!', err)
        res.status(200).json({
            message: 'Não foi possivel cadastrar!'
        })
    }
}

const consultar = async(req, res) =>{
    const id = req.params.id
    try {
        const valor = await Produto.findByPk(id)
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

const listar = async(req, res) =>{
    try {
        const valor = await Produto.findAll()
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
        console.error('Não foi possivel listar!', err)
        res.status(201).json({
            message: 'Não foi possivel listar!'
        })
    }
}

const apagar = async(req, res) =>{
    const id = req.params.id
    try {
        const valor = await Produto.findByPk(id)
        if (valor) {
            await Produto.destroy({where: {id_produto: id}})
            console.log('Dados apagados!')
            res.status(200).json({
                message: 'Dados apagados!'
            })
        } else {
            console.error('Dados não encontrados!', err)
            res.status(404).json({
                message: 'Dados não encontrados!'
            })
        }
    } catch (err) {
        console.error('Não foi possivel apagar os dados!', err)
        res.status(201).json({
            message: 'Não foi possivel apagar os dados!'
        })
    }
}

const atualizar = async(req, res) =>{
    const id = req.params.id
    const valores = req.body
    try {
        const valor = await Produto.findByPk(id)
        if (valor) {
            await Produto.update(valores, {where: {id_produto: id}})
            const dados = await Produto.findByPk(id)
            console.log(dados)
            res.status(200).json(dados)
        } else {
            console.error('Dados não encontrados!', err)
            res.status(404).json({
                message: 'Dados não encontrados!'
            })
        }
    } catch (err) {
        console.error('Não foi possivel atualizar os dados!', err)
        res.status(501).json({
            message: 'Não foi possivel atualizar os dados!'
        })
    }
}

module.exports = { cadastrar, consultar, listar, atualizar, apagar }