const apiBaseUrl = "https://location-updater.onrender.com"; // Seu servidor no Render

const formBuscar = document.getElementById("form-buscar");
const formAtualizar = document.getElementById("form-atualizar");

let produtoId = null; // <-- Variável para guardar o ID do produto

formBuscar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const sku = document.getElementById("sku").value;

  try {
    const resposta = await fetch(`${apiBaseUrl}/buscar-produto/${sku}`);
    const dados = await resposta.json();

    document.getElementById("preco-produto").innerText = parseFloat(dados.retorno.produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
document.getElementById("imagem-produto").src = dados.retorno.produto.imagem || "";
document.getElementById("imagem-produto").alt = dados.retorno.produto.nome;

    produtoId = dados.retorno.produto.id; // <-- Aqui você guarda o ID do produto
  } catch (erro) {
    console.error(erro);
    alert("Erro ao buscar produto!");
  }
});

formAtualizar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const localizacao = document.getElementById("localizacao").value;

  if (!produtoId) {
    alert("Nenhum produto selecionado!");
    return;
  }

  try {
    const resposta = await fetch(`${apiBaseUrl}/atualizar-localizacao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ produtoId, localizacao }), // 🚀 Corrigido aqui!
    });

    const dados = await resposta.json();

    document.getElementById("mensagem").innerText = dados.mensagem;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao atualizar localização!");
  }
});