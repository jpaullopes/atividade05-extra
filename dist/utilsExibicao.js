"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirContaFormatada = exibirContaFormatada;
exports.exibirClienteFormatado = exibirClienteFormatado;
exports.exibirMenu = exibirMenu;
exports.exibirMensagemFinalizacao = exibirMensagemFinalizacao;
//função que exibe as informações da conta formatada
function exibirContaFormatada(conta) {
    console.log("\n            [ CONTA CLIENTE ]\nNUMERO:  [ ".concat(conta.getNumero(), " ]\nID:      [ ").concat(conta.getId(), " ]\nSALDO:   [ ").concat(conta.consultarSaldo(), " ]\nCLIENTE: [ ").concat(conta.getCliente().getNome(), " ]\n"));
}
//função que exibe as informações do cliente formatada
function exibirClienteFormatado(cliente) {
    console.log("\n            [ CLIENTE ]\nNOME:    [ ".concat(cliente.getNome(), " ]\nCPF:     [ ").concat(cliente.getCpf(), " ]\nIDADE:   [ ").concat(cliente.getDataNascimento(), " ]\n"));
}
function exibirMenu() {
    return "\n            [ MENU ]\n      [ Digite uma op\u00E7\u00E3o ]\n---------------------------------\n[ CONTAS ]\n[1] - Inserir\n[2] - Consultar\n[3] - Sacar\n[4] - Depositar\n[5] - Excluir\n[6] - Transferir\n[7] - Totaliza\u00E7\u00F5es\n[11] - Ordem Banc\u00E1ria\n[13] - Mudar titularidade\n---------------------------------\n[ CLIENTES ]\n[8] - Inserir\n[9] - Consultar\n[10] - Associar\n[12] - Excluir\n[0] - Sair\n---------------------------------";
}
function exibirMensagemFinalizacao() {
    return "\n---------------------------------\nOpera\u00E7\u00E3o finalizada. Digite <enter>\n---------------------------------";
}
