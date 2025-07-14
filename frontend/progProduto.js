const form = document.getElementById('formProduto')
const cadastrar = document.getElementById('cadastrarProduto')
const buscar = document.getElementById('buscar')
const atualizar = document.getElementById('atualizarProduto')
const apagar = document.getElementById('apagarProduto')
const consultar = document.getElementById('consultarProduto')
const listar = document.getElementById('listarProduto')
const res = document.getElementById('res') 

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const produto = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: Number(document.getElementById('price').value),
        discountPercentage: Number(document.getElementById('discountPercentage').value),
        stock: Number(document.getElementById('stock').value),
        brand: document.getElementById('brand').value
    }

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML = `
            <p><strong>ID:</strong> ${dados.id}</p>
            <p><strong>Título:</strong> ${dados.title}</p>
            <p><strong>Descrição:</strong> ${dados.description}</p>
            <p><strong>Categoria:</strong> ${dados.category}</p>
            <p><strong>Preço:</strong> ${dados.price}</p>
            <p><strong>Desconto:</strong> ${dados.discountPercentage}%</p>
            <p><strong>Estoque:</strong> ${dados.stock}</p>
            <p><strong>Marca:</strong> ${dados.brand}</p>
        `
        console.log("Produto cadastrado:", dados)
        form.reset()
    })
    .catch(err => {
        res.innerHTML = "Erro ao cadastrar o produto"
        console.error(err)
    })
})

consultar.addEventListener('click', (e) =>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = `
            <p><strong>ID:</strong> ${dados.id}</p>
            <p><strong>Título:</strong> ${dados.title}</p>
            <p><strong>Descrição:</strong> ${dados.description}</p>
            <p><strong>Categoria:</strong> ${dados.category}</p>
            <p><strong>Preço:</strong> ${dados.price}</p>
            <p><strong>Desconto:</strong> ${dados.discountPercentage}%</p>
            <p><strong>Estoque:</strong> ${dados.stock}</p>
            <p><strong>Marca:</strong> ${dados.brand}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar o produto"
        console.error(err)
    })
})

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`http://localhost:3000/produto`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = dados.map(prod => `
            <p><strong>ID:</strong> ${prod.id}</p>
            <p><strong>Título:</strong> ${prod.title}</p>
            <p><strong>Descrição:</strong> ${prod.description}</p>
            <p><strong>Categoria:</strong> ${prod.category}</p>
            <p><strong>Preço:</strong> ${prod.price}</p>
            <p><strong>Desconto:</strong> ${prod.discountPercentage}%</p>
            <p><strong>Estoque:</strong> ${prod.stock}</p>
            <p><strong>Marca:</strong> ${prod.brand}</p>
            <hr>
        `).join('')
    })
    .catch(err => {
        res.innerHTML = "Erro ao listar os produtos"
        console.error(err)
    })
})

apagar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(() =>{
        res.innerHTML = `Produto apagado com sucesso!`
    })
    .catch(err => {
        res.innerHTML = "Erro ao apagar o produto"
        console.error(err)
    })
})

buscar.addEventListener('click', (e) =>{
    e.preventDefault()


})

atualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    const dados = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: Number(document.getElementById('price').value),
        discountPercentage: Number(document.getElementById('discountPercentage').value),
        stock: Number(document.getElementById('stock').value),
        brand: document.getElementById('brand').value
    }

    fetch(`http://localhost:3000/produto/${id}`, {
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
            <p><strong>Título:</strong> ${dados.title}</p>
            <p><strong>Descrição:</strong> ${dados.description}</p>
            <p><strong>Categoria:</strong> ${dados.category}</p>
            <p><strong>Preço:</strong> ${dados.price}</p>
            <p><strong>Desconto:</strong> ${dados.discountPercentage}%</p>
            <p><strong>Estoque:</strong> ${dados.stock}</p>
            <p><strong>Marca:</strong> ${dados.brand}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao atualizar o produto"
        console.error(err)
    })
})
