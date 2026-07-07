// Elementos da Busca
const campoBusca = document.getElementById("campoBusca");
const produtos = document.querySelectorAll(".card");
const mensagemBusca = document.getElementById("mensagemBusca");

// Elementos do Alto Contraste
const btnContraste = document.getElementById("btnContraste");

// Elementos do Carrinho
const btnAbrirCarrinho = document.getElementById("btnAbrirCarrinho");
const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
const sidebarCarrinho = document.getElementById("sidebarCarrinho");
const overlayCarrinho = document.getElementById("overlayCarrinho");
const listaItensCarrinho = document.getElementById("listaItensCarrinho");
const totalCarrinhoElement = document.getElementById("totalCarrinho");
const contadorCarrinho = document.getElementById("contadorCarrinho");
const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

// Array que vai guardar os itens do carrinho
let carrinho = [];

// ==========================================
// LÓGICA DE BUSCA
// ==========================================
campoBusca.addEventListener("input", function () {
  const termoDigitado = campoBusca.value.toLowerCase().trim();
  let produtosEncontrados = 0;

  produtos.forEach(function (produto) {
    const nomeProduto = produto.dataset.nome.toLowerCase();
    const tituloProduto = produto.querySelector("h3").textContent.toLowerCase();

    if (nomeProduto.includes(termoDigitado) || tituloProduto.includes(termoDigitado)) {
      produto.style.display = "flex"; // Alterado para flex para não quebrar o layout do card
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

// ==========================================
// LÓGICA DE ALTO CONTRASTE
// ==========================================
btnContraste.addEventListener("click", function () {
  document.body.classList.toggle("contraste");

  if (document.body.classList.contains("contraste")) {
    btnContraste.textContent = "Contraste normal";
  } else {
    btnContraste.textContent = "🌓 Alto contraste";
  }
});

// ==========================================
// LÓGICA DO CARRINHO DE COMPRAS
// ==========================================

// Abrir e Fechar Sidebar
function alternarCarrinho() {
  sidebarCarrinho.classList.toggle("oculto");
  overlayCarrinho.classList.toggle("oculto");
}

btnAbrirCarrinho.addEventListener("click", alternarCarrinho);
btnFecharCarrinho.addEventListener("click", alternarCarrinho);
overlayCarrinho.addEventListener("click", alternarCarrinho);

// Adicionar produto ao array
botoesAdicionar.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const card = botao.parentElement;
    const nome = card.querySelector("h3").textContent;
    const preco = parseFloat(card.dataset.preco); // Pega o valor pelo atributo data-preco

    carrinho.push({ nome: nome, preco: preco });
    atualizarCarrinho();
    
    // Abre o carrinho automaticamente para mostrar que foi adicionado
    if(sidebarCarrinho.classList.contains("oculto")) {
      alternarCarrinho();
    }
  });
});

// Função para remover item
function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Atualizar interface do carrinho
function atualizarCarrinho() {
  listaItensCarrinho.innerHTML = ""; // Limpa a lista atual
  let total = 0;

  if (carrinho.length === 0) {
    listaItensCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
  } else {
    carrinho.forEach(function (item, index) {
      total += item.preco;

      const divItem = document.createElement("div");
      divItem.classList.add("item-carrinho");
      
      divItem.innerHTML = `
        <div>
          <h4>${item.nome}</h4>
          <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
        </div>
        <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
      `;
      
      listaItensCarrinho.appendChild(divItem);
    });
  }

  // Atualiza os contadores e o valor total
  contadorCarrinho.textContent = carrinho.length;
  totalCarrinhoElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}