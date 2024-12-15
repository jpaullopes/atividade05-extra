import { Cliente } from './cliente';

export class Conta{
    private id : number
    private numero : string;
    private saldo : number;
    private cliente : Cliente;

    constructor(id: number = 0, numero: string = "", saldo: number = 0, cliente: Cliente = new Cliente()){
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente;
    }

    public sacar(valor : number) : void{
        this.saldo = this.saldo - valor;
    }

    public depositar(valor : number) : void{
        this.saldo = this.saldo + valor;
    }

    public consultarSaldo() : number{
        return this.saldo;
    }

    public transferir(contaDestino : Conta, valor : number) : void{
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    //getters
    public getNumero() : string{
        return this.numero;
    }

    public getId() : number{
        return this.id;
    }

    public getCliente() : Cliente{
        return this.cliente;
    }

    //seter do cliente
    public setCliente(cliente : Cliente) : void{
        this.cliente = cliente;
    }
}