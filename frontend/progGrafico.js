const ctxEstoque = document.getElementById('graficoEstoque').getContext('2d') 
const ctxIdade   = document.getElementById('graficoIdade').getContext('2d') 
const btnFiltrar = document.getElementById('btnFiltrar') 
const inputInicio = document.getElementById('idInicio') 
const inputFim = document.getElementById('idFim') 

let graficoEstoque = null 
let graficoIdade = null 

btnFiltrar.addEventListener('click', () => {
  const inicio = parseInt(inputInicio.value) 
  const fim = parseInt(inputFim.value) 

  if (isNaN(inicio) || isNaN(fim) || inicio > fim) {
    alert('Informe um intervalo de ID válido.') 
    return 
  }

  gerarGraficoEstoque(inicio, fim) 
  gerarGraficoIdade(inicio, fim) 
}) 

function gerarGraficoEstoque(inicio, fim) {
  fetch('http://localhost:3000/produto')
    .then(res => res.json())
    .then(produtos => {
      const filtrados = produtos
        .filter(p => p.id >= inicio && p.id <= fim)
        .slice(0, 10)  // Limita a 10 itens

      const titulos = filtrados.map(p => p.title) 
      const estoque = filtrados.map(p => p.stock) 

      if (graficoEstoque) graficoEstoque.destroy() 

      graficoEstoque = new Chart(ctxEstoque, {
        type: 'bar',
        data: {
          labels: titulos,
          datasets: [{
            label: 'Em estoque',
            data: estoque,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Produto × Estoque' },
            legend: { display: false }
          },
          scales: {
            x: { ticks: { maxRotation: 70, minRotation: 45, autoSkip: false } },
            y: { beginAtZero: true }
          }
        }
      }) 
    })
    .catch(err => console.error('Erro ao carregar produtos:', err)) 
}

function gerarGraficoIdade(inicio, fim) {
  fetch('http://localhost:3000/usuario')
    .then(res => res.json())
    .then(usuarios => {
      const filtrados = usuarios
        .filter(u => u.id >= inicio && u.id <= fim)
        .slice(0, 10)  // Limita a 10 itens

      const nomes = filtrados.map(u => `${u.firstName} ${u.lastName}`) 
      const idades = filtrados.map(u => u.age) 

      if (graficoIdade) graficoIdade.destroy() 

      graficoIdade = new Chart(ctxIdade, {
        type: 'bar',
        data: {
          labels: nomes,
          datasets: [{
            label: 'Idade (anos)',
            data: idades,
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Usuário × Idade' },
            legend: { display: false }
          },
          scales: {
            x: { ticks: { maxRotation: 70, minRotation: 45, autoSkip: false } },
            y: { beginAtZero: true }
          }
        }
      }) 
    })
    .catch(err => console.error('Erro ao carregar usuários:', err)) 
}
