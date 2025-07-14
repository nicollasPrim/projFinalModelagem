const elUsuarios = document.getElementById('relatorioUsuarios');
const elProdutos = document.getElementById('relatorioProdutos');
const elCompras = document.getElementById('relatorioCompras');
const elEstoqueCritico = document.getElementById('relatorioEstoqueCritico');
const elConsolidado = document.getElementById('relatorioConsolidado');

// Helper para criar tabelas
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
fetch('https://dummyjson.com/users?limit=100')
.then(res => res.json())
.then(({ users }) => {
    const dados = users.map(u => [
    `${u.firstName} ${u.lastName}`,
    u.age,
    u.email,
    u.address.city,
    u.address.state || '-'
    ]);
    elUsuarios.innerHTML = `<h3>Relatório de Usuários</h3>`;
    elUsuarios.appendChild(gerarTabela(['Nome', 'Idade', 'Email', 'Cidade', 'Estado'], dados));
});

// 2. Relatório de Produtos + Estoque Crítico
fetch('https://dummyjson.com/products?limit=100')
.then(res => res.json())
.then(({ products }) => {
    // Relatório de Produtos
    const dadosProdutos = products.map(p => {
    const final = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);
    return [p.title, p.category, `R$ ${p.price}`, `${p.discountPercentage}%`, `R$ ${final}`];
    });
    elProdutos.innerHTML = `<h3>Relatório de Produtos</h3>`;
    elProdutos.appendChild(
    gerarTabela(['Título', 'Categoria', 'Preço', 'Desconto', 'Valor Final'], dadosProdutos)
    );

    // Relatório de Estoque Crítico
    const criticos = products.filter(p => p.stock < 10).map(p => [p.title, p.stock, p.category]);
    elEstoqueCritico.innerHTML = `<h3>Relatório de Estoque Crítico</h3>`;
    elEstoqueCritico.appendChild(
    gerarTabela(['Título', 'Estoque', 'Categoria'], criticos)
    );
});

// 3 e 5: Compras + Consolidado
Promise.all([
fetch('https://dummyjson.com/carts?limit=100').then(r => r.json()),
fetch('https://dummyjson.com/users?limit=100').then(r => r.json()),
fetch('https://dummyjson.com/products?limit=100').then(r => r.json())
])
.then(([{ carts }, { users }, { products }]) => {
    // Map de usuários e produtos para lookup rápido
    const usuariosMap = new Map(users.map(u => [u.id, `${u.firstName} ${u.lastName}`]));
    const produtosMap = new Map(products.map(p => [p.id, { title: p.title, price: p.price }]));

    const dadosCompras = [];
    const dadosConsolidado = [];

    carts.forEach(c => {
    const nomeUsuario = usuariosMap.get(c.userId) || 'Usuário Desconhecido';
    const dataCompra = new Date(c.date).toLocaleDateString();

    c.products.forEach(p => {
        const produto = produtosMap.get(p.id);
        const nomeProduto = produto?.title || 'Produto Desconhecido';
        const precoFinal = (p.price * p.quantity).toFixed(2);

        // Relatório de Compras
        dadosCompras.push([
        c.id,
        nomeUsuario,
        nomeProduto,
        p.quantity,
        dataCompra,
        `R$ ${precoFinal}`
        ]);

        // Consolidado
        dadosConsolidado.push([
        nomeUsuario,
        nomeProduto,
        p.quantity,
        dataCompra,
        `R$ ${precoFinal}`,
        'Cartão de Crédito',
        'Concluído'
        ]);
    });
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
});