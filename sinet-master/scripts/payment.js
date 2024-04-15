function finishPurchase() {
    alert('Thank you for your purchase!');
    clearCart(); // Limpar o carrinho após a compra
    window.location.href = "/index.html"; // Redirecionar para a página inicial
}

function stillPurchase() {
    window.location.href = "/index.html"; // Redirecionar para a página de login
}

// Função para atualizar o carrinho na outra página
function displayatc() {
    let list_qnt = []
    let carrinhocheio = 0;
    let totalcarrinho = document.querySelector('.total2 p');
    let carrinho2 = document.querySelector('#total-section');
    let carrinhoOutraPag = JSON.parse(localStorage.getItem('cartItems')) || []; // Adicionei uma verificação para garantir que carrinhoOutraPag seja uma matriz
    carrinhoOutraPag.forEach(item => {
        carrinho2.innerHTML += `
            <div style="display: flex; gap:10px; border-bottom: 1px solid black; font-weight: bold; align-items: center;" class="cart-item">
                <p style="justify-self:start">${item.nome}</p>
                <p class="preco">${item.preco}</p>
                <p style="background-color: blue; padding: 2.5px; border-radius: 30%; color: #fff"> ${item.quantidade}</p>
            </div>
        `;
        let pricereal = item.preco.replace(/\D/g, "");
        carrinhocheio += (Number(pricereal) * item.quantidade)
    });
    totalcarrinho.innerHTML = `${carrinhocheio}`;
}

// Adicionar evento de carregamento da página
window.addEventListener('DOMContentLoaded', function() {
    displayatc(); // Chamar a função para exibir o carrinho
});


function clearCart(){
    localStorage.removeItem('cartItems');
    // Limpar o carrinho na interface do usuário
    document.querySelector('#total-section').innerHTML = ""; // Limpar os itens do carrinho
    document.querySelector('.total2 p').innerHTML = "0"; // Zerar o total do carrinho
}
