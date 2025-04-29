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
    const produto = dados.retorno.produto;

    document.getElementById("info-produto").style.display = "block";
    document.getElementById("nome-produto").innerText = produto.nome;
    document.getElementById("preco-produto").innerText = produto.preco || "N/A";
    document.getElementById("localizacao-atual").innerText = produto.localizacao || "Não informada";

    // Mostrar imagem, se houver
    const imagemEl = document.getElementById("imagem-produto");
    if (produto.imagem) {
      imagemEl.src = produto.imagem;
      imagemEl.style.display = "block";
    } else {
      imagemEl.style.display = "none";
    }

    produtoId = produto.id;

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
