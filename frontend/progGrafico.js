const ctxEstoque = document.getElementById('graficoEstoque').getContext('2d');
const ctxIdade   = document.getElementById('graficoIdade').getContext('2d');

// Gráfico de Estoque
fetch('http://localhost:3000/produto')
  .then(res => res.json())
  .then(produtos => {
    const titulos = produtos.map(p => p.title);
    const estoque = produtos.map(p => p.stock);

    new Chart(ctxEstoque, {
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
    });
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));

// Gráfico de Idades
fetch('http://localhost:3000/usuario')
  .then(res => res.json())
  .then(usuarios => {
    const nomes  = usuarios.map(u => `${u.firstName} ${u.lastName}`);
    const idades = usuarios.map(u => u.age);

    new Chart(ctxIdade, {
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
    });
  })
  .catch(err => console.error('Erro ao carregar usuários:', err));
