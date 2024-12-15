"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var banco_1 = require("./banco");
var cliente_1 = require("./cliente");
var conta_1 = require("./conta");
var readline_sync_1 = require("readline-sync");
var utilsExibicao_1 = require("../utilsExibicao");
var App = /** @class */ (function () {
    function App(banco) {
        if (banco === void 0) { banco = new banco_1.Banco; }
        this.banco = banco;
    }
    App.prototype.inserirConta = function () {
        console.log("[ CADASTRO DE CONTA ]"); //dados da conta serão informados
        var numero = (0, readline_sync_1.question)('Digite o número da conta:');
        var id = parseInt((0, readline_sync_1.question)('Digite o id da conta:'));
        var saldo = parseFloat((0, readline_sync_1.question)('Digite o saldo inicial da conta:'));
        var clienteCpf = (0, readline_sync_1.question)('Digite o cpf do cliente:');
        var cliente = this.banco.consultarCliente(clienteCpf);
        if (cliente) { //caso o cliente que a conta será associado exista, segue tudo certinho
            var conta = new conta_1.Conta(id, numero, saldo, cliente);
            this.banco.inserirConta(conta);
            console.log("Conta inserida com sucesso!");
        }
        else {
            console.log("Cliente não encontrado!");
        }
    };
    //realizar o cadastro de um cliente
    App.prototype.inserirCliente = function () {
        console.log("[ CADASTRO DE CLIENTE ]");
        var id = parseInt((0, readline_sync_1.question)('Digite o id do cliente:'));
        var nome = (0, readline_sync_1.question)('Digite o nome do cliente:');
        var cpf = (0, readline_sync_1.question)('Digite o cpf do cliente:');
        var dataNascimento = new Date((0, readline_sync_1.question)('Digite a data de nascimento do cliente:'));
        //verificar se esse cliente já existe
        var cliente = new cliente_1.Cliente(id, nome, cpf, dataNascimento);
        this.banco.inserirCliente(cliente);
        console.log("Cliente inserido com sucesso!");
    };
    //metodo que faz a consulta de uma conta com base no número dela
    App.prototype.consultarConta = function () {
        console.log("[ Consultar conta ]");
        var numero = (0, readline_sync_1.question)('Digite o número da conta:');
        var conta = this.banco.consultarConta(numero);
        if (conta) {
            (0, utilsExibicao_1.exibirContaFormatada)(conta);
        }
        else {
            console.log("Conta não encontrada!");
        }
    };
    //metodo que faz a consulta de um cliente com base no cpf dele
    App.prototype.consultarCliente = function () {
        console.log("[ Consultar cliente ]");
        var cpf = (0, readline_sync_1.question)('Digite o cpf do cliente:');
        var cliente = this.banco.consultarCliente(cpf);
        if (cliente) {
            (0, utilsExibicao_1.exibirClienteFormatado)(cliente);
        }
        else {
            console.log("Cliente não encontrado!");
        }
    };
    //metodo que realiza o saque de uma conta
    App.prototype.sacar = function () {
        console.log("[ Sacar ]");
        var numero = (0, readline_sync_1.question)('Digite o número da conta:');
        var valor = parseFloat((0, readline_sync_1.question)('Digite o valor do saque:'));
        this.banco.sacar(numero, valor);
    };
    //metodo que realiza o depósito em uma conta
    App.prototype.depositar = function () {
        console.log("[ Depositar ]");
        var numero = (0, readline_sync_1.question)('Digite o número da conta:');
        var valor = parseFloat((0, readline_sync_1.question)('Digite o valor do depósito:'));
        this.banco.depositar(numero, valor);
    };
    //metodo que exclui uma conta 
    App.prototype.excluirConta = function () {
        console.log("[ Excluir conta ]");
        var numero = (0, readline_sync_1.question)('Digite o número da conta:');
        this.banco.removerConta(numero);
    };
    //metodo que realiza a transferência de uma conta para outra
    App.prototype.transferir = function () {
        console.log("[ Transferir ]");
        var numeroOrigem = (0, readline_sync_1.question)('Digite o número da conta de origem:');
        var numeroDestino = (0, readline_sync_1.question)('Digite o número da conta de destino:');
        var valor = parseFloat((0, readline_sync_1.question)('Digite o valor da transferência:'));
        this.banco.transferir(numeroOrigem, numeroDestino, valor); //faz a transferência...
    };
    //metodo que exibe as totalizações do banco
    App.prototype.totalizacoes = function () {
        console.log("[ Totalizações ]");
        console.log("Total de contas: ".concat(this.banco.quantidadeContas()));
        console.log("Saldo total: ".concat(this.banco.totalizarSaldo()));
        console.log("M\u00E9dia de saldo: ".concat(this.banco.mediaSaldo()));
    };
    //metodo que muda a titularidade de uma conta
    App.prototype.mudarTitularidade = function () {
        console.log("[ Mudar titularidade ]");
        var numero = (0, readline_sync_1.question)('Digite o número da conta:');
        var cpf = (0, readline_sync_1.question)('Digite o cpf do novo titular:');
        var cliente = this.banco.consultarCliente(cpf); //encontra o cliente para verificar se ele existe
        if (cliente) { //existe...
            this.banco.mudarTitularidadeConta(numero, cpf);
            console.log("Titularidade alterada com sucesso!");
        }
        else {
            console.log("Cliente não encontrado!");
        }
    };
    //metodo que exclui um cliente
    App.prototype.excluirCliente = function () {
        console.log("[ Excluir cliente ]");
        var cpf = (0, readline_sync_1.question)('Digite o cpf do cliente:');
        this.banco.removerCliente(cpf); //remove o cliente
    };
    //metodo que exibe as contas sem titular e atribui um titular a elas
    App.prototype.atribuirTitular = function () {
        console.log("[ Atribuir titular ]");
        var cpf = (0, readline_sync_1.question)('Digite o cpf do titular:');
        var contas = this.banco.consultarContasSemTitular(); //contas sem titular
        if (contas.length == 0) { //se não tiver conta sem titular
            console.log("Não há contas sem titular!");
        }
        else {
            for (var _i = 0, contas_1 = contas; _i < contas_1.length; _i++) { //para cada conta
                var conta = contas_1[_i];
                this.banco.mudarTitularidadeConta(conta.getNumero(), cpf); //atribui o titular
            }
            console.log("Titular atribuído com sucesso!");
        }
    };
    //vai pegar uma conta e distribuir o dinheiro dela para outras contas
    App.prototype.ordemBancaria = function () {
        console.log("[ Ordem bancária ]");
        var numeroOrigem = (0, readline_sync_1.question)('Digite o número da conta de origem:');
        var valor = parseFloat((0, readline_sync_1.question)("Digite o valor a ser distribuído:"));
        var contaOrigem = this.banco.consultarConta(numeroOrigem); //conta de origem
        //verificação da conta de origem
        if (!contaOrigem) {
            console.log("Conta de origem não encontrada!");
            return;
        }
        //pegando informações sobre as contas destino
        var contasDestino = [];
        var numContas = parseInt((0, readline_sync_1.question)("Digite o número de contas destino:"));
        //verificar se conta origem tem o valor suficiente
        var valorTotal = numContas * valor;
        if (contaOrigem.consultarSaldo() < valorTotal) {
            console.log("Saldo insuficiente!");
            return;
        }
        //para cada conta destino, vai ser solicitado o número da conta
        for (var i = 0; i < numContas; i++) {
            var numeroDestino = (0, readline_sync_1.question)('Digite o número da conta de destino:');
            var contaDestino = this.banco.consultarConta(numeroDestino);
            if (contaDestino) {
                contasDestino.push(contaDestino);
            }
            else {
                console.log("Conta de destino não encontrada!");
                return;
            }
        }
        //transferência
        for (var _i = 0, contasDestino_1 = contasDestino; _i < contasDestino_1.length; _i++) {
            var contaDestino = contasDestino_1[_i];
            this.banco.transferir(numeroOrigem, contaDestino.getNumero(), valor);
        }
        console.log("Ordem bancária realizada com sucesso!");
    };
    return App;
}());
exports.App = App;
