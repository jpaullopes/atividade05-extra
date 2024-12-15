import { Conta } from "./models/conta";
import { Cliente } from "./models/cliente";


//função que exibe as informações da conta formatada
function exibirContaFormatada(conta: Conta): void {
    console.log(`
            [ CONTA CLIENTE ]
NUMERO:  [ ${conta.getNumero()} ]
ID:      [ ${conta.getId()} ]
SALDO:   [ ${conta.consultarSaldo()} ]
CLIENTE: [ ${conta.getCliente().getNome()} ]
`);
}

//função que exibe as informações do cliente formatada
function exibirClienteFormatado(cliente: Cliente): void {
    console.log(`
            [ CLIENTE ]
NOME:    [ ${cliente.getNome()} ]
CPF:     [ ${cliente.getCpf()} ]
IDADE:   [ ${cliente.getDataNascimento()} ]
`);
}
function exibirMenu(): string {
    return `
            [ MENU ]
      [ Digite uma opção ]
---------------------------------
[ CONTAS ]
[1] - Inserir
[2] - Consultar
[3] - Sacar
[4] - Depositar
[5] - Excluir
[6] - Transferir
[7] - Totalizações
[11] - Ordem Bancária
[13] - Mudar titularidade
---------------------------------
[ CLIENTES ]
[8] - Inserir
[9] - Consultar
[10] - Associar
[12] - Excluir
[0] - Sair
---------------------------------`;
}

function exibirMensagemFinalizacao(): string {
    return `
---------------------------------
Operação finalizada. Digite <enter>
---------------------------------`;
}

export { exibirContaFormatada, exibirClienteFormatado, exibirMenu, exibirMensagemFinalizacao };