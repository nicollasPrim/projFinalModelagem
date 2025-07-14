const form = document.getElementById('formCompra')
const cadastrar = document.getElementById('cadastrarCompra')
const buscar = document.getElementById('buscar')
const atualizar = document.getElementById('atualizarCompra')
const apagar = document.getElementById('apagarCompra')
const consultar = document.getElementById('consultarCompra')
const listar = document.getElementById('listarCompra')
const res = document.getElementById('res') 

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()
  
    const compra = {
      userId: Number(document.getElementById('userId').value),
      productId: Number(document.getElementById('productId').value),
      quantity: Number(document.getElementById('quantity').value),
      purchaseDate: document.getElementById('purchaseDate').value,
      unitPrice: parseFloat(document.getElementById('unitPrice').value),
      discount: Number(document.getElementById('discount').value),
      paymentMethod: document.getElementById('paymentMethod').value,
      status: document.getElementById('status').value
    }
  
    compra.finalPrice = parseFloat(
      (compra.unitPrice * compra.quantity * (1 - compra.discount / 100)).toFixed(2)
    )

  fetch('http://localhost:3000/compra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(compra)
  })
  .then(resp => resp.json())
  .then(data => {
    res.innerHTML = `
        <p><strong>ID Compra:</strong> ${data.id}</p>
        <p><strong>ID Usuário:</strong> ${data.id_usuario}</p>
        <p><strong>ID Produto:</strong> ${data.id_produto}</p>
        <p><strong>Quantidade:</strong> ${data.quantidade}</p>
        <p><strong>Data da Compra:</strong> ${data.dt_compra}</p>
        <p><strong>Preço Unitário:</strong> R$ ${data.preco_unit ? data.preco_unit.toFixed(2) : '0.00'}</p>
        <p><strong>Desconto Aplicado:</strong> ${data.desc_aplicado}%</p>
        <p><strong>Preço Final:</strong> R$ ${data.preco_final ? data.preco_final.toFixed(2) : '0.00'}</p>
        <p><strong>Forma de Pagamento:</strong> ${data.forma_pagamento}</p>
        <p><strong>Status:</strong> ${data.status_compra}</p>
    `
  
    formCompra.reset()
  })
  .catch(err => {
    res.innerHTML = 'Erro ao cadastrar a compra: ' + err.message
    console.error(err)
  })
})


consultar.addEventListener('click', (e) =>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/compras/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = `
            <p><strong>ID:</strong> ${dados.id}</p>
            <p><strong>ID Usuário:</strong> ${dados.id_usuario}</p>
            <p><strong>ID Produto:</strong> ${dados.id_produto}</p>
            <p><strong>Quantidade:</strong> ${dados.quantity}</p>
            <p><strong>Data:</strong> ${dados.purchaseDate}</p>
            <p><strong>Preço Unitário:</strong> ${dados.unitPrice}</p>
            <p><strong>Desconto:</strong> ${dados.discount}%</p>
            <p><strong>Preço Final:</strong> ${dados.finalPrice}</p>
            <p><strong>Pagamento:</strong> ${dados.paymentMethod}</p>
            <p><strong>Status:</strong> ${dados.status}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar a compras"
        console.error(err)
    })
})

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`http://localhost:3000/compras`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = dados.map(c => `
            <p><strong>ID:</strong> ${c.id}</p>
            <p><strong>ID Usuário:</strong> ${c.userId}</p>
            <p><strong>ID Produto:</strong> ${c.productId}</p>
            <p><strong>Quantidade:</strong> ${c.quantity}</p>
            <p><strong>Data:</strong> ${c.purchaseDate}</p>
            <p><strong>Preço Unitário:</strong> ${c.unitPrice}</p>
            <p><strong>Desconto:</strong> ${c.discount}%</p>
            <p><strong>Preço Final:</strong> ${c.finalPrice}</p>
            <p><strong>Pagamento:</strong> ${c.paymentMethod}</p>
            <p><strong>Status:</strong> ${c.status}</p>
            <hr>
        `).join('')
    })
    .catch(err => {
        res.innerHTML = "Erro ao listar comprass"
        console.error(err)
    })
})

apagar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/compras/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(() =>{
        res.innerHTML = `compras apagada com sucesso!`
    })
    .catch(err => {
        res.innerHTML = "Erro ao apagar a compras"
        console.error(err)
    })
})

buscar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/compras/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(compras => {
        document.getElementById('userId').value = compras.userId
        document.getElementById('productId').value = compras.productId
        document.getElementById('quantity').value = compras.quantity
        document.getElementById('purchaseDate').value = compras.purchaseDate
        document.getElementById('unitPrice').value = compras.unitPrice
        document.getElementById('discount').value = compras.discount
        document.getElementById('finalPrice').value = compras.finalPrice
        document.getElementById('paymentMethod').value = compras.paymentMethod
        document.getElementById('status').value = compras.status
    })
    .catch(err => {
        res.innerHTML = "Erro ao buscar o produto: ", err.message
        console.error(err)
    })
})


atualizar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = document.getElementById('id').value

    const quantity = Number(document.getElementById('quantity').value)
    const unitPrice = Number(document.getElementById('unitPrice').value)
    const discount = Number(document.getElementById('discount').value)
    const finalPrice = unitPrice * quantity * (1 - discount / 100)

    const dados = {
        userId: document.getElementById('userId').value,
        productId: document.getElementById('productId').value,
        quantity: quantity,
        purchaseDate: document.getElementById('purchaseDate').value,
        unitPrice: unitPrice,
        discount: discount,
        finalPrice: finalPrice,
        paymentMethod: document.getElementById('paymentMethod').value,
        status: document.getElementById('status').value
    }

    fetch(`http://localhost:3000/compras/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML = `
            <p><strong>ID:</strong> ${dados.id}</p>
            <p><strong>ID Usuário:</strong> ${dados.userId}</p>
            <p><strong>ID Produto:</strong> ${dados.productId}</p>
            <p><strong>Quantidade:</strong> ${dados.quantity}</p>
            <p><strong>Data:</strong> ${dados.purchaseDate}</p>
            <p><strong>Preço Unitário:</strong> ${dados.unitPrice}</p>
            <p><strong>Desconto:</strong> ${dados.discount}%</p>
            <p><strong>Preço Final:</strong> ${dados.finalPrice}</p>
            <p><strong>Pagamento:</strong> ${dados.paymentMethod}</p>
            <p><strong>Status:</strong> ${dados.status}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao atualizar a compras"
        console.error(err)
    })
})
