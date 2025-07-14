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

    const quantity = Number(document.getElementById('quantity').value)
    const unitPrice = Number(document.getElementById('unitPrice').value)
    const discount = Number(document.getElementById('discount').value)
    const finalPrice = unitPrice * quantity * (1 - discount / 100)

    const compra = {
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

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(compra)
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
            <p><strong>Status:</strong> ${dados.status}</p>
        `
        form.reset()
    })
    .catch(err => {
        res.innerHTML = "Erro ao cadastrar a compra"
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
        res.innerHTML = "Erro ao consultar a compra"
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
        res.innerHTML = "Erro ao listar compras"
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
        res.innerHTML = `Compra apagada com sucesso!`
    })
    .catch(err => {
        res.innerHTML = "Erro ao apagar a compra"
        console.error(err)
    })
})

buscar.addEventListener('click', (e) =>{
    e.preventDefault()
    
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
        res.innerHTML = "Erro ao atualizar a compra"
        console.error(err)
    })
})
