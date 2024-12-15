"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
var cliente_1 = require("./cliente");
var conta_1 = require("./conta");
//deus isso tá ficando cada dia maior...não sei mais nem quais são os metodos que tem em cada classe kkkkk
var Banco = /** @class */ (function () {
    function Banco(contas, clientes) {
        if (contas === void 0) { contas = []; }
        if (clientes === void 0) { clientes = []; }
        this.contas = [];
        this.clientes = [];
    }
    //consulta uma conta com base no numero
    Banco.prototype.consultarConta = function (numero) {
        var contaProcurada = new conta_1.Conta();
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta.getNumero() == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    };
    //retorna  indcie da conta no array de contas
    Banco.prototype.consultarPorIndice = function (numero) {
        var indiceProcurado = -1;
        for (var i = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    };
    //remover uma conta com base no id
    Banco.prototype.removerConta = function (numero) {
        var indiceProcurado = this.consultarPorIndice(numero);
        var clienteDonoConta = this.contas[indiceProcurado].getCliente(); //pega o cliente dono da conta
        if (indiceProcurado != -1) { //verifica se a conta foi encontrada
            clienteDonoConta.removerConta(numero); //faz com que a conta seja removida do array de contas do cliente
            for (var i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    };
    //remover um cliente com base no cpf
    Banco.prototype.removerCliente = function (cpf) {
        var clienteProcurado = this.consultarCliente(cpf);
        var contasCliente = clienteProcurado.getContas();
        for (var _i = 0, contasCliente_1 = contasCliente; _i < contasCliente_1.length; _i++) {
            var conta = contasCliente_1[_i];
            conta.setCliente(new cliente_1.Cliente()); //remove o cliente de todas as contas, adiciona um cliente vazio
        }
        this.clientes = this.clientes.filter(function (cliente) { return cliente.getCpf() !== cpf; });
        //a forma de remover o cliente acima é mais intendivél do que a da de remover conta
        //lembrar de usar o filter mais vezes
    };
    //consulta um cliente com base no cpf
    Banco.prototype.consultarCliente = function (cpf) {
        var clienteProcurado = new cliente_1.Cliente(); // O ponto de exclamação é para dizer que a variável não é nula
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var cliente = _a[_i];
            if (cliente.getCpf() == cpf) {
                clienteProcurado = cliente;
                break;
            }
        }
        return clienteProcurado;
    };
    //depositar valor em uma conta
    Banco.prototype.depositar = function (numero, valor) {
        var contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    };
    //saca valor de uma conta
    Banco.prototype.sacar = function (numero, valor) {
        var contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    };
    //alterar conta de um cliente
    Banco.prototype.alterar = function (conta) {
        var contaProcurada = this.consultarConta(conta.getNumero());
        if (contaProcurada) {
            contaProcurada = conta;
        }
    };
    //associar uma conta a um cliente
    Banco.prototype.associarContaCliente = function (numeroConta, cpfCliente) {
        var contaProcurada = this.consultarConta(numeroConta);
        var clienteProcurado = this.consultarCliente(cpfCliente);
        // verificando se o cliente possui a conta e que ela não pode ser adicionada novamente
        if (!clienteProcurado.getContas().some(function (conta) { return conta == contaProcurada; })) { //tive que apelar para o some
            clienteProcurado.getContas().push(contaProcurada);
        }
    };
    //listar contas de um cliente
    Banco.prototype.listarContasCliente = function (cpf) {
        var clienteProcurado = this.consultarCliente(cpf);
        return clienteProcurado.getContas();
    };
    //totalizar saldo de um cliente
    Banco.prototype.totalizarSaldoCliente = function (cpf) {
        var clienteProcurado = this.consultarCliente(cpf); //procura o cliente
        var contasCliente = clienteProcurado.getContas(); //pega as contas do cliente
        var saldoTotal = 0;
        for (var _i = 0, contasCliente_2 = contasCliente; _i < contasCliente_2.length; _i++) {
            var conta = contasCliente_2[_i];
            saldoTotal += conta.consultarSaldo();
        }
        return saldoTotal;
    };
    //método que insere um cliente no array de clientes
    Banco.prototype.inserirCliente = function (cliente) {
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var verificadorCliente = _a[_i];
            if (verificadorCliente.getCpf() == cliente.getCpf() ||
                verificadorCliente.getId() == cliente.getId()) {
                return; // Se o cliente já existir, não insere
            }
        }
        this.clientes.push(cliente);
    };
    //método que insere uma conta no array de contas
    Banco.prototype.inserirConta = function (conta) {
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var verificadorConta = _a[_i];
            if (verificadorConta.getNumero() == conta.getNumero() ||
                verificadorConta.getId() == conta.getId()) {
                return; // Se a conta já existir, não insere
            }
        }
        this.contas.push(conta);
    };
    //transferir valor de uma conta para outra
    Banco.prototype.transferir = function (numeroOrigem, numeroDestino, valor) {
        var contaOrigem = this.consultarConta(numeroOrigem);
        var contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
        }
    };
    //metodo que retorna a quantidade de contas
    Banco.prototype.quantidadeContas = function () {
        var quantidade = 0;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            quantidade++;
        }
        return quantidade;
    };
    //metodo que retorna a quantidade dos valorem em cada conta
    Banco.prototype.totalizarSaldo = function () {
        var totalSaldo = 0;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            totalSaldo += conta.consultarSaldo();
        }
        return totalSaldo;
    };
    //metodo que computa a media de saldo das contas
    Banco.prototype.mediaSaldo = function () {
        var totalSaldo = this.totalizarSaldo();
        var quantidadeContas = this.quantidadeContas();
        return totalSaldo / quantidadeContas;
    };
    //método transferir que recebe um array de contas destino e realiza transferências para cada uma delas;
    Banco.prototype.transferirParaVariasContas = function (numeroOrigem, contasDestino, valor) {
        var contaOrigem = this.consultarConta(numeroOrigem);
        //verificação se a conta é valida e foi encontrada
        if (contaOrigem) {
            for (var _i = 0, contasDestino_1 = contasDestino; _i < contasDestino_1.length; _i++) {
                var numeroConta = contasDestino_1[_i];
                var contaDestino = this.consultarConta(numeroConta);
                this.transferir(numeroOrigem, numeroConta, valor);
            }
        }
    };
    //metodo que altera o cliente de uma conta
    Banco.prototype.alterarClienteConta = function (clienteCpf, conta) {
        var clienteProcurado = this.consultarCliente(clienteCpf);
        var indiceProcurado = this.consultarPorIndice(conta.getNumero());
        if (clienteProcurado && indiceProcurado != -1) {
            this.contas[indiceProcurado].setCliente(clienteProcurado);
        }
    };
    //metodo que muda a tiularidade de uma conta
    Banco.prototype.mudarTitularidadeConta = function (numeroConta, cpfCliente) {
        var contaProcurada = this.consultarConta(numeroConta);
        var clienteProcurado = this.consultarCliente(cpfCliente);
        //verificação se o cliente e conta existem
        if (clienteProcurado && contaProcurada) {
            contaProcurada.setCliente(clienteProcurado);
        }
    };
    //consultar contas sem um titular e retorna um array de contas
    Banco.prototype.consultarContasSemTitular = function () {
        var contasSemTitular = this.contas.filter(function (conta) { return conta.getCliente().getCpf() == ""; }); //filter salva
        return contasSemTitular;
    };
    //getters
    Banco.prototype.getClientes = function () {
        return this.clientes;
    };
    Banco.prototype.getContas = function () {
        return this.contas;
    };
    return Banco;
}());
exports.Banco = Banco;
