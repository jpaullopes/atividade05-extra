import { Cliente } from "./cliente";
import { Conta } from "./conta";
//deus isso tá ficando cada dia maior...não sei mais nem quais são os metodos que tem em cada classe kkkkk

export class Banco{
    private contas : Conta[];
    private clientes : Cliente[];

    constructor(contas: Conta[] = [], clientes: Cliente[] = []) {
        this.contas = [];
        this.clientes = [];
    }

    //consulta uma conta com base no numero
    public consultarConta(numero: string): Conta {
        let contaProcurada = new Conta();
        for (let conta of this.contas) {
            if (conta.getNumero() == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }

    //retorna  indcie da conta no array de contas
    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    //remover uma conta com base no id
    public removerConta(numero: string): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);
        let clienteDonoConta = this.contas[indiceProcurado].getCliente();//pega o cliente dono da conta

        if (indiceProcurado != -1) { //verifica se a conta foi encontrada
            clienteDonoConta.removerConta(numero);//faz com que a conta seja removida do array de contas do cliente
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    //remover um cliente com base no cpf
    public removerCliente(cpf: string): void {
        let clienteProcurado = this.consultarCliente(cpf);
        let contasCliente = clienteProcurado.getContas();

        for(let conta of contasCliente){
            conta.setCliente(new Cliente()); //remove o cliente de todas as contas, adiciona um cliente vazio
        }
        this.clientes = this.clientes.filter(cliente => cliente.getCpf() !== cpf);
        //a forma de remover o cliente acima é mais intendivél do que a da de remover conta
        //lembrar de usar o filter mais vezes
    }


    //consulta um cliente com base no cpf
    public consultarCliente(cpf: string): Cliente{
        let clienteProcurado  = new Cliente(); // O ponto de exclamação é para dizer que a variável não é nula
        for(let cliente of this.clientes){
            if(cliente.getCpf() == cpf){
                clienteProcurado = cliente;
                break;
            }
        }
        return clienteProcurado;
    }

    //depositar valor em uma conta
    public depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    //saca valor de uma conta
    public sacar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }

    //alterar conta de um cliente
    public alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultarConta(conta.getNumero());

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    //associar uma conta a um cliente
    public associarContaCliente(numeroConta: string, cpfCliente: string): void {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpfCliente);

        // verificando se o cliente possui a conta e que ela não pode ser adicionada novamente
        if (!clienteProcurado.getContas().some(conta => conta == contaProcurada)) { //tive que apelar para o some
            clienteProcurado.getContas().push(contaProcurada);
        }
    }

    //listar contas de um cliente
    public listarContasCliente(cpf: string): Conta[]{
        let clienteProcurado = this.consultarCliente(cpf);
        return clienteProcurado.getContas();
    }

    //totalizar saldo de um cliente
    public totalizarSaldoCliente(cpf: string): number{
        let clienteProcurado = this.consultarCliente(cpf);//procura o cliente
        let contasCliente = clienteProcurado.getContas();//pega as contas do cliente
        let saldoTotal = 0;

        for(let conta of contasCliente){
            saldoTotal += conta.consultarSaldo();
        }
        return saldoTotal;
    }

    //método que insere um cliente no array de clientes
    public inserirCliente(cliente: Cliente): void{
        for(let verificadorCliente of this.clientes){
            if(verificadorCliente.getCpf() == cliente.getCpf() ||
                verificadorCliente.getId() == cliente.getId()){
                    return; // Se o cliente já existir, não insere
                }
        }
        this.clientes.push(cliente);
    }

    //método que insere uma conta no array de contas
    public inserirConta(conta: Conta): void{
        for(let verificadorConta of this.contas){
            if(verificadorConta.getNumero() == conta.getNumero() ||
                verificadorConta.getId() == conta.getId()){
                return; // Se a conta já existir, não insere
            }
        }
        this.contas.push(conta);
    }

    //transferir valor de uma conta para outra
    public transferir(numeroOrigem: string, numeroDestino: string, valor: number): void{
        let contaOrigem: Conta = this.consultarConta(numeroOrigem);
        let contaDestino: Conta = this.consultarConta(numeroDestino);

        if(contaOrigem && contaDestino){
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
        }
    }

    //metodo que retorna a quantidade de contas
    public quantidadeContas(): number{
        let quantidade : number = 0;
        for(let conta of this.contas){
            quantidade++;
        }
        return quantidade;
    }

    //metodo que retorna a quantidade dos valorem em cada conta
    public totalizarSaldo(): number{
        let totalSaldo : number = 0;
        for(let conta of this.contas){
            totalSaldo += conta.consultarSaldo();
        }
        return totalSaldo;
    }

    //metodo que computa a media de saldo das contas
    public mediaSaldo(): number{
        let totalSaldo : number = this.totalizarSaldo();
        let quantidadeContas : number = this.quantidadeContas();
        return totalSaldo / quantidadeContas;
    }

    //método transferir que recebe um array de contas destino e realiza transferências para cada uma delas;
    public transferirParaVariasContas(numeroOrigem: string, contasDestino: string[], valor: number): void{
        let contaOrigem: Conta = this.consultarConta(numeroOrigem);

        //verificação se a conta é valida e foi encontrada
        if(contaOrigem){
            for(let numeroConta of contasDestino){
                let contaDestino : Conta = this.consultarConta(numeroConta);
                this.transferir(numeroOrigem, numeroConta, valor);
            }
        }
    }

    //metodo que altera o cliente de uma conta
    public alterarClienteConta(clienteCpf: string, conta: Conta) : void{
        let clienteProcurado = this.consultarCliente(clienteCpf);
        let indiceProcurado = this.consultarPorIndice(conta.getNumero());

        if(clienteProcurado && indiceProcurado != -1){
            this.contas[indiceProcurado].setCliente(clienteProcurado);
        }
    }

    //metodo que muda a tiularidade de uma conta
    public mudarTitularidadeConta(numeroConta : string, cpfCliente : string): void{
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpfCliente);

        //verificação se o cliente e conta existem
        if(clienteProcurado && contaProcurada){
            contaProcurada.setCliente(clienteProcurado);
        }
    }

    //consultar contas sem um titular e retorna um array de contas
    public consultarContasSemTitular(): Conta[]{
        let contasSemTitular: Conta[] = this.contas.filter(conta => conta.getCliente().getCpf() == "");//filter salva
        return contasSemTitular;
    }

    //getters
    public getClientes(): Cliente[]{
        return this.clientes;
    }

    public getContas(): Conta[]{
        return this.contas;
    }

}