let produtoId = null;
let depositoId = null;

function buscarProduto() {
  const codigo = document.getElementById("codigoBarras").value;

  fetch(`/buscar-produto?codigo=${codigo}`)
    .then(res => {
      if (!res.ok) throw new Error("Produto não encontrado");
      return res.json();
    })
    .then(data => {
      produtoId = data.id;
      depositoId = data.depositoId || 1;

      document.getElementById("nomeProduto").textContent = data.nome;
      document.getElementById("precoProduto").textContent = data.preco;
      document.getElementById("localizacaoProduto").textContent = data.localizacao || "Não informada";
      document.getElementById("estoqueProduto").textContent = data.estoque;

      document.getElementById("produtoInfo").style.display = "block";
    })
    .catch(err => {
      alert("Produto ou depósito inválido.");
      console.error(err);
    });
}

function atualizarLocalizacao() {
  const novaLocalizacao = document.getElementById("novaLocalizacao").value;

  if (!novaLocalizacao) {
    alert("Informe a nova localização.");
    return;
  }

  fetch("/atualizar-localizacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produtoId, depositoId, localizacao: novaLocalizacao })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar");
      alert("Localização atualizada com sucesso!");
      document.getElementById("localizacaoProduto").textContent = novaLocalizacao;
    })
    .catch(err => {
      alert("Erro ao atualizar localização.");
      console.error(err);
    });
}
