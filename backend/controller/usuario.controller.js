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

const consultarNome = async(req, res) =>{
    try {
        const nome = req.params.nome.toLoweCase()
        const valor = await Usuario.findAl({where: {nome:{[sequelize.Op.like]: `%${nome}`}}})
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

const atualizar = async(req, res) => {
    const id = req.params.id;
    const valores = req.body;
    try {
        const valor = await Usuario.findByPk(id);
        if (!valor) {
            console.error('Usuário não encontrado para id:', id);
            return res.status(404).json({ 
                message: 'Usuário não encontrado!' 
            });
        }
        console.log('Usuário encontrado:', valor.toJSON());

        if (valores.birthDate) {
            valores.birthDate = new Date(valores.birthDate);
            console.log('birthDate convertida:', valores.birthDate);
        }
        await Usuario.update(valores, { where: { id } });
        const dadosAtualizados = await Usuario.findByPk(id);
        console.log('Usuário atualizado:', dadosAtualizados.toJSON());
        res.status(200).json(dadosAtualizados);
    } catch (err) {
        console.error('Erro na atualização:', err);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

module.exports = { cadastrar, consultar, consultarNome, listar, atualizar, apagar }