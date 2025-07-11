const Usuario = require('../model/usuario')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
      const dados = await Usuario.create(valores)
      console.log('Usuário cadastrado:', dados)
      res.status(201).json(dados)
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err)
      res.status(500).json({ 
        message: 'Não foi possível cadastrar!' 
    })
    }
  }
  

const consultar = async(req, res) =>{
    const id = req.params.id
    try {
        const valor = await Usuario.findByPk(id)
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
        const valor = await Usuario.findAll()
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
        const valor = await Usuario.findByPk(id)
        if (valor) {
            await Usuario.destroy({where: {id: id}})
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
        const valor = await Usuario.findByPk(id)
        if (valor) {
            await Usuario.update(valores, {where: {id: id}})
            const dados = await Usuario.findByPk(id)
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