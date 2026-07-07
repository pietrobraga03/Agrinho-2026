const campoBusca = document.getElementById("campoBusca");
const produtos = document.querySelectorAll(".card");
const mensagemBusca = document.getElementById("mensagemBusca");
const btnContraste = document.getElementById("btnContraste");

campoBusca.addEventListener("input", function () {
  const termoDigitado = campoBusca.value.toLowerCase().trim();
  let produtosEncontrados = 0;

  produtos.forEach(function (produto) {
    const nomeProduto = produto.dataset.nome.toLowerCase();
    const tituloProduto = produto.querySelector("h3").textContent.toLowerCase();

    if (
      nomeProduto.includes(termoDigitado) ||
      tituloProduto.includes(termoDigitado)
    ) {
      produto.style.display = "block";
      produtosEncontrados++;
    } else {
      produto.style.display = "none";
    }
  });

  if (produtosEncontrados === 0) {
    mensagemBusca.textContent = "Nenhum produto encontrado. Tente buscar por outro termo.";
  } else {
    mensagemBusca.textContent = "";
  }
});

btnContraste.addEventListener("click", function () {
  document.body.classList.toggle("contraste");

  if (document.body.classList.contains("contraste")) {
    btnContraste.textContent = "Contraste normal";
  } else {
    btnContraste.textContent = "Alto contraste";
  }
});

const botoesCarrinho = document.querySelectorAll(".card button");

botoesCarrinho.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const produto = botao.parentElement.querySelector("h3").textContent;
    alert(Produto adicionado ao carrinho: ${produto});
  });
});