import { Banco } from "./banco";
import { Cliente } from "./cliente";
import { Conta } from "./conta";
import {question} from 'readline-sync';
import { exibirContaFormatada, exibirClienteFormatado } from '../utilsExibicao';

export class App{
    private banco : Banco; //app contém um banco(meio obvio né kkk)

    constructor(banco : Banco = new Banco){
        this.banco = banco;
    }

    public inserirConta(): void{ //insere uma conta no array de contas do banco
        console.log("[ CADASTRO DE CONTA ]");//dados da conta serão informados
        let numero: string = question('Digite o número da conta:');
        let id: number = parseInt(question('Digite o id da conta:'));
        let saldo: number = parseFloat(question('Digite o saldo inicial da conta:'));
        let clienteCpf: string = question('Digite o cpf do cliente:');
        let cliente: Cliente = this.banco.consultarCliente(clienteCpf);
        if (cliente) {//caso o cliente que a conta será associado exista, segue tudo certinho
            let conta: Conta = new Conta(id, numero,saldo, cliente);
            this.banco.inserirConta(conta);
            console.log("Conta inserida com sucesso!");
        } else {
            console.log("Cliente não encontrado!");
        }
    }

    //realizar o cadastro de um cliente
    public inserirCliente(): void {
        console.log("[ CADASTRO DE CLIENTE ]");
        let id: number = parseInt(question('Digite o id do cliente:'));
        let nome: string = question('Digite o nome do cliente:');
        let cpf: string = question('Digite o cpf do cliente:');
        let dataNascimento: Date = new Date(question('Digite a data de nascimento do cliente:'));
        //verificar se esse cliente já existe
        let cliente: Cliente = new Cliente(id, nome, cpf, dataNascimento);
        this.banco.inserirCliente(cliente);
        console.log("Cliente inserido com sucesso!");
    }


    //metodo que faz a consulta de uma conta com base no número dela
    public consultarConta(): void {
        console.log("[ Consultar conta ]");
        let numero: string = question('Digite o número da conta:');
        let conta: Conta = this.banco.consultarConta(numero);
        if (conta) {
            exibirContaFormatada(conta);
        }else{
            console.log("Conta não encontrada!");
        }
    }

    //metodo que faz a consulta de um cliente com base no cpf dele
    public consultarCliente(): void {
        console.log("[ Consultar cliente ]");
        let cpf: string = question('Digite o cpf do cliente:');
        let cliente: Cliente = this.banco.consultarCliente(cpf);
        if(cliente) {
            exibirClienteFormatado(cliente);
        } else{
            console.log("Cliente não encontrado!");
        }
    }

    //metodo que realiza o saque de uma conta
    public sacar(): void {
        console.log("[ Sacar ]");
        let numero: string = question('Digite o número da conta:');
        let valor: number = parseFloat(question('Digite o valor do saque:'));
        this.banco.sacar(numero, valor);
    }

    //metodo que realiza o depósito em uma conta
    public depositar(): void {
        console.log("[ Depositar ]");
        let numero: string = question('Digite o número da conta:');
        let valor: number = parseFloat(question('Digite o valor do depósito:'));
        this.banco.depositar(numero, valor);
    }

    //metodo que exclui uma conta 
    public excluirConta(): void {
        console.log("[ Excluir conta ]");
        let numero: string = question('Digite o número da conta:');
        this.banco.removerConta(numero);
    }

    //metodo que realiza a transferência de uma conta para outra
    public transferir(): void {
        console.log("[ Transferir ]");
        let numeroOrigem: string = question('Digite o número da conta de origem:');
        let numeroDestino: string = question('Digite o número da conta de destino:');
        let valor: number = parseFloat(question('Digite o valor da transferência:'));
        this.banco.transferir(numeroOrigem, numeroDestino, valor);//faz a transferência...
    }

    //metodo que exibe as totalizações do banco
    public totalizacoes(): void {
        console.log("[ Totalizações ]");
        console.log(`Total de contas: ${this.banco.quantidadeContas()}`);
        console.log(`Saldo total: ${this.banco.totalizarSaldo()}`);
        console.log(`Média de saldo: ${this.banco.mediaSaldo()}`);
    }

    //metodo que muda a titularidade de uma conta
    public mudarTitularidade(): void {
        console.log("[ Mudar titularidade ]");
        let numero: string = question('Digite o número da conta:');
        let cpf: string = question('Digite o cpf do novo titular:');
        let cliente: Cliente = this.banco.consultarCliente(cpf);//encontra o cliente para verificar se ele existe
        if (cliente){//existe...
            this.banco.mudarTitularidadeConta(numero, cpf);
            console.log("Titularidade alterada com sucesso!");
        }else{
            console.log("Cliente não encontrado!");
        }
    }

    //metodo que exclui um cliente
    public excluirCliente(): void {
        console.log("[ Excluir cliente ]");
        let cpf: string = question('Digite o cpf do cliente:');
        this.banco.removerCliente(cpf); //remove o cliente
    }

    //metodo que exibe as contas sem titular e atribui um titular a elas
    public atribuirTitular(): void {
        console.log("[ Atribuir titular ]");
        let cpf: string = question('Digite o cpf do titular:');
        let contas: Conta[] = this.banco.consultarContasSemTitular();//contas sem titular
        if(contas.length == 0){//se não tiver conta sem titular
            console.log("Não há contas sem titular!");
        }else{
            for(let conta of contas){//para cada conta
                this.banco.mudarTitularidadeConta(conta.getNumero(), cpf);//atribui o titular
            }
            console.log("Titular atribuído com sucesso!");
        }
    }
    //vai pegar uma conta e distribuir o dinheiro dela para outras contas
    public ordemBancaria(): void{
        console.log("[ Ordem bancária ]");
        let numeroOrigem: string = question('Digite o número da conta de origem:');
        let valor: number = parseFloat(question("Digite o valor a ser distribuído:"));
        
        let contaOrigem: Conta = this.banco.consultarConta(numeroOrigem);//conta de origem
        //verificação da conta de origem
        if(!contaOrigem){
            console.log("Conta de origem não encontrada!");
            return;
        }

        //pegando informações sobre as contas destino
        let contasDestino: Conta[]  = [];
        let numContas : number = parseInt(question("Digite o número de contas destino:"));

        //verificar se conta origem tem o valor suficiente
        let valorTotal: number = numContas * valor;
        if(contaOrigem.consultarSaldo() < valorTotal){
            console.log("Saldo insuficiente!");
            return;
        }
        //para cada conta destino, vai ser solicitado o número da conta
        for(let i: number = 0; i < numContas; i++){
            let numeroDestino: string = question('Digite o número da conta de destino:');
            let contaDestino: Conta = this.banco.consultarConta(numeroDestino);
            if(contaDestino){
                contasDestino.push(contaDestino);
            }else{
                console.log("Conta de destino não encontrada!");
                return;
            }
        }
        //transferência
        for(let contaDestino of contasDestino){
            this.banco.transferir(numeroOrigem, contaDestino.getNumero(), valor);
        }
        console.log("Ordem bancária realizada com sucesso!");
    }


}