# lab-hard-web
## Plataforma Web do Laboratório 43 de Eletrônica da Faculdade de Engenharia da Computação - UFPA.

## Tecnologias utilizadas
    HTML, CSS, JavaScript, Node.Js e MongoDB.
## Frameworks
    Angular ou Vue, futuras implementações.

### Implementações futuras
    Criar serviços
    Criação tabelas serviços no MongoDB

### Servidor
#### Instale os pacotes necessários, No diretório raiz do projeto, rode o seguinte comando:
```bash
$ npm install
$ npm init -y
$ npm install express mongoose bcryptjs jsonwebtoken cors
```

#### Instalar o pacote dotenv para carregar as variáveis de ambiente, execute:
```bash
$ npm install dotenv
```

#### Instalar o pacote validator: No terminal, na raiz do seu projeto, execute o seguinte comando:
```bash
$ npm install validator
```

#### Suba o MongoDB em sua máquina ou use MongoDB Atlas. Execute o servidor Node.js:    
```bash
$ node server.js
```

#### Execute o comando para verificar as vulnerabilidades e atualize as dependências:  
```bash
$ npm audit
```