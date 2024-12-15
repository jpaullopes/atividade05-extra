"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
var app_1 = require("./models/app");
var utilsExibicao_1 = require("./utilsExibicao");
var app = new app_1.App(); //cria a aplicação
var opcao = '';
do {
    //exibe o menu bonitinho
    console.log((0, utilsExibicao_1.exibirMenu)());
    opcao = (0, readline_sync_1.question)("Opção:"); //usuario escolhe a opção
    //switch case para cada opção que o usurio escolher
    switch (opcao) {
        case "1":
            app.inserirConta();
            break;
        case "2":
            app.consultarConta();
            break;
        case "3":
            app.sacar();
            break;
        case "4":
            app.depositar();
            break;
        case "5":
            app.excluirConta();
            break;
        case "6":
            app.transferir();
            break;
        case "7":
            app.totalizacoes();
            break;
        case "8":
            app.inserirCliente();
            break;
        case "9":
            app.consultarCliente();
            break;
        case "10":
            app.atribuirTitular();
            break;
        case "11":
            app.ordemBancaria();
            break;
        case "12":
            app.excluirCliente();
            break;
        case "13":
            app.mudarTitularidade();
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
    console.log((0, utilsExibicao_1.exibirMensagemFinalizacao)());
    (0, readline_sync_1.question)(""); //esperar o usuário digitar alguma coisa...
} while (opcao != "0");
console.log("Aplicação encerrada");
