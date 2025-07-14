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
    age: parseInt(document.getElementById('age').value),
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
    .then(dados => {
    res.innerHTML = `
        <p><strong>ID:</strong> ${dados.id}</p>
        <p><strong>Nome:</strong> ${dados.firstName} ${dados.lastName}</p>
        <p><strong>Idade:</strong> ${dados.age}</p>
        <p><strong>Email:</strong> ${dados.email}</p>
        <p><strong>Telefone:</strong> ${dados.phone}</p>
        <p><strong>Endereço:</strong> ${dados.address}</p>
        <p><strong>Cidade:</strong> ${dados.city}</p>
        <p><strong>Estado:</strong> ${dados.state}</p>
        <p><strong>Nascimento:</strong> ${dados.birthDate}</p>
    `
    form.reset()
    })
    .catch(err => {
    res.innerHTML = "Erro ao cadastrar o usuário: " + err.message
    console.error(err)
    })
})


consultar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = document.getElementById('id').value

    .fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    then(resp => resp.json())
    then(dados =>{
                res.innerHTML = `
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Endereço:</strong> ${address}</p>
            <p><strong>Cidade:</strong> ${city}</p>
            <p><strong>Estado:</strong> ${state}</p>
            <p><strong>Nascimento:</strong> ${birthDate}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar o usuário"
        console.error(err)
    })
})

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    .fetch(`http://localhost:3000/usuarios/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    then(resp => resp.json())
    then(dados =>{
        res.innerHTML = `
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Endereço:</strong> ${address}</p>
            <p><strong>Cidade:</strong> ${city}</p>
            <p><strong>Estado:</strong> ${state}</p>
            <p><strong>Nascimento:</strong> ${birthDate}</p>`
    })
    .catch(err => {
        res.innerHTML = "Erro ao consultar o usuário"
        console.error(err)
    })
})

apagar.addEventListener('click', (e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    .fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    then(resp => resp.json())
    then(dados =>{
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

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(usuarios => {
        document.getElementById('firstName').value = usuarios.firstName
        document.getElementById('lastName').value = usuarios.lastName
        document.getElementById('age').value = usuarios.age
        document.getElementById('email').value = usuarios.email
        document.getElementById('phone').value = usuarios.phone
        document.getElementById('address').value = usuarios.address
        document.getElementById('city').value = usuarios.city
        document.getElementById('state').value = usuarios.state
        document.getElementById('birthDate').value = usuarios.birthDate
        
    })
    .catch(err => {
        res.innerHTML = "Erro ao buscar o usuario: ", err.message
        console.error(err)
    })
})


atualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    const id = document.getElementById('id')

    const dados = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: parseInt(document.getElementById('age').value),
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value.toUpperCase(),
        birthDate: document.getElementById('birthDate').value
    }

    .fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    then(resp => resp.json())
    then(dados => {
        res.innerHTML = `
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Endereço:</strong> ${address}</p>
            <p><strong>Cidade:</strong> ${city}</p>
            <p><strong>Estado:</strong> ${state}</p>
            <p><strong>Nascimento:</strong> ${birthDate}</p>`
    })
})