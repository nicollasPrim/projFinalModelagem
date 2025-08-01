const cadastrar = document.getElementById('cadastrarProduto')
const buscar = document.getElementById('buscar')
const atualizar = document.getElementById('atualizarProduto')
const apagar = document.getElementById('apagarProduto') 
const consultarId = document.getElementById('consultarIdProduto')
const consultarNome = document.getElementById('consultarNomeProduto')
const listar = document.getElementById('listarProduto')   
const res = document.getElementById('res')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const produto = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        discountPercentage: Number(document.getElementById('discountPercentage').value),
        stock: Number(document.getElementById('stock').value),
        brand: document.getElementById('brand').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    })
    .then(resp => resp.json())
    .then(produto => {

        const precoComDesconto = (produto.price * (1 - produto.discountPercentage / 100)).toFixed(2)
    
        res.innerHTML = `
            <p><strong>ID:</strong> ${produto.id}</p>
            <p><strong>Título:</strong> ${produto.title}</p>
            <p><strong>Descrição:</strong> ${produto.description}</p>
            <p><strong>Categoria:</strong> ${produto.category}</p>
            <p><strong>Preço:</strong> R$ ${produto.price.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
            <p><strong>Preço com Desconto:</strong> R$ ${precoComDesconto}</p>
            <p><strong>Estoque:</strong> ${produto.stock}</p>
            <p><strong>Marca:</strong> ${produto.brand}</p>
            <p><strong>Imagem:</strong> <a href="${produto.thumbnail}" target="_blank">Visualizar</a></p>
        `
    })
    
    .catch(err => {
        res.innerHTML = "Erro ao cadastrar o produto: " + err.message
        console.error(err)
    })
})

consultarId.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(produto => {
        const precoComDesconto = (produto.price * (1 - produto.discountPercentage / 100)).toFixed(2)
    
        res.innerHTML = `
            <p><strong>ID:</strong> ${produto.id}</p>
            <p><strong>Título:</strong> ${produto.title}</p>
            <p><strong>Descrição:</strong> ${produto.description}</p>
            <p><strong>Categoria:</strong> ${produto.category}</p>
            <p><strong>Preço:</strong> R$ ${produto.price.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
            <p><strong>Preço com Desconto:</strong> R$ ${precoComDesconto}</p>
            <p><strong>Estoque:</strong> ${produto.stock}</p>
            <p><strong>Marca:</strong> ${produto.brand}</p>
            <p><strong>Imagem:</strong> <a href="${produto.thumbnail}" target="_blank">Visualizar</a></p>
        `
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar o produto"
        console.error(err)
    })
})

consultarNome.addEventListener('click', (e) => {
    e.preventDefault()

    const nomeProcura = document.getElementById('nomeProcura').value

    fetch(`http://localhost:3000/produto/nome/${nomeProcura}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(produto => {
        const precoComDesconto = (produto.price * (1 - produto.discountPercentage / 100)).toFixed(2)
    
        res.innerHTML = `
            <p><strong>ID:</strong> ${produto.id}</p>
            <p><strong>Título:</strong> ${produto.title}</p>
            <p><strong>Descrição:</strong> ${produto.description}</p>
            <p><strong>Categoria:</strong> ${produto.category}</p>
            <p><strong>Preço:</strong> R$ ${produto.price.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
            <p><strong>Preço com Desconto:</strong> R$ ${precoComDesconto}</p>
            <p><strong>Estoque:</strong> ${produto.stock}</p>
            <p><strong>Marca:</strong> ${produto.brand}</p>
            <p><strong>Imagem:</strong> <a href="${produto.thumbnail}" target="_blank">Visualizar</a></p>
        `
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar o produto"
        console.error(err)
    })
})

listar.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/produto')
        .then(resp => resp.json())
        .then(dados => {
        console.log(dados)

        const produtos = dados

        res.innerHTML = ''

        produtos.forEach(produto => {
            const precoComDesconto = (
            produto.price * (1 - produto.discountPercentage / 100)
            ).toFixed(2);

            res.innerHTML += `
            <div class="produto">
            <br>
                <p><strong>ID:</strong> ${produto.id}</p>
                <p><strong>Título:</strong> ${produto.title}</p>
                <p><strong>Descrição:</strong> ${produto.description}</p>
                <p><strong>Categoria:</strong> ${produto.category}</p>
                <p><strong>Preço:</strong> R$ ${produto.price.toFixed(2)}</p>
                <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
                <p><strong>Preço com Desconto:</strong> R$ ${precoComDesconto}</p>
                <p><strong>Estoque:</strong> ${produto.stock}</p>
                <p><strong>Marca:</strong> ${produto.brand}</p>
                <p><strong>Imagem:</strong> <a href="${produto.thumbnail}" target="_blank">Visualizar</a></p>
            </div>
            `
        })
    })
    .catch(err => {
        res.textContent = 'Erro ao listar os produtos'
        console.error(err)
    })
})

apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(() => {
        res.innerHTML = `<br>Produto apagado com sucesso!`
    })
    .catch(err => {
        res.innerHTML = "Erro ao apagar o produto"
        console.error(err)
    })
})

buscar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(produto => {
        document.getElementById('title').value = produto.title
        document.getElementById('description').value = produto.description
        document.getElementById('category').value = produto.category
        document.getElementById('price').value = produto.price
        document.getElementById('discountPercentage').value = produto.discountPercentage
        document.getElementById('stock').value = produto.stock
        document.getElementById('brand').value = produto.brand
        document.getElementById('thumbnail').value = produto.thumbnail
    })
    .catch(err => {
        res.innerHTML = "Erro ao buscar o produto"
        console.error(err)
    })
})

atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    const produto = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: Number(document.getElementById('price').value),
        discountPercentage: Number(document.getElementById('discountPercentage').value),
        stock: Number(document.getElementById('stock').value),
        brand: document.getElementById('brand').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(resp => resp.json())
    .then(produto => {
        res.innerHTML = `
        <br>
            <p><strong>ID:</strong> ${produto.id}</p>
            <p><strong>Título:</strong> ${produto.title}</p>
            <p><strong>Descrição:</strong> ${produto.description}</p>
            <p><strong>Categoria:</strong> ${produto.category}</p>
            <p><strong>Preço:</strong> R$ ${produto.price.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
            <p><strong>Estoque:</strong> ${produto.stock}</p>
            <p><strong>Marca:</strong> ${produto.brand}</p>
            <p><strong>Marca:</strong> ${produto.thumbnail}</p>
        `
    })
    .catch(err => {
        res.innerHTML = "Erro ao atualizar o produto."
        console.error(err)
    })
})
