# Sistema Bancário

Este projeto é uma implementação de um sistema bancário simples, desenvolvido como parte de uma atividade acadêmica. O sistema permite gerenciar clientes, contas e realizar operações bancárias básicas.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **Classe `Cliente`**: Representa um cliente do banco.
- **Classe `Conta`**: Representa uma conta bancária.
- **Classe `Banco`**: Centraliza a gestão de clientes e contas, além de realizar operações bancárias.
- **Classe `App`**: Interface de usuário para interagir com o sistema bancário.
- **Arquivo `main.ts`**: Ponto de entrada do sistema, onde o menu é exibido e as operações são realizadas.

## Classes e Métodos

### Classe `Cliente`
A classe `Cliente` representa um cliente do banco e possui os seguintes atributos e métodos:

#### Atributos
- `id`: Identificador único do cliente.
- `nome`: Nome do cliente.
- `cpf`: CPF do cliente.
- `dataNascimento`: Data de nascimento do cliente.
- `contas`: Lista de contas associadas ao cliente.

#### Métodos
- `getCpf()`: Retorna o CPF do cliente.
- `getContas()`: Retorna a lista de contas do cliente.
- `getId()`: Retorna o ID do cliente.
- `getNome()`: Retorna o nome do cliente.
- `getDataNascimento()`: Retorna a data de nascimento do cliente.
- `adicionarConta(conta: Conta)`: Adiciona uma conta à lista de contas do cliente.
- `removerConta(numero: string)`: Remove uma conta da lista de contas do cliente.

### Classe `Conta`
A classe `Conta` representa uma conta bancária e possui os seguintes atributos e métodos:

#### Atributos
- `id`: Identificador único da conta.
- `numero`: Número da conta.
- `saldo`: Saldo da conta.
- `cliente`: Cliente associado à conta.

#### Métodos
- `sacar(valor: number)`: Realiza um saque na conta.
- `depositar(valor: number)`: Realiza um depósito na conta.
- `consultarSaldo()`: Retorna o saldo da conta.
- `transferir(contaDestino: Conta, valor: number)`: Transfere um valor para outra conta.
- `getNumero()`: Retorna o número da conta.
- `getId()`: Retorna o ID da conta.
- `getCliente()`: Retorna o cliente associado à conta.
- `setCliente(cliente: Cliente)`: Define o cliente associado à conta.

### Classe `Banco`
A classe `Banco` centraliza a gestão de clientes e contas, além de realizar operações bancárias. Possui os seguintes atributos e métodos:

#### Atributos
- `contas`: Lista de contas do banco.
- `clientes`: Lista de clientes do banco.

#### Métodos
- `consultarConta(numero: string)`: Retorna a conta com o número fornecido.
- `consultarCliente(cpf: string)`: Retorna o cliente com o CPF fornecido.
- `associarContaCliente(numeroConta: string, cpfCliente: string)`: Associa uma conta a um cliente.
- `listarContasCliente(cpf: string)`: Retorna a lista de contas de um cliente.
- `totalizarSaldoCliente(cpf: string)`: Retorna o saldo total das contas de um cliente.
- `inserirCliente(cliente: Cliente)`: Insere um cliente no banco.
- `inserirConta(conta: Conta)`: Insere uma conta no banco.
- `removerConta(numero: string)`: Remove uma conta do banco.
- `removerCliente(cpf: string)`: Remove um cliente do banco.
- `sacar(numero: string, valor: number)`: Realiza um saque em uma conta.
- `depositar(numero: string, valor: number)`: Realiza um depósito em uma conta.
- `transferir(numeroOrigem: string, numeroDestino: string, valor: number)`: Transfere um valor de uma conta para outra.
- `mudarTitularidadeConta(numeroConta: string, cpfCliente: string)`: Muda a titularidade de uma conta.
- `consultarContasSemTitular()`: Retorna uma lista de contas sem titular.
- `quantidadeContas()`: Retorna a quantidade de contas no banco.
- `totalizarSaldo()`: Retorna o saldo total de todas as contas no banco.
- `mediaSaldo()`: Retorna a média de saldo das contas no banco.

### Classe `App`
A classe `App` fornece uma interface de usuário para interagir com o sistema bancário. Possui os seguintes métodos:

#### Métodos
- `inserirConta()`: Insere uma nova conta no banco.
- `inserirCliente()`: Insere um novo cliente no banco.
- `consultarConta()`: Consulta uma conta no banco.
- `consultarCliente()`: Consulta um cliente no banco.
- `sacar()`: Realiza um saque em uma conta.
- `depositar()`: Realiza um depósito em uma conta.
- `excluirConta()`: Exclui uma conta do banco.
- `transferir()`: Transfere um valor de uma conta para outra.
- `totalizacoes()`: Exibe as totalizações do banco.
- `mudarTitularidade()`: Muda a titularidade de uma conta.
- `excluirCliente()`: Exclui um cliente do banco.
- `atribuirTitular()`: Atribui um titular a contas sem titular.
- `ordemBancaria()`: Realiza uma ordem bancária, transferindo valores de uma conta de origem para várias contas de destino.

## Arquivo `main.ts`
O arquivo `main.ts` é o ponto de entrada do sistema. Ele exibe um menu de opções para o usuário e chama os métodos correspondentes da classe `App` com base na opção escolhida.

### Menu de Opções
- `[1] - Inserir Conta`
- `[2] - Consultar Conta`
- `[3] - Sacar`
- `[4] - Depositar`
- `[5] - Excluir Conta`
- `[6] - Transferir`
- `[7] - Totalizações`
- `[8] - Inserir Cliente`
- `[9] - Consultar Cliente`
- `[10] - Associar Conta`
- `[11] - Ordem Bancária`
- `[12] - Excluir Cliente`
- `[13] - Mudar Titularidade`
- `[0] - Sair`

## Conclusão

Este projeto é uma implementação simples de um sistema bancário em TypeScript. Ele demonstra o uso de classes, métodos, atributos, arrays e operações básicas em TypeScript. Para projetos mais complexos, seria necessário adicionar mais funcionalidades, como validações, tratamento de erros, persistência de dados, interface gráfica, etc.

## Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
