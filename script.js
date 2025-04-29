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

    // Formatar o preço
    const precoFormatado = produto.preco
      ? parseFloat(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : "Não informado";
    document.getElementById("preco-produto").innerText = precoFormatado;

    // Localização, unidade e estoque
    document.getElementById("info-produto").style.display = "block";
    document.getElementById("nome-produto").innerText = produto.nome;
    document.getElementById("preco-produto").innerText = `R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}`;
    document.getElementById("localizacao-atual").innerText = 
      produto.depositos && produto.depositos.length > 0 && produto.depositos[0].localizacao
        ? produto.depositos[0].localizacao
        : "Não informada";
    document.getElementById("estoque-produto").innerText = 
      produto.depositos && produto.depositos.length > 0
        ? produto.depositos[0].quantidade
        : produto.estoque || 0;
    document.getElementById("unidade-produto").innerText = produto.unidade || "N/A";

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
      body: JSON.stringify({ produtoId, localizacao }),
    });

    const dados = await resposta.json();
    document.getElementById("mensagem").innerText = dados.mensagem;

  } catch (erro) {
    console.error(erro);
    alert("Erro ao atualizar localização!");
  }
});
