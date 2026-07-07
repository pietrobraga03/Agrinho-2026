document.addEventListener("DOMContentLoaded", function () {

  const linksAba = document.querySelectorAll(".link-aba");
  const viewsAba = document.querySelectorAll(".view-aba");
  
  const campoBusca = document.getElementById("campoBusca");
  const produtos = document.querySelectorAll(".card");
  const mensagemBusca = document.getElementById("mensagemBusca");
  
  const btnContraste = document.getElementById("btnContraste");
  
  const btnAbrirCarrinho = document.getElementById("btnAbrirCarrinho");
  const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
  const sidebarCarrinho = document.getElementById("sidebarCarrinho");
  const overlayCarrinho = document.getElementById("overlayCarrinho");
  const listaItensCarrinho = document.getElementById("listaItensCarrinho");
  const totalCarrinhoElement = document.getElementById("totalCarrinho");
  const contadorCarrinho = document.getElementById("contadorCarrinho");
  const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

  let carrinho = [];

  linksAba.forEach(function (link) {
    link.addEventListener("click", function (evento) {
      evento.preventDefault(); 

      const abaAlvo = link.getAttribute("data-aba");

      viewsAba.forEach(function (view) {
        if (view.id === `view-${abaAlvo}`) {
          view.classList.remove("oculto-aba");
        } else {
          view.classList.add("oculto-aba");
        }
      });

      linksAba.forEach(l => l.classList.remove("aba-ativa"));
      link.classList.add("aba-ativa");
    });
  });

  if (campoBusca) {
    campoBusca.addEventListener("input", function () {
      const termoDigitado = campoBusca.value.toLowerCase().trim();
      let produtosEncontrados = 0;

      produtos.forEach(function (produto) {
        const nomeProduto = produto.dataset.nome.toLowerCase();
        const tituloProduto = produto.querySelector("h3").textContent.toLowerCase();

        if (nomeProduto.includes(termoDigitado) || tituloProduto.includes(termoDigitado)) {
          produto.style.display = "flex";
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
  }

  if (btnContraste) {
    btnContraste.addEventListener("click", function () {
      document.body.classList.toggle("contraste");

      if (document.body.classList.contains("contraste")) {
        btnContraste.textContent = "Contraste normal";
      } else {
        btnContraste.textContent = "🌓 Alto contraste";
      }
    });
  }

  function alternarCarrinho() {
    sidebarCarrinho.classList.toggle("oculto");
    overlayCarrinho.classList.toggle("oculto");
  }

  if (btnAbrirCarrinho) btnAbrirCarrinho.addEventListener("click", alternarCarrinho);
  if (btnFecharCarrinho) btnFecharCarrinho.addEventListener("click", alternarCarrinho);
  if (overlayCarrinho) overlayCarrinho.addEventListener("click", alternarCarrinho);

  botoesAdicionar.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const card = botao.parentElement;
      const nome = card.querySelector("h3").textContent;
      const preco = parseFloat(card.dataset.preco);

      carrinho.push({ nome: nome, preco: preco });
      atualizarCarrinho();
      
      if(sidebarCarrinho.classList.contains("oculto")) {
        alternarCarrinho();
      }
    });
  });

  function atualizarCarrinho() {
    listaItensCarrinho.innerHTML = "";
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
          <button class="btn-remover" data-index="${index}">Remover</button>
        `;
        
        listaItensCarrinho.appendChild(divItem);
      });
    }

    contadorCarrinho.textContent = carrinho.length;
    totalCarrinhoElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  // 8. Remover Produtos do Carrinho (Método dinâmico e seguro)
  if (listaItensCarrinho) {
    listaItensCarrinho.addEventListener("click", function (evento) {
      if (evento.target.classList.contains("btn-remover")) {
        const index = parseInt(evento.target.getAttribute("data-index"));
        carrinho.splice(index, 1);
        atualizarCarrinho();
      }
    });
  }
});