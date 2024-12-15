import { question } from "readline-sync";
import { App } from "./models/app";
import { exibirMenu, exibirMensagemFinalizacao } from "./utilsExibicao";

let app: App = new App(); //cria a aplicação
let opcao: string = '';

do {
    //exibe o menu bonitinho
    console.log(exibirMenu());
    opcao = question("Opção:");//usuario escolhe a opção

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
        case "0":
            break;
    }
    if(opcao != "0"){
    console.log(exibirMensagemFinalizacao());
    }//só pra ficar bonitinho e não ficar a aparecendo a mensagem de finalização quando o usuário sair do programa
    question("");//esperar o usuário digitar alguma coisa...
} while (opcao != "0");

console.log("Aplicação encerrada");