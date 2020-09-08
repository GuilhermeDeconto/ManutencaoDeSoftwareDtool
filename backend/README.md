# dTool - Backend

Este é o repositório do backend do projeto dTool, desenvolvido pelos alunos da [Agência Experimental de Engenharia de Software](http://www.ages.pucrs.br/) da [PUCRS](http://www.pucrs.br/) durante o semestre 2020/1.

## Configuração

**TL;DR:**
- instalar NodeJS v13
- (apenas no Windows) `npm i -g win-node-env`
- instalar PostgreSQL 12
- `psql -q -c "CREATE ROLE dtool WITH LOGIN PASSWORD 'dtoolages2020';" -c 'ALTER ROLE dtool CREATEDB;'`
- `psql -q -d postgres -U dtool -c 'CREATE DATABASE dtool'`
- (opcional) instalar pgAdmin 4 - interface visual de administração para o banco da dados PostgreSQL
- `git clone http://tools.ages.pucrs.br/dtool/backend.git`
- `cd backend`
- `git update-index --skip-worktree .env`
- `npm i`
- definir as variáveis para acesso ao banco de dados no arquivo `config/postgresql-dev.js`
- `npm run dev`

### 1 - [NodeJS](https://nodejs.org/en/)

Acesse a [página de downloads](https://nodejs.org/en/download/releases/) do NodeJS e baixe a versão 13.2 compatível com o seu sistema operacional. Também é possível [instalar usando um gerenciador de pacotes](https://nodejs.org/en/download/package-manager/) compatível com seu SO.

Certifique-se de que a versão instalada é a 13 executando o seguinte comando no terminal:

```bash
~/ $ node -v
v13.2.0
```

#### 1.1 - Apenas no Windows

Se você usa Windows, instale o pacote [`win-node-env`](https://www.npmjs.com/package/win-node-env):

```bash
~/ $ npm install -g win-node-env
```

Se você usa Windows, é necessário setar a variável de ambiente com o endereço do PostgreSQL no seu computador. Pode seguir [este tutorial](https://sqlbackupandftp.com/blog/setting-windows-path-for-postgres-tools), mas lembre-se que estamos usando outra versão ao invés da 11 (confira a versão em C:\Program Files\PostgreSQL).

### 2 - [PostgreSQL](https://www.postgresql.org/)

O backend utiliza o PostgreSQL como sistema de gerenciamento de banco de dados. Siga as [instruções específicas do seu sistema operacional](https://www.postgresql.org/download/) e instale a versão 12.

Verifique se a instalação foi finalizada com sucesso:

```bash
~/ $ psql --version
psql (PostgreSQL) 12.1
```

Precisamos criar um usuário para a aplicação usar para criar tabelas no SGBD, além de criar o database a ser usado pela aplicação:

```
~/ $ psql
seu_usuario=# CREATE ROLE dtool WITH LOGIN PASSWORD 'dtoolages2020';
seu_usuario=# ALTER ROLE dtool CREATEDB;
seu_usuario=# \q
~/ $ psql -d postgres -U dtool
seu_usuario=> CREATE DATABASE dtool;
seu_usuario=> \q
```

### 3 - [pgAdmin](https://www.pgadmin.org/) (opcional)

Para usar uma interface gráfica para manipular o database usado pela aplicação, [instale](https://www.pgadmin.org/download/) o pgAdmin 4 (de acordo com seu sistema operacional).

Para conectar-se ao servidor local pela interface do pgAdmin:
- na tela inicial do pgAdmin, vá até o menu e selecione _Object > Create > Server..._
- na aba _General_, preencha o campo _Name_ com `dtool-local` (usado apenas para identificar o servidor do banco, você pode escolher outro nome, se preferir)
- na aba _Connection_, preencha os campos como indicado abaixo:
  - _Host name/address_: `localhost`
  - _Maintenance databse_: `dtool`
  - _Username_: `dtool`
  - _Password_: `dtoolages2020`
- ainda na aba _Connection_, marque o campo _Save password?_
- clique em `Save`

Se o processo ocorrer conform esperado, o menu lateral deve estar parecido com o seguinte:

![Como o pgAdmin deve ficar após adicionar o servidor do banco](http://tools.ages.pucrs.br/dtool/wiki/raw/master/pgadmin.png)

### 4 - Clonar o repositório

Escolha um local no sistema de arquivos de sua máquina onde o projeto será armazenado. Navegue até a pasta selecionada com o terminal e clone o projeto usando o [Git](https://git-scm.com/).

```bash
~/       $ # considerando que o projeto ficará na pasta ~/dtool
~/       $ cd dtool
~/dtool/ $ git clone http://tools.ages.pucrs.br/dtool/backend.git
```

Depois do clone, vá até a pasta com o projeto e execute um comando do Git para ignorar mudanças locais no arquivo de configurações de ambiente:

```bash
~/dtool/         $ cd backend
~/dtool/backend/ $ git update-index --skip-worktree .env
```

### 5 - Instalar dependências do projeto

Navegue até a pasta do projeto com o terminal e use o [NPM](https://www.npmjs.com/) (já vem instalado com o NodeJS) para instalar as dependências do projeto.

```bash
~/dtool         $ cd backend
~/dtool/backend $ npm install # esse comando pode demorar alguns segundos para completar
```

### 6 - Configurar acesso ao PostgreSQL

Se você utilizou os mesmos parâmetros que foram usados nos comandos acima para configurar o PostgreSQL, pule esta etapa.

A aplicação NodeJS utiliza o valor na variável `DB_URL`, no arquivo `.env`, para conectar-se ao banco de dados. Altere o valor da variável usando o usuário, senha e database criados anteriormente (o formato da URL está no arquivo `.env`).

### 7 - Executar o backend

Por fim, para verificar se o ambiente está corretamente configurado, execute o servidor em modo de desenvolvimento:

```bash
~/dtool/backend $ npm run dev
... # algumas linhas vão aparecer aqui, é normal
Listening on port 4000 # se aparecer isso, então a configuração do ambiente deu certo :D
```

## Execução

Para o trabalho do dia-a-dia, você usará basicamente três comandos:

- ao iniciar o desenvolvimento, executar o servidor em ambiente de desenvolvimento:

```bash
~/dtool/backend $ npm run dev
```

- para executar os testes automatizados:

```bash
~/dtool/backend $ npm test
```

- para executar os testes automatizados coletando dados de code coverage:

```bash
~/dtool/backend $ npm run coverage
```

**Nota:** o relatório de coverage é salvo na pasta `coverage`, na raiz do projeto, e pode ser facilmente visualizado abrindo o arquivo `coverage/lcov-report/index.hmtl` em um navegador.

## Scrips

Foram criados alguns scripts que podem ser executados com o NPM. Todos os scrips podem ser executados com `npm run <nome-do-script>`.

Os principais scripts:

- `dev`: executar o servidor em modo desenvolvimento (com hot reload; veja mais sobre [nodemon](https://nodemon.io/));
- `lint`: executar o linter sobre todos os arquivos do projeto;
- `test`: executar os testes;
- `docs`: atualizar a documentação dos endpoints (a partir do Postman);
- `coverage`: executar os testes coletando dados de code coverage;
- `format`: formatar todo o código do projeto;
- `clean`: limpar todos os arquivos que podem ser gerados novamente (como código transpilado);
- `start`: executar o servidor em modo produção.

Scripts secundários, usados pelos scripts principais:

- `_prod`: executar o servidor em modo produção;
- `_dev`: executar o servidor em modo desenvolvimento, **sem** hot reload (atualizações nos arquivos requerem que o servidor seja reiniciado);
- `start-server`: executar o servidor, considerando que o código JS foi transpilado com Babel;
- `transpile`: transpilar código JS usando ES6+ para ES5 usando [Babel](https://babeljs.io/);
- `format:staged`: formatar apenas o código que está "staged" pelo Git, usado como hook de pré-commit;
- `pretest`: executar o linter antes de rodar os testes.

## Git Hooks

Foram criados hooks do Git usando [Husky](https://github.com/typicode/husky#readme) para a execução de tarefas de forma automatizada:

- `pre-commit`: antes de todo commit, faz a formatação dos arquivos incluidos no commit (staged);
- `pre-push`: antes de todo push, executa o linter sobre todos os arquivos do projeto (o linter está configurado apenas para exibir warnings, sem erros, então o push não falhará se houverem mudanças de linter a serem realizadas).

## Mais informações

Para saber mais informações sobre o projeto:

- [acesse a página da AGES sobre o projeto](http://www.ages.pucrs.br/dtool/)
- [acesse a wiki do projeto](http://tools.ages.pucrs.br/dtool/wiki/wikis/home)
- [acesse o repositório da wiki do projeto](http://tools.ages.pucrs.br/dtool/wiki/)
