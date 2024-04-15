let carts = document.querySelectorAll('.cart');
let carrinho = document.querySelector('.offcanvas-body');
let list_qnt = [];

// Recuperar itens do carrinho do localStorage na inicialização
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
cartItems.forEach(item => {
    for (let i = 0; i < item.quantidade; i++) {
        carrinho.innerHTML += `
            <div class="cart-item">
                <p style="justify-self:start">${item.nome}</p>
                <p class="preco">${item.preco}</p>
                <button class="remove-item">&#10006;</button>
            </div>
        `;
        list_qnt.push(item.nome); // Adiciona o item ao contador
    }
});

// Atualizar o contador qnt com a quantidade atual de itens no carrinho
document.querySelector('.rounded-pill').innerHTML = list_qnt.length;

carts.forEach((cart, index) => {
    cart.addEventListener('click', () => {
        let produtos = document.querySelectorAll('.p-name');
        let preco = carts[index].children[0];
        const produtoNome = produtos[index].textContent;
        const produtoPreco = preco.textContent;

        const cartItem = {
            nome: produtoNome,
            preco: produtoPreco,
            quantidade: 1
        };

        updateLocalStorage(cartItem);
        // Adicionar o item ao carrinho
        carrinho.innerHTML += `
            <div class="cart-item">
                <p style="justify-self:start">${produtoNome}</p>
                <p class="preco">${produtoPreco}</p>
                <button class="remove-item">&#10006;</button>
            </div>
        `;
        list_qnt.push(produtoNome); // Adiciona o item ao contador
        document.querySelector('.rounded-pill').innerHTML = list_qnt.length;
    });
});

// Adicionar evento de clique para remover itens
carrinho.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const cartItemDiv = event.target.parentElement; // Obtém o pai "cart-item" div
        const produtoNome = cartItemDiv.querySelector('p').textContent; // Obtém o nome do produto

        removeFromLocalStorage(produtoNome);
        cartItemDiv.remove(); // Remove o elemento do carrinho
        list_qnt.splice(list_qnt.indexOf(produtoNome), 1); // Remove o item do contador
        document.querySelector('.rounded-pill').innerHTML = list_qnt.length;
    }
});

// Função para atualizar o localStorage com novos itens
function updateLocalStorage(cartItem) {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.nome === cartItem.nome);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantidade++;
    } else {
        cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Função para remover itens do localStorage
function removeFromLocalStorage(produtoNome) {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.nome === produtoNome);

    if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantidade > 1) {
            cartItems[itemIndex].quantidade--;
        } else {
            cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}
