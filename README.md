# Projeto II - Portal de Notícias

> [!NOTE]
> Os slides com as instruções se encontram [aqui](https://docs.google.com/presentation/d/1FIMOV3l736C8Nn04QF6WZuTzyCwjIde6s6Z51z2nigs/edit?usp=sharing)

O objetivo do trabalho é desenvolver um portal de notícias sobre um tema de interesse do grupo. O trabalho será desenvolvido em pelo menos três etapas com avaliações e metas distintas.

## Instruções Gerais

- Grupos de até 5 participantes

## Primeira Parte (Prazo 27/05)

O objetivo da primeira parte é desenvolver o portal de notícias baseado no tema e nas referências escolhidas.

### Checklist

- [ ] Criar os grupos, aceitar o "assigment" e gerar os repositórios a partir do modelo;
- [ ] Abrir uma issue com as referências
- [ ] Clonar e repositório e rodar o código básico
- [ ] A cada aula abrir um novo Pull Request com o progresso até então
- [ ] Ao final do desenvolvimento, apresentar o resultado e explicar o projeto da interface, decisões de organização de código, etc

## Segunda Parte (Prazo 10/06)

Na segunda parte vamos trabalhar no sistema de gerenciamento de conteúdo do projeto. O nome comum para essa parte do site é CMS (Content Management System), onde administradores podem criar, editar e remover o conteúdo do site que os usuários vão interagir. O código básico já se encontra em um projeto dentro de `/cms` do repositório.

Ainda não iremos trabalhar com a parte de salvar os dados, só com a interface desse componente. O objetivo é trabalhar com os fundamentos de uma boa interface gráfica: organização, usabilidade, feedback, etc.

Para ser considerado completo, ao final do projeto o CMS deve ter as seguintes funcionalidades e características:

- [ ] 2 CRUDs (Create, Read, Update, Delete) de conteúdo, de acordo com o tema do trabalho. Para o "Read" é necessário desenvolver uma tabela de listagem.
- [ ] Dashboard personalizado de acordo com o tema
- [ ] Interface responsiva
- [ ] Feedback visual para o usuário (ex: animações, mensagens de erro, etc)
- [ ] Básico de acessibilidade (ex: tabindex, aria-label, etc)

## Terceira Parte (Prazo 26/06 antes da aula)

> [!NOTE]
> O [código de exemplo](https://github.com/vinicius-schettino/react-crud-example) trabalhado em sala será de grande utilidade para a realização dessa parte do projeto. Ele foi baseado [neste tutorial](https://youtu.be/9OfL9H6AmhQ) e contem diversas mudanças e adições para se adequar ao objetivo pedagógico da atividade, mas pode ser útil se alguém quiser uma referência mais passo a passo.

Na terceira e última parte do projeto vamos trabalhar na integração do CMS com o portal de notícias. O objetivo é que o conteúdo criado no CMS seja exibido no portal de notícias. Vamos adicioanar uma camada de dados na aplicação, permitindo que o conteúdo seja armazenado numa API REST utilizando o formato JSON.

### json-server

Para simular o backend da aplicação, vamos utilizar o [`json-server`](https://www.npmjs.com/package/json-server). Para instalar, basta rodar o comando:

```bash
npm install -g json-server
npx json-server db.json
```

### Outras dependências

Para ajudar na parte de validação de formulário, vamos precisar de adicionar algumas dependências no código:

```bash
npm install react-hook-form react-hook-form-mui
```

### Checklist

- Código todo pronto e na main até dia 26/06 antes da aula.
- Chamar o professor pelo menos uma vez para validar se está tudo certo e o escopo é suficiente

### Referências

- [Material UI](https://mui.com/material-ui/all-components/)
- [Material Design](https://m3.material.io/)
- [Acessibilidade](https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility/HTML)
- [React Hook Form](https://react-hook-form.com/) [[GitHub](https://github.com/react-hook-form/react-hook-form)]
- [React Hook Form MUI](https://github.com/dohomi/react-hook-form-mui)
- [React Hook Form + Material UI (integração oficial)](https://react-hook-form.com/get-started#MaterialUI)
- [json-server](https://www.npmjs.com/package/json-server)
