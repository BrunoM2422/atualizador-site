const apiBaseUrl = "https://location-updater.onrender.com"; // ou sua URL backend

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

    document.getElementById("novo-preco").value = produto.preco;

    produtoId = produto.id;
  } catch (erro) {
    console.error(erro);
    alert("Erro ao buscar produto!");
  }
});

formAtualizar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const preco = parseFloat(document.getElementById("novo-preco").value);

  if (!produtoId || isNaN(preco)) {
    alert("Preencha os campos corretamente!");
    return;
  }

  try {
    const resposta = await fetch(`${apiBaseUrl}/atualizar-preco`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ produtoId, preco }),
    });

    const dados = await resposta.json();
    document.getElementById("mensagem").innerText = dados.mensagem;

    // Atualiza exibição
    document.getElementById("preco-produto").innerText = preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  } catch (erro) {
    console.error(erro);
    alert("Erro ao atualizar o preço!");
  }
});
