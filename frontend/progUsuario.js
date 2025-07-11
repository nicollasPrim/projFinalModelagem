const form = document.getElementById('formUsuario')
const cadastrar = document.getElementById('cadastrarUsuario')
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

    console.log(usuario)

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(resp => resp.json())
    .then(dados => {
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

        console.log("Usuário cadastrado:", dados)
        form.reset()
    })
    .catch(err => {
        alert("Erro ao cadastrar o usuário.")
        console.error(err)
    })
})
