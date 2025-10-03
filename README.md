# CheckMente - Plataforma de Apoio Emocional

Uma plataforma web para apoio emocional e psicológico, desenvolvida com Node.js, Express e MongoDB.

## Funcionalidades

- **Página Inicial**: Apresentação dos serviços e benefícios
- **Sobre Mim**: Informações sobre a psicóloga Dra. Ana Costa
- **Desabafar**: Formulário para envio de desabafos
- **Ajuda**: FAQ e formulário para reportar problemas
- **Tema Escuro/Claro**: Alternância de tema
- **Responsivo**: Design adaptável para dispositivos móveis

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Banco de Dados**: MongoDB Atlas
- **Outros**: CORS, dotenv

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no MongoDB Atlas

### Passos para Instalação

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd checkmente
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Edite o arquivo `.env` e substitua `<db_password>` pela sua senha real do MongoDB Atlas
   - A string de conexão já está configurada no arquivo

4. **Inicie o servidor**:
   ```bash
   npm start
   ```

5. **Acesse a aplicação**:
   - Frontend: Abra `index.html` no navegador
   - Backend: O servidor estará rodando em `http://localhost:3000`

## Estrutura do Projeto

```
checkmente/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript do frontend
├── server.js           # Servidor Express
├── package.json        # Dependências do projeto
├── .env               # Variáveis de ambiente
└── README.md          # Este arquivo
```

## Endpoints da API

### POST /api/desabafar
Recebe dados do formulário de desabafo e salva no MongoDB.

**Corpo da requisição**:
```json
{
  "nome": "Nome opcional",
  "assunto": "Assunto selecionado",
  "desabafo": "Conteúdo do desabafo",
  "contato": "Informações de contato",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/reportar
Recebe dados do formulário de relatório de problemas.

**Corpo da requisição**:
```json
{
  "problema": "Descrição do problema",
  "pagina": "Página onde ocorreu",
  "email": "E-mail para contato",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Banco de Dados

O projeto utiliza MongoDB Atlas com duas coleções principais:
- `desabafos`: Armazena os desabafos enviados pelos usuários
- `reports`: Armazena os relatórios de problemas

## Desenvolvimento

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## Segurança

- Dados criptografados no MongoDB
- Validação de entrada nos formulários
- CORS configurado para desenvolvimento
- Variáveis de ambiente para credenciais sensíveis

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.

## Contato

- E-mail: contato@checkmente.com
- Telefone: +55 (11) 99999-9999
