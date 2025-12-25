# 🏦 Sistema Bancário Pokémon (Node.js)

Mini sistema bancário em Node.js que usa um arquivo `pokemon.json` como base para criar contas de Pokémon, fazer depósitos, saques e transferências via menu no terminal.

A ideia é transformar cada Pokémon em um “cliente” do banco, com conta, saldo e operações básicas, usando JavaScript moderno e o módulo `readline` para interação no console.

---

## ⚙️ Tecnologias usadas

- Node.js (JavaScript)
- Módulo nativo `readline` para menu no terminal
- Arquivo `pokemon.json` como “banco de dados” local

---

## 💳 Regras do Banco Pokémon

- Cada conta é criada a partir de um índice do `pokemon.json`.
- Cada conta possui:
  - `id`
  - `name` (nome do Pokémon)
  - `type` (tipo principal do Pokémon)
  - `balance` (saldo atual)
- Operações disponíveis:
  - Criar conta
  - Listar contas
  - Depositar
  - Sacar
  - Transferir entre contas

---

## 🚀 Como rodar o projeto

1. Clonar o repositório:

- git clone https://github.com/vicbaltazar/sistema-bancario-pokemon.git
- cd sistema-bancario-pokemon

2. Garantir que você tem o Node instalado (versão 18+ recomendada).
3. Rodar o sistema no terminal:

- node banco_pokemon.js

4. Usar o menu interativo:

- `1` – Criar conta para um Pokémon  
- `2` – Listar contas  
- `3` – Depositar  
- `4` – Sacar  
- `5` – Transferir  
- `0` – Sair  

Ao criar uma conta, informe o **índice** do Pokémon no array do `pokemon.json` e o saldo inicial.  
Depois use o `ID` da conta para fazer depósitos, saques e transferências.

---

## 🔮 Possíveis melhorias

- Salvar as contas em arquivo JSON para ter “persistência” entre execuções.
- Criar testes automatizados simples das funções (criar, depositar, sacar, transferir).
- Transformar o sistema em uma API REST (Express) ou em uma interface web.
- Adicionar limites especiais por tipo de Pokémon (ex: bônus para tipo Electric, limites para tipo Ghost etc.).

---

Projeto criado para estudar lógica de programação, manipulação de JSON e aplicações de console em Node.js com um tema divertido de Pokémon. 🐱‍👤
