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
        id_usuario: Number(document.getElementById('userId').value),
        id_produto: Number(document.getElementById('productId').value),
        quantidade: Number(document.getElementById('quantity').value),
        dt_compra: document.getElementById('purchaseDate').value,
        preco_unit: parseFloat(document.getElementById('unitPrice').value),
        desc_aplicado: Number(document.getElementById('discount').value),
        forma_pagamento: document.getElementById('paymentMethod').value,
        status_compra: document.getElementById('status').value
    }
    
    compra.preco_final = parseFloat(
    (compra.preco_unit * compra.quantidade * (1 - compra.desc_aplicado / 100)).toFixed(2)
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

    fetch(`http://localhost:3000/compra/${id}`, {
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
            <p><strong>Quantidade:</strong> ${dados.quantidade}</p>
            <p><strong>Data:</strong> ${new Date(dados.dt_compra).toLocaleDateString('pt-BR')}</p>
            <p><strong>Preço Unitário:</strong> R$ ${dados.preco_unit.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${dados.desc_aplicado}%</p>
            <p><strong>Preço Final:</strong> R$ ${dados.preco_final.toFixed(2)}</p>
            <p><strong>Pagamento:</strong> ${dados.forma_pagamento}</p>
            <p><strong>Status:</strong> ${dados.status_compra}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar a compras"
        console.error(err)
    })
})

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`http://localhost:3000/compra`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = ``
        dados.forEach(e => {
            res.innerHTML +=
            `
                <p><strong>ID:</strong> ${e.id}</p>
                <p><strong>ID Usuário:</strong> ${e.id_usuario}</p>
                <p><strong>ID Produto:</strong> ${e.id_produto}</p>
                <p><strong>Quantidade:</strong> ${e.quantidade}</p>
                <p><strong>Data:</strong> ${new Date(e.dt_compra).toLocaleDateString('pt-BR')}</p>
                <p><strong>Preço Unitário:</strong> R$ ${e.preco_unit.toFixed(2)}</p>
                <p><strong>Desconto:</strong> ${e.desc_aplicado}%</p>
                <p><strong>Preço Final:</strong> R$ ${e.preco_final.toFixed(2)}</p>
                <p><strong>Pagamento:</strong> ${e.forma_pagamento}</p>
                <p><strong>Status:</strong> ${e.status_compra}</p>
                <br>
                <hr>
            `  
        })
    })
    .catch(err => {
        res.innerHTML = "Erro ao listar comprass"
        console.error(err)
    })
})

apagar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(() =>{
        res.innerHTML = `compras apagadas com sucesso!`
    })
    .catch(err => {
        res.innerHTML = "Erro ao apagar a compras"
        console.error(err)
    })
})

buscar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(compras => {
        document.getElementById('userId').value = compras.id_usuario
        document.getElementById('productId').value = compras.id_produto
        document.getElementById('quantity').value = compras.quantidade
        document.getElementById('purchaseDate').value = new Date(compras.dt_compra).toISOString().split('T')[0]
        document.getElementById('unitPrice').value = compras.preco_unit
        document.getElementById('discount').value = compras.desc_aplicado
        document.getElementById('paymentMethod').value = compras.forma_pagamento
        document.getElementById('status').value = compras.status_compra
    
        const precoFinal = (
          compras.preco_unit * compras.quantidade * (1 - compras.desc_aplicado / 100)
        ).toFixed(2)
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
        id_usuario: Number(document.getElementById('userId').value),
        id_produto: Number(document.getElementById('productId').value),
        quantidade: quantity,
        dt_compra: document.getElementById('purchaseDate').value,
        preco_unit: unitPrice,
        desc_aplicado: discount,
        preco_final: finalPrice,
        forma_pagamento: document.getElementById('paymentMethod').value,
        status_compra: document.getElementById('status').value
    }    

    fetch(`http://localhost:3000/compra/${id}`, {
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
            <p><strong>ID Usuário:</strong> ${dados.id_usuario}</p>
            <p><strong>ID Produto:</strong> ${dados.id_produto}</p>
            <p><strong>Quantidade:</strong> ${dados.quantidade}</p>
            <p><strong>Data:</strong> ${dados.dt_compra}</p>
            <p><strong>Preço Unitário:</strong> R$ ${dados.preco_unit.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${dados.desc_aplicado}%</p>
            <p><strong>Preço Final:</strong> R$ ${dados.preco_final.toFixed(2)}</p>
            <p><strong>Pagamento:</strong> ${dados.forma_pagamento}</p>
            <p><strong>Status:</strong> ${dados.status_compra}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao atualizar a compras"
        console.error(err)
    })
})
