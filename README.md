﻿# Ethereum CRUD DApp

Este projeto é focado em exercitar o desenvolvimento de aplicações distribuídas (DApp)

Neste caso específico, a plataforma escolhida foi a Ethereum, por ser a principal rede
que permite contratos inteligentes.

Como framework de desenvolvimento, foi utilizado o [Truffle](https://trufflesuite.com/),
uma vez que ele facilita e agiliza o desenvolvimento, por meio de compilação, testes e
integração com o front-end, atualizando a URL do contrato sempre que a migração é rodada.

## Passo-a-passo de instalação e execução

* Instalar o framework Truffle  
  Tal ação pode ser realizada através do seguinte comando:  
  `npm i -g truffle`
* Clonar o projeto
* Instalar a blockchain [Ganache](https://trufflesuite.com/ganache/) (opcional, veja próximo tópico)
* Configurar as redes no arquivo "truffle-config.js"  
  No meu caso, como utilizei o Ganache como blockchain
  em ambiente de desenvolvimento, configurei o host e porta nas quais ele estava rodando (neste exemplo, os valores padrões são utilizados)
* Realizar deploy dos contratos  
  Para que todos os seus contratos sejam compilados e seus ABIs gerados, utilizamos o seguinte comando:  
  `truffle migrate`
* Iniciar servidor de acesso  
  Como precisamos carregar os ABIs no front-end, precisamos realizar uma requisição GET, o que não é permitido sem um servidor. Inicializaremos o nosso rodando o script "dev":  
  `npm run dev`
* Conectar uma conta - Web3  
  Neste exemplo, foi utilizada a extensão [MetaMask](https://metamask.io/) para realizar o gerenciamento de contas no navegador, então importei uma conta do Ganache através da chave privada no MetaMask.  
  Tal conta será utlizada para realizar todas as ações no CRUD.
  
