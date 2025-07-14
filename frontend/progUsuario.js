const form = document.getElementById('formUsuario')
const cadastrar = document.getElementById('cadastrarUsuario')
const buscar = document.getElementById('buscar')
const atualizar = document.getElementById('atualizarUsuario')
const apagar = document.getElementById('apagarUsuarios') 
const consultar = document.getElementById('consultarUsuario')
const listar = document.getElementById('listarUsuarios')   
const res = document.getElementById('res')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const usuario = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    age: Number(document.getElementById('age').value),
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value.toUpperCase(),
    birthDate: document.getElementById('birthDate').value
    }

    fetch('http://localhost:3000/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
    })
    .then(resp => resp.json())
    .then(usuario => {
    res.innerHTML = `
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Nome:</strong> ${usuario.firstName} ${usuario.lastName}</p>
        <p><strong>Idade:</strong> ${usuario.age}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Telefone:</strong> ${usuario.phone}</p>
        <p><strong>Endereço:</strong> ${usuario.address}</p>
        <p><strong>Cidade:</strong> ${usuario.city}</p>
        <p><strong>Estado:</strong> ${usuario.state}</p>
        <p><strong>Nascimento:</strong> ${usuario.birthDate}</p>
    `
    })
    .catch(err => {
    res.innerHTML = "Erro ao cadastrar o usuário: " + err.message
    console.error(err)
    })
})


consultar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(usuario => {

        const dataCompleta = document.getElementById('birthDate').value = usuario.birthDate

        const soData = dataCompleta.split("T")[0]

        res.innerHTML = ``
        res.innerHTML = `
        
            <p><strong>ID:</strong> ${usuario.id}</p>
            <p><strong>Nome:</strong> ${usuario.firstName} ${usuario.lastName}</p>
            <p><strong>Idade:</strong> ${usuario.age}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.phone}</p>
            <p><strong>Endereço:</strong> ${usuario.address}</p>
            <p><strong>Cidade:</strong> ${usuario.city}</p>
            <p><strong>Estado:</strong> ${usuario.state}</p>
            <p><strong>Nascimento:</strong> ${usuario.birthDate}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao buscar o usuario: ", err.message
        console.error(err)
    })
})

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`http://localhost:3000/usuario`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = ""
        dados.forEach(e => {
            res.innerHTML += `<br>
                <p><strong>ID:</strong> ${e.id}</p>
                <p><strong>Nome:</strong> ${e.firstName} ${e.lastName}</p>
                <p><strong>Idade:</strong> ${e.age}</p>
                <p><strong>Email:</strong> ${e.email}</p>
                <p><strong>Telefone:</strong> ${e.phone}</p>
                <p><strong>Endereço:</strong> ${e.address}</p>
                <p><strong>Cidade:</strong> ${e.city}</p>
                <p><strong>Estado:</strong> ${e.state}</p>
                <p><strong>Nascimento:</strong> ${e.birthDate.split('T')[0]}</p><br>`
        })
    })
    .catch(err => {
        res.innerHTML = "Erro ao listar os usuários"
        console.error(err)
    })
})

apagar.addEventListener('click', (e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados =>{
        res.innerHTML = `Dados apagados com sucesso!`
    })
    .catch(err => {
        res.innerHTML = "Erro ao apagar o usuário"
        console.error(err)
    })
})

buscar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(usuarios => {

        const dataCompleta = document.getElementById('birthDate').value = usuarios.birthDate

        const soData = dataCompleta.split("T")[0]

        document.getElementById("birthDate").value = soData
        document.getElementById('firstName').value = usuarios.firstName
        document.getElementById('lastName').value = usuarios.lastName
        document.getElementById('age').value = usuarios.age
        document.getElementById('email').value = usuarios.email
        document.getElementById('phone').value = usuarios.phone
        document.getElementById('address').value = usuarios.address
        document.getElementById('city').value = usuarios.city
        document.getElementById('state').value = usuarios.state
        
    })
    .catch(err => {
        res.innerHTML = "Erro ao buscar o usuario: ", err.message
        console.error(err)
    })
})


atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    const dados = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: Number(document.getElementById('age').value),
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value.toUpperCase(),
        birthDate: document.getElementById('birthDate').value
    }

    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(usuario => {

        res.innerHTML = `
            <p><strong>ID:</strong> ${usuario.id}</p>
            <p><strong>Nome:</strong> ${usuario.firstName} ${usuario.lastName}</p>
            <p><strong>Idade:</strong> ${usuario.age}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.phone}</p>
            <p><strong>Endereço:</strong> ${usuario.address}</p>
            <p><strong>Cidade:</strong> ${usuario.city}</p>
            <p><strong>Estado:</strong> ${usuario.state}</p>
            <p><strong>Nascimento:</strong> ${usuario.birthDate}</p>
        `
    })
    .catch(err => {
        res.innerHTML = "Erro ao atualizar usuário."
        console.error(err)
    })
})
