const apiBaseUrl = "https://location-updater.onrender.com";

const formBuscar = document.getElementById("form-buscar");
const formAtualizar = document.getElementById("form-atualizar");

let produtoId = null;
let depositoId = null;

formBuscar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const sku = document.getElementById("sku").value;

  try {
    const resposta = await fetch(`${apiBaseUrl}/buscar-produto/${sku}`);
    const dados = await resposta.json();
    const produto = dados.retorno.produto;

    document.getElementById("info-produto").style.display = "block";
    document.getElementById("nome-produto").innerText = produto.nome;
    document.getElementById("preco-produto").innerText = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;
    document.getElementById("localizacao-atual").innerText = produto.localizacao;
    document.getElementById("estoque-produto").innerText = produto.estoque;
    document.getElementById("unidade-produto").innerText = produto.unidade || "N/A";

    const imagemEl = document.getElementById("imagem-produto");
    if (produto.imagem) {
      imagemEl.src = produto.imagem;
      imagemEl.style.display = "block";
    } else {
      imagemEl.style.display = "none";
    }

    produtoId = produto.id;
    depositoId = produto.depositoId;

  } catch (erro) {
    console.error(erro);
    alert("Erro ao buscar produto!");
  }
});

formAtualizar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const localizacao = document.getElementById("localizacao").value;

  if (!produtoId) {
    alert("Produto inválido.");
    return;
  }
  

  try {
    const resposta = await fetch(`${apiBaseUrl}/atualizar-localizacao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoId, localizacao, depositoId }),
    });

    const dados = await resposta.json();
    document.getElementById("mensagem").innerText = dados.mensagem;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao atualizar localização!");
  }
});
