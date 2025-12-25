// Sistema Bancário usando pokemon.json como base

const pokemons = require('./pokemon.json');
const readline = require('readline');

// ===== MODELO =====

let contas = []; // onde as contas ficam

function criarConta(indexPokemon, saldoInicial = 0) {
    const pokemon = pokemons[indexPokemon];

    if (!pokemon) {
        console.log('\n❌ Pokémon não encontrado nesse índice.\n');
        return null;
    }

    const conta = {
        id: contas.length + 1,
        name: pokemon.name,
        type: pokemon.type[0],
        balance: saldoInicial
    };

    contas.push(conta);

    console.log(
        `\n✅ Conta criada para ${conta.name} (Tipo: ${conta.type}) com saldo inicial de ${conta.balance}.\n`
    );
    return conta;
}

function encontrarContaPorId(id) {
    return contas.find((c) => c.id === id);
}

function listarContas() {
    if (contas.length === 0) {
        console.log('\nNenhuma conta criada ainda.\n');
        return;
    }

    console.log('\n=== Contas cadastradas ===\n');
    contas.forEach((c) => {
        console.log(
            `ID: ${c.id} | Nome: ${c.name} | Tipo: ${c.type} | Saldo: ${c.balance}`
        );
    });
    console.log('==========================\n');
}

function depositar(id, valor) {
    const conta = encontrarContaPorId(id);
    if (!conta) return console.log('\n❌ Conta não encontrada.\n');
    if (valor <= 0) return console.log('\n❌ Valor inválido.\n');

    conta.balance += valor;
    console.log(
        `\n💰 Depósito de ${valor} para ${conta.name}. Saldo atual: ${conta.balance}\n`
    );
}

function sacar(id, valor) {
  const conta = encontrarContaPorId(id);
  if (!conta) return console.log('\n❌ Conta não encontrada.\n');
  if (valor <= 0) return console.log('\n❌ Valor inválido.\n');
  if (valor > conta.balance) return console.log('\n❌ Saldo insuficiente.\n');

  conta.balance -= valor;
  console.log(
    `\n🏧 Saque de ${valor} da conta de ${conta.name}. Saldo atual: ${conta.balance}\n`
  );
}

function transferir(idOrigem, idDestino, valor) {
    const origem = encontrarContaPorId(idOrigem);
    const destino = encontrarContaPorId(idDestino);

    if (!origem || !destino) {
        return console.log('\n❌ conta de origem ou destino não encontrada.\n');
    }
    if (valor <= 0) return console.log('\n❌ Valor inválido.\n');
    if (valor > origem.balance)
        return console.log('\n❌ Saldo insuficiente para transferência.\n');

    origem.balance -= valor;
    destino.balance += valor;

    console.log(
        `\n🔁 Transferência de ${valor} de ${origem.name} para ${destino.name}.`
    );
    console.log(
        `Saldo ${origem.name}: ${origem.balance} | Saldo ${destino.name}: ${destino.balance}\n`
    );
}

// ====== Interface de texto ======

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
  console.log('===============================');
  console.log('🏦 Banco Pokémon da Vitória');
  console.log('1 - Criar conta para um Pokémon');
  console.log('2 - Listar contas');
  console.log('3 - Depositar');
  console.log('4 - Sacar');
  console.log('5 - Transferir');
  console.log('0 - Sair');
  console.log('===============================\n');
}

function perguntar(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}

async function loop() {
    let opcao = '';

    while (opcao !== '0') {
        mostrarMenu();
        opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {
            case '1': {
                console.log('\n=== Criar conta ===');
                console.log('Exemplo: Venusaur está no Índice 2, Pikachu em outro etc.\n');
                const indexStr = await perguntar(
          'Digite o índice do Pokémon no array (número): '
        );
        const saldoStr = await perguntar(
          'Saldo inicial da conta (número, ex: 1000): '
        );

        const indexPokemon = Number(indexStr);
        const saldoInicial = Number(saldoStr);

        if (Number.isNaN(indexPokemon) || Number.isNaN(saldoInicial)) {
          console.log('\n❌ Valores inválidos.\n');
        } else {
          criarConta(indexPokemon, saldoInicial);
        }
        break;
      }

      case '2':
        listarContas();
        break;

      case '3': {
        console.log('\n=== Depósito ===');
        const idStr = await perguntar('ID da conta: ');
        const valorStr = await perguntar('Valor do depósito: ');
        depositar(Number(idStr), Number(valorStr));
        break;
      }

      case '4': {
        console.log('\n=== Saque ===');
        const idStr = await perguntar('ID da conta: ');
        const valorStr = await perguntar('Valor do saque: ');
        sacar(Number(idStr), Number(valorStr));
        break;
      }

      case '5': {
        console.log('\n=== Transferência ===');
        const idOrigemStr = await perguntar('ID da conta de origem: ');
        const idDestinoStr = await perguntar('ID da conta de destino: ');
        const valorStr = await perguntar('Valor da transferência: ');
        transferir(
          Number(idOrigemStr),
          Number(idDestinoStr),
          Number(valorStr)
        );
        break;
      }

      case '0':
        console.log('\nSaindo do Banco Pokémon... Até a próxima batalha!\n');
        break;

      default:
        console.log('\n❌ Opção inválida.\n');
            
        }
    }

    rl.close();
}

// inicia
loop();