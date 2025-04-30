let produtoAtual = null;

async function buscarProduto() {
  const sku = document.getElementById("sku").value.trim();
  if (!sku) return alert("Digite um SKU.");

  try {
    const response = await fetch(`http://localhost:3000/buscar-produto/${sku}`);
    const data = await response.json();

    if (!response.ok || !data.retorno) {
      throw new Error(data.mensagem || "Erro ao buscar produto");
    }

    const produto = data.retorno.produto;
    produtoAtual = produto;

    document.getElementById("nomeProduto").textContent = produto.nome;
    document.getElementById("precoProduto").textContent = produto.preco;
    document.getElementById("estoqueProduto").textContent = produto.estoque;
    document.getElementById("localizacaoAtual").textContent = produto.localizacao || "Não informada";
    document.getElementById("imagemProduto").src = produto.imagem || "https://via.placeholder.com/100";

    document.getElementById("resultado").classList.remove("hidden");

  } catch (error) {
    alert(error.message || "Erro ao buscar produto.");
    document.getElementById("resultado").classList.add("hidden");
  }
}

async function atualizarLocalizacao() {
  const novaLocalizacao = document.getElementById("novaLocalizacao").value.trim();

  if (!produtoAtual || !novaLocalizacao) {
    return alert("Preencha a nova localização.");
  }

  try {
    const resposta = await fetch("http://localhost:3000/atualizar-localizacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        produtoId: produtoAtual.id,
        localizacao: novaLocalizacao
      }),
    });

    const data = await resposta.json();

    if (!resposta.ok) throw new Error(data.mensagem || "Erro ao atualizar.");

    alert("Localização atualizada com sucesso!");

    document.getElementById("localizacaoAtual").textContent = novaLocalizacao;
    document.getElementById("novaLocalizacao").value = "";

  } catch (error) {
    alert(error.message || "Erro ao atualizar localização.");
  }
}
