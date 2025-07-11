const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const host = 'localhost'

const conn = require('./db/conn')

const compraController = require('./controller/compra.controller')
const produtoController = require('./controller/produto.controller')
const usuarioController = require('./controller/usuario.controller')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post('/compra', compraController.cadastrar)
app.get('/compra', compraController.listar)
app.get('/compra/:id', compraController.consultar)
app.put('/compra/:id', compraController.atualizar)
app.delete('/compra/:id', compraController.apagar)

app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario', usuarioController.listar)
app.get('/usuario/:id', usuarioController.consultar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)

app.post('/produto', produtoController.cadastrar)
app.get('/produto', produtoController.listar)
app.get('/produto/:id', produtoController.consultar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

conn.sync()

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${host}:${PORT}`)
})