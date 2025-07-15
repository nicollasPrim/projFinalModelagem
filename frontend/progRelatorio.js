const elUsuarios = document.getElementById('relatorioUsuarios');
const elProdutos = document.getElementById('relatorioProdutos');
const elCompras = document.getElementById('relatorioCompras');
const elEstoqueCritico = document.getElementById('relatorioEstoqueCritico');
const elConsolidado = document.getElementById('relatorioConsolidado');

function gerarTabela(titulos, dados) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');

  titulos.forEach(titulo => {
      const th = document.createElement('th');
      th.textContent = titulo;
      trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  dados.forEach(linha => {
      const tr = document.createElement('tr');
      linha.forEach(cel => {
      const td = document.createElement('td');
      td.textContent = cel;
      tr.appendChild(td);
      });
      tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

// 1. Relatório de Usuários
fetch('http://localhost:3000/usuario')
.then(res => res.json())
.then(usuarios => {
    const dados = usuarios.map(u => [
      `${u.firstName} ${u.lastName}`,
      u.age,
      u.email,
      u.cidade || '-',  // ajuste conforme seu backend
      u.estado || '-'   // ajuste conforme seu backend
    ]);
    elUsuarios.innerHTML = `<h3>Relatório de Usuários</h3>`;
    elUsuarios.appendChild(gerarTabela(['Nome', 'Idade', 'Email', 'Cidade', 'Estado'], dados));
})
.catch(err => {
    elUsuarios.textContent = 'Erro ao carregar usuários';
    console.error(err);
});

// 2. Relatório de Produtos + Estoque Crítico
fetch('http://localhost:3000/produto')
.then(res => res.json())
.then(produtos => {
    // Relatório de Produtos
    const dadosProdutos = produtos.map(p => {
        const final = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);
        return [p.title, p.category, `R$ ${p.price.toFixed(2)}`, `${p.discountPercentage}%`, `R$ ${final}`];
    });
    elProdutos.innerHTML = `<h3>Relatório de Produtos</h3>`;
    elProdutos.appendChild(
        gerarTabela(['Título', 'Categoria', 'Preço', 'Desconto', 'Valor Final'], dadosProdutos)
    );

    // Relatório de Estoque Crítico (estoque < 10)
    const criticos = produtos.filter(p => p.stock < 10).map(p => [p.title, p.stock, p.category]);
    elEstoqueCritico.innerHTML = `<h3>Relatório de Estoque Crítico</h3>`;
    elEstoqueCritico.appendChild(
        gerarTabela(['Título', 'Estoque', 'Categoria'], criticos)
    );
})
.catch(err => {
    elProdutos.textContent = 'Erro ao carregar produtos';
    elEstoqueCritico.textContent = 'Erro ao carregar produtos para estoque crítico';
    console.error(err);
});

// 3 e 5: Compras + Consolidado
Promise.all([
    fetch('http://localhost:3000/compra').then(r => r.json()),
    fetch('http://localhost:3000/usuario').then(r => r.json()),
    fetch('http://localhost:3000/produto').then(r => r.json())
])
.then(([compras, usuarios, produtos]) => {
    const usuariosMap = new Map(usuarios.map(u => [u.id, `${u.firstName} ${u.lastName}`]));
    const produtosMap = new Map(produtos.map(p => [p.id, { title: p.title, price: p.price }]));

    const dadosCompras = [];
    const dadosConsolidado = [];

    compras.forEach(c => {
        const nomeUsuario = usuariosMap.get(c.id_usuario) || 'Usuário Desconhecido';
        const dataCompra = new Date(c.dt_compra).toLocaleDateString();

        // Como cada compra aqui tem 1 produto (supondo), senão ajuste conforme seu modelo
        const produto = produtosMap.get(c.id_produto);
        const nomeProduto = produto ? produto.title : 'Produto Desconhecido';
        const precoFinal = c.preco_final.toFixed(2);

        // Relatório de Compras
        dadosCompras.push([
            c.id,
            nomeUsuario,
            nomeProduto,
            c.quantidade,
            dataCompra,
            `R$ ${precoFinal}`
        ]);

        // Consolidado (exemplo simples, pode adaptar status e forma_pagamento reais)
        dadosConsolidado.push([
            nomeUsuario,
            nomeProduto,
            c.quantidade,
            dataCompra,
            `R$ ${precoFinal}`,
            c.forma_pagamento || 'Não informado',
            c.status_compra || 'Desconhecido'
        ]);
    });

    elCompras.innerHTML = `<h3>Relatório de Compras</h3>`;
    elCompras.appendChild(
        gerarTabela(['ID', 'Usuário', 'Produto', 'Qtd', 'Data', 'Preço Final'], dadosCompras)
    );

    elConsolidado.innerHTML = `<h3>Relatório Consolidado</h3>`;
    elConsolidado.appendChild(
        gerarTabela(
            ['Usuário', 'Produto', 'Qtd', 'Data', 'Valor', 'Pagamento', 'Status'],
            dadosConsolidado
        )
    );
})
.catch(err => {
    elCompras.textContent = 'Erro ao carregar compras ou dados relacionados';
    elConsolidado.textContent = 'Erro ao carregar compras ou dados relacionados';
    console.error(err);
});
