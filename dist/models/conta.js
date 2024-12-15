"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
var cliente_1 = require("./cliente");
var Conta = /** @class */ (function () {
    function Conta(id, numero, saldo, cliente) {
        if (id === void 0) { id = 0; }
        if (numero === void 0) { numero = ""; }
        if (saldo === void 0) { saldo = 0; }
        if (cliente === void 0) { cliente = new cliente_1.Cliente(); }
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
    }
    Conta.prototype.sacar = function (valor) {
        this.saldo = this.saldo - valor;
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo = this.saldo + valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    //getters
    Conta.prototype.getNumero = function () {
        return this.numero;
    };
    Conta.prototype.getId = function () {
        return this.id;
    };
    Conta.prototype.getCliente = function () {
        return this.cliente;
    };
    //seter do cliente
    Conta.prototype.setCliente = function (cliente) {
        this.cliente = cliente;
    };
    return Conta;
}());
exports.Conta = Conta;
