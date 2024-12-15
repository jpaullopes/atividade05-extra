"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, cpf, dataNascimento, contas) {
        if (id === void 0) { id = 0; }
        if (nome === void 0) { nome = ""; }
        if (cpf === void 0) { cpf = ""; }
        if (dataNascimento === void 0) { dataNascimento = new Date(); }
        if (contas === void 0) { contas = []; }
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = [];
    }
    Cliente.prototype.removerConta = function (numero) {
        this.contas = this.contas.filter(function (conta) { return conta.getNumero() !== numero; });
    };
    //getters
    Cliente.prototype.getCpf = function () {
        return this.cpf;
    };
    Cliente.prototype.getContas = function () {
        return this.contas;
    };
    Cliente.prototype.getId = function () {
        return this.id;
    };
    Cliente.prototype.getNome = function () {
        return this.nome;
    };
    Cliente.prototype.getDataNascimento = function () {
        return this.dataNascimento;
    };
    //adicinar conta ao array de contas
    Cliente.prototype.adicionarConta = function (conta) {
        this.contas.push(conta);
    };
    return Cliente;
}());
exports.Cliente = Cliente;
