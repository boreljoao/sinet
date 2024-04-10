let carts = document.querySelectorAll('.cart');
let list_qnt = [];
const carrinho = document.querySelector('.offcanvas-body');

// Retrieve saved cart items from localStorage on page load
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Update carrinho element based on saved items (optional)
cartItems.forEach(item => {
  carrinho.innerHTML += `
    <div class="cart-item">
      <p style="justify-self:start">${item.nome}</p>
      <p class="preco">${item.preco}</p>
      <button class="remove-item">&#10006;</button>
    </div>
  `;
});

carts.forEach((cart, index) => {
  cart.addEventListener('click', () => {
    let produtos = document.querySelectorAll('.p-name');
    let preco = carts[index].children[0];
    let qnt = document.querySelector('.rounded-pill')
    list_qnt.push(produtos[index].getAttribute('key'))
                console.log(qnt.textContent)
                qnt.innerHTML = list_qnt.length
    const produtoNome = produtos[index].textContent;
    const produtoPreco = preco.textContent;
    // Efficient quantity tracking
    const cartItem = {
      nome: produtoNome,
      preco: produtoPreco,
      quantidade: 1 // Default quantity to 1
    };

    updateLocalStorage(cartItem);

    // Update carrinho dynamically (optional)
    carrinho.innerHTML += `
      <div class="cart-item">
        <p style="justify-self:start">${produtoNome}</p>
        <p class="preco">${produtoPreco}</p>
        <button class="remove-item">&#10006;</button></div>
    `;
    qnt.innerHTML = `${list_qnt.length}`
  });
});

// Helper function to manage localStorage operations
function updateLocalStorage(cartItem) {
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get existing cart (avoids overwriting saved data)

  const existingItemIndex = cartItems.findIndex(item => item.nome === cartItem.nome);


  if (existingItemIndex !== -1) {
    // Update quantity of existing item
    cartItems[existingItemIndex].quantidade++;
  } else {
    // Add new item to cart
    cartItems.push(cartItem);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add event listener for remove buttons (assuming unique class)
carrinho.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    const cartItemDiv = event.target.parentElement; // Get the parent "cart-item" div
    const produtoNome = cartItemDiv.querySelector('p').textContent; // Get product name

    removeFromLocalStorage(produtoNome);
    cartItemDiv.remove(); // Remove the cart item element from DOM
    
  }
});

// Helper function to remove item from localStorage
function removeFromLocalStorage(produtoNome) {
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const itemIndex = cartItems.findIndex(item => item.nome === produtoNome);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1); // Remove the item from the array
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}




