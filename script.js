// Масив для зберігання товарів у кошику
let cartItems = [];

// Функція для додавання товару до кошика
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', function () {
    const name = this.getAttribute('data-name');
    const price = parseInt(this.getAttribute('data-price'));

    // Перевірка, чи товар вже є у кошику
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }

    // Збереження кошика у localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert(`${name} додано до кошика!`);
  });
});

// Функція для відображення кошика
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Очищаємо попередній вміст кошика
  cartItemsDiv.innerHTML = '';

  // Якщо кошик порожній
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<p>У вашому кошику поки що немає товарів.</p>';
    cartTotalSpan.textContent = '0 грн';
    checkoutBtn.disabled = true;
    return;
  }

  // Розрахунок загальної суми
  let total = 0;

  // Відображення кожного товару у кошику
  cartItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>Кількість: ${item.quantity}, Ціна: ${item.price} грн</p>
      <button class="remove-btn" data-name="${item.name}">Видалити</button>
    `;
    cartItemsDiv.appendChild(div);

    // Обробник видалення товару
    div.querySelector('.remove-btn').addEventListener('click', () => {
      removeFromCart(item.name);
    });

    // Додавання ціни до загальної суми
    total += item.price * item.quantity;
  });

  // Встановлення загальної суми
  cartTotalSpan.textContent = `${total} грн`;

  // Активування кнопки оформлення замовлення
  checkoutBtn.disabled = cartItems.length === 0;
}

// Функція для видалення товару з кошика
function removeFromCart(name) {
  cartItems = cartItems.filter(item => item.name !== name);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
}

// Завантаження даних кошика при завантаженні сторінки
window.onload = function () {
  if (localStorage.getItem('cartItems')) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
  }
  if (document.getElementById('cart-items')) {
    updateCart();
  }
};
