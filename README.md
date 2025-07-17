# 🛒 Sistema de Compras - Projeto Final de Modelagem

Este projeto é um sistema web completo para **gerenciamento de usuários, produtos e compras**, desenvolvido como trabalho final da disciplina de Modelagem de Sistemas do SESI. Ele combina backend em **Node.js + Express + Sequelize**, banco de dados **MySQL**, e frontend em **HTML, CSS e JavaScript**.

---

## 🚀 Funcionalidades

- **Usuários**
  - Cadastrar, consultar, editar, excluir e listar
- **Produtos**
  - Cadastrar, consultar, editar, excluir e listar
- **Compras**
  - Registrar compras com cálculo automático de preço final com desconto
  - Consultar, editar, excluir e listar compras
- **Relatórios**
  - Relatório de usuários
  - Relatório de produtos
  - Produtos com estoque crítico
  - Relatório de compras
  - Relatório consolidado (com forma de pagamento e status)
- **Gráficos**
  - Estoque por produto
  - Idade dos usuários

---

## 🧰 Tecnologias Utilizadas

- **Backend:** Node.js, Express, Sequelize
- **Banco de Dados:** MySQL
- **Frontend:** HTML5, CSS3, JavaScript (puro)
- **Gráficos:** Chart.js
- **Relatórios:** HTML + JavaScript dinâmico
- **Deploy (frontend):** Vercel (opcional)

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/nicollasPrim/projFinalModelagem.git
cd projFinalModelagem
```

### 2. Instale as dependências

```bash
npm install --save sequelize express cors mysql2 dotenv
```

### 3. Configure o banco de dados

- Crie um banco no MySQL com o nome:

```sql
CREATE DATABASE compras_db;
```

- No arquivo `db/conn.js`, atualize com suas credenciais do MySQL:

```javascript
const sequelize = new Sequelize('projeto_final', 'SEU_USUARIO', 'SUA_SENHA', {
  host: 'localhost',
  dialect: 'mysql'
});
```

### 4. Rode as migrações (se necessário)

Se os modelos estiverem configurados com `sequelize.sync()`, ao iniciar o servidor os dados serão sincronizados automaticamente.

### 5. Inicie o servidor

```bash
node index.js
```

> O backend estará disponível em: `http://localhost:3000`

---

## 🌐 Frontend

- O frontend está na pasta `public/`
- Você pode abrir diretamente no navegador os arquivos HTML ou subir no Vercel
- Se desejar rodar localmente, abra `public/index.html` no navegador

---

## 📁 Estrutura do Projeto

```
projFinalModelagem/
├── controller/         # Controladores da API
├── db/                 # Conexão com MySQL
├── model/              # Models Sequelize
├── public/             # Frontend (HTML, CSS, JS)
│   ├── css/
│   ├── js/
│   └── index.html
├── routes/             # Rotas das entidades
├── index.js            # Servidor principal
└── package.json        # Dependências do projeto
```

---


## 👨‍💻 Autor

- [Nicollas Prim](https://github.com/nicollasPrim)
- Projeto desenvolvido para a disciplina de **Modelagem de Sistemas** - SESI
