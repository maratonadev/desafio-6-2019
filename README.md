[![](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://cloud.ibm.com)
[![Platform](https://img.shields.io/badge/platform-nodejs-lightgrey.svg?style=flat)](https://developer.ibm.com/node/)
[![Slack](https://maratona-inviter.mybluemix.net/badge.svg)](https://ibm.biz/convite-slack)

# Desafio 06 | Ingram

* [1. Introdução](#1-introdução)
* [2. Desafio](#2-desafio)
* [3. Avaliação](#3-avaliação)
* [4. Pré-requisitos](#4-pré-requisitos)
* [5. Treinamento do modelo](#5-treinamento-do-modelo)
* [6. Instância do Natural Language Understanding](#6-instância-do-natural-language-understanding)
    * [6.1. Credenciais do Natural Language Understanding](#6-1-credenciais-do-natural-language-understanding)
* [7. Aplicação na nuvem](#7-aplicação-na-nuvem)
    * [7.1. Veja como configurar o IBM Continuous Delivery](#7-1-veja-como-configurar-o-ibm-continuous-delivery)
    * [7.2. Credenciais na aplicação](#7-2-credenciais-na-aplicação)
* [8. Submissão](#8-submissão)

## Para te ajudar

* [Material de Apoio](#material-de-apoio)
* [Troubleshooting](#troubleshooting)
* [Dúvidas](#dúvidas)
* [License](#license)

## 1. Introdução

O Programa Novas Rotas da Ingram Micro tem como foco estender o papel da Ingram como maior distribuidor de tecnologia do mundo, adicionando a capacidade de ser também um provedor de soluções. A iniciativa Novas Rotas da Ingram é quem está promovendo a parceria Ingram e IBM para o “Maratona behind the code”. 

O Programa Novas Rotas traz um dos principais desafios do sistema judiciário brasileiro que está passando por uma transformação de ideologia, substituir a “cultura da sentença” pela “cultura da pacificação”. Atualmente para cada 10 novas demandas de processos, apenas 3 demandas anteriores são resolvidas. Esta diferença produz um déficit operacional de aproximadamente 115 milhões de processos jurídicos, onde cerca de 40% destas demandas não deveriam estar no âmbito judiciário e poderiam ser facilmente tratadas em etapa anterior para alcançar a resolução.

De forma inovadora estamos promovendo o chamado meios alternativos de resolução de conflitos, em inglês ADR (Alternative Dispute Resolution). Uma das caracterizações da ADR são as chamadas Soluções Online de Conflitos que segue como principal proposta deste desafio. Como o sistema judiciário possui um volume muito grande de processos, o objetivo é evitar novos custos pertinentes as posteriores etapas do processo judiciário e promover resoluções mais rápida atuando na fase de Mediação e Conciliação de disputas em vários casos.

Baseado neste contexto, a Ingram propõe a criação de um Mediador de Conflitos Cognitivo. O mediador do desafio visa acelerar o entendimento dos acordos da etapa de Mediação e Conciliação, acelerando o processo de homologação e execução dos acordos por parte do juiz de carreira.

## 2. Desafio

Toda fase de Mediação e Conciliação se conclui com um termo de audiência do acordo a ser realizado. Este documento não possui uma padronização e tem sua complexidade variada. Atualmente, cada termo é lido e interpretado pelo juiz de carreira que analisa cada caso e dá a execução dos acordos entre os envolvidos.

O mediador de conflitos do desafio vai atuar auxiliando o juiz de carreira na leitura dos termos de audiência do acordo dos processos extrajudiciais. A ideia é extrair previamente, de cada processo, os seguintes elementos do termo de audiência do acordo:

* Título do conflito;
* Número do processo;
* Tipo de acordo;
* Termos do acordo, e;
* Nome das pessoas contidas no documento.

Portanto, este desafio consiste na criação de um modelo de anotação capaz de identificar e extrair os elementos acima dos termos de audiência do acordo e disponibilizá-los posteriormente para consulta do juiz de carreira.

Para realizar esta atividade, aconselhamos que o participante utilize a ferramenta *Watson Knowledge Studio* (WKS) e a API *Natural Language Understanding* (NLU). Para isto, de acordo com a base de documentos (exemplos de processos de conciliação e mediação) fornecida, cada participante deve criar seu próprio modelo de anotação de entidades e relacionamentos. É de responsabilidade do participante anotar estas informações no *WKS*.

Uma vez criado o modelo, através da API Watson Knowledge Studio, ele deve ser exportado (via `Knowledge Studio`) e consumido pela API `Natural Language Understanding`. 

## 3. Avaliação

Os participantes terão que disponibilizar as credencias e o model id do seu `Natural Language Understanding`. O avaliador automático irá enviar documentos de processos jurídicos e espera receber um JSON com a lista de entidades identificados pela solução. A lista de resposta será validada com a lista de resultados já esperados.

É mandatório criar as entidades no `Knowledge Studio` com os seguintes nomes (e sguir):

- `Termo_acordo`
- `Tipo_processo`
- `Numero_processo`
- `Titulo`
- `Autor`
- `Reu`

## 4. Pré-requisitos

Você deverá cumprir os seguintes itens:

- Registrar na [Maratona Behind the Code](https://ibm.biz/maratona) e confirmar o e-mail de cadastro.
- Registrar na [IBM Cloud](https://ibm.biz/BdzsFc) e confirmar o e-mail de cadastro.

## 5. Treinamento do modelo

Veja o vídeo abaixo de como treinar o seu modelo de `Natural Language Understanding`, usando `Watson Knowledge Studio` (ou WKS).

<div align="center">
    <a href="https://youtu.be/f9KJ3F80H1Y">
        <img width="375" src="doc/source/images/Thumbnail.jpeg">
    </a>
</div>

* Crie uma instância de [Watson Knowledge Studio](https://cloud.ibm.com/catalog/services/knowledge-studio), em `Dallas` e acesse a plataforma, clicando no botão "Launch Watson Knowledge Studio".
* Descompacte e importe o seu [dataset](doc/source/dataset/dataset.zip) para o processo de `Annotation Task`.
* Faço o treinamento por anotação nos documentos.
* Exporte o modelo para `Natural Language Understanding`, e copie o `MODEL_ID`.

## 6. Instância do Natural Language Understanding

A API de `Natural Language Understanding` utilizará o `MODEL_ID` criado pelo `Knowledge Studio` para analisar os textos com base no modelo criado.

### 6.1. Credenciais do Natural Language Understanding

🚨 **SALVE AS CREDENCIAIS. VOCÊ IRÁ PRECISAR PARA SUBIR A APLICAÇÃO** 🚨

Para pegar o `IAM_APIKEY` (ou, em alguns casos, `API Key` apenas), acesse o https://cloud.ibm.com/resources e veja na lista de `Service`, você encontrará todos os serviços provisionados na sua conta (incluindo o Watson Assistant, Discovery, Watson Studio, Visual Recognition e Machine Learning. Todos os serviços dos desafios 1, 2, 3, 4 e 5).

<div align="center">
    <h2><b>Natural Language Understanding</b></h2>
    <h3><b>IAM_APIKEY na IBM Cloud</b></h3>
    <img width="750" src="doc/source/images/Natural%20Language%20Understanding%2001.png">
    <!-- <h3><b>MODEL_ID no Knowledge Studio</b></h3>
    <img width="750" src="doc/source/images/Knowledge%20Studio%2001.png"> -->
</div>

## 7. Aplicação na nuvem

Para subir a aplicação na IBM Cloud, você deve `clicar no botão` abaixo para subir usando o IBM Continuous Delivery (também conhecido como Delivery Pipeline). **Você deve subir a sua aplicação em Dallas**.

🚨 **CLIQUE PARA SUBIR A APLICAÇÃO NA IBM CLOUD** 🚨

[![Deploy to IBM Cloud](https://cloud.ibm.com/devops/setup/deploy/button.png)](https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/maratonadev/desafio-6)

### 7.1. Veja como configurar o IBM Continuous Delivery

1. Configure o `Toolchain Name` com `<maratona-id>-desafio6-behindthecode`, substituindo o `<maratona-id>` pelo seu ID da Maratona (Ex: 100001). Se você não souber, verifique no seu e-mail, usado no registro da Maratona, para pegar o seu ID.

2. Configure o `App name` com a mesmo valor usado no item 1.

3. Crie uma chave (de uso interno). Basta clicar em "Create" e depois clique em "Create" novamente. Espere um instante até carregar todas os dados. Se demorar muito (mais de 5 minutos), recarregue a página e faça novamente o passo 1 e 2. **Na parte superior, você pode deixar em Washington DC ou Dallas. Já na parte inferior (abaixo do item 2), é mandatório configurar a Região de Dallas**.

<div align="center">
    <img width="750" src="doc/source/images/Pipeline%2001.png">
</div>

### 7.2. Credenciais na aplicação

Clique em `Eclipse Orion Web IDE` para configurar a aplicação.

<div align="center">
    <img width="750" src="doc/source/images/Pipeline%2002.png">
</div>

Abaixo está o passo-a-passo, **obrigatório**, para configurar a sua aplicação no Eclipse Orion Web IDE.

1. Abra o arquivo `.env` para colocar as credenciais do `Natural Language Understanding` e da `Maratona` (lembre-se de que é o mesmo código usado para indicar novos participantes na Maratona). Preencha com os dados, após o `=` (símbolo de igual).

```
# Credenciais para o Desafio 6
DESAFIO=6
MARATONA_ID=

# Natural Language Understanding
IAM_APIKEY=
MODEL_ID=
```

<div align="center">
    <img width="750" src="doc/source/images/Pipeline%2003.png">
</div>

2. Abra o arquivo `manifest.yml` e altere o `<maratona-id>` com o seu ID da Maratona, o mesmo usado acima. Lembre-se: é mandatório ter a URL com o formato do `name`, apresentado abaixo.

```
applications:
- name: <seu-id>-desafio6-behindthecode
  memory: 256M
  instances: 1
  buildpack: sdk-for-nodejs
```

<div align="center">
    <img width="750" src="doc/source/images/Pipeline%2004.png">
</div>

Clique em `Create new launch configuration` e crie a configuração para a sua aplicação (que está sendo criada em *background*). `Launch Config Name`, `Application Name` e `Host` devem ter o mesmo nome, com o formato `<maratona-id>-desafio6-behindthecode`, igual nos itens anteriores. Clique em `SAVE` para salvar as configurações.

<div align="center">
    <img width="750" src="doc/source/images/Pipeline%2005.png">
    <img width="750" src="doc/source/images/Pipeline%2006.png">
</div>

Clique em `PLAY` (primeiro botão na imagem). Espere até ficar `verde` (com o status: `running`). Depois, clique em `Open` (terceiro botão na imagem). Vai abrir a sua aplicação, com as configurações implementadas.

<div align="center">
    <img width="375" src="doc/source/images/Pipeline%2007.png">
    <img width="375" src="doc/source/images/Pipeline%2008.png">
</div>

## 8. Submissão

🚨 **TESTE BASTANTE O SEU MODELO DE TREINAMENTO** 🚨

Mande vários textos para analisar, com base no seu treinamento. Faça quantos testes forem necessários e, se precisar, treine e re-treine o seu modelo para melhorar cada vez mais. Quando se sentir confortável, faça a submissão do seu desafio. Lembre-se: **NÃO é possível submeter mais de uma vez**. Fique atento!

Através da aplicação na IBM Cloud (`https://<maratona-id>-desafio6-behindthecode.mybluemix.net`), você irá clicar no botão **SUBMETER DESAFIO**, preencher com o seu CPF e enviar para a avaliação final.

FIQUEM LIGADOS NO [SITE DA MARATONA](ibm.biz/maratona) PARA ACOMPANHAR O RANKING GERAL E O RANKING DO DESAFIO! FIQUE NA TORCIDA PARA ESTAR ENTRE OS MELHORES!

## Material de apoio

- [O que é a IBM Cloud e como subir a sua primeira aplicação na nuvem](https://medium.com/ibmdeveloperbr/o-que-%C3%A9-a-ibm-cloud-e-como-subir-a-sua-primeira-aplica%C3%A7%C3%A3o-na-nuvem-41bfd260a2b7?source=friends_link&sk=7944d2fe14aa940e9bade68ce0731ba0)

## Troubleshooting

1. No `Logs` da aplicação, apresentou um erro (em vermelho). O que pode ser? 

    Resposta: **Veja se você colocou as credenciais da Maratona, Watson Assistant e Machine Learning no arquivo `.env` e se o arquivo `manifest.yml` está correto, conforme [descrito acima](#credenciais-na-aplicação). Veja se a sua aplicação está rodando na URL correta conforme [descrito acima](#submissão).**

## Dúvidas

Acesse o slack e mande a sua dúvida: [ibm.biz/convite-slack](https://ibm.biz/convite-slack).

## License

Copyright 2019 Maratona Behind the Code

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
