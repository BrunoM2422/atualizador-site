const apiBaseUrl = "https://location-updater.onrender.com";

const formBuscar = document.getElementById("form-buscar");
const formAtualizar = document.getElementById("form-atualizar");

let produtoId = null;

formBuscar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const sku = document.getElementById("sku").value;

  try {
    const resposta = await fetch(`${apiBaseUrl}/buscar-produto/${sku}`);
    const dados = await resposta.json();

    const produto = dados.retorno.produto;

    document.getElementById("info-produto").style.display = "block";
    document.getElementById("nome-produto").innerText = produto.nome;

    const precoFormatado = parseFloat(produto.preco || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    document.getElementById("preco-produto").innerText = precoFormatado;

    // LOCALIZAÇÃO DIRETA
    document.getElementById("localizacao-atual").innerText = dados.localizacao || "Não informada";


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
      body: JSON.stringify({ produtoId, localizacao }),
    });

    const dados = await resposta.json();
    document.getElementById("mensagem").innerText = dados.mensagem;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao atualizar localização!");
  }
});
