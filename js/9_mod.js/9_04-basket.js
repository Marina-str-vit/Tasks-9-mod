const totalPrice = document.querySelector(".js-total-price");
const clear = document.querySelector(".js-clear"); // для очищення корзини
const container = document.querySelector(".js-list");

const PRODUCT_LS = "basket";
const products = JSON.parse(localStorage.getItem(PRODUCT_LS)) || []; // отримаємо данні з локал.сховща, а якщо їх не має, то буде порожній масив - це правильно і "красиво"
let totalCost; // загальна вартість продуктів totalPrice


if(products.length) {
    clear.hidden = false; // чи є в корзині продукти, якщо є то властивість hidden прибираємо
    totalCost = products.reduce((acc, { qty, price }) => acc += qty * price, 0); // суьуємо вартість вибраних продуктів
}                                // { qty, price } властивості з обєкта

// заповнюю поле загальна вартість вибраних товарів
totalPrice.textContent = totalCost ? `Загальна ціна ${totalCost} грн` : `Ваша корзина порожня`;
container.insertAdjacentHTML("beforeend", createMarkup(products)); // прив'язую картки до сторінки
clear.addEventListener("click", handleClick); // очищаємо форму


function handleClick() {
    localStorage.removeItem(PRODUCT_LS); // видаляємо ключ з локал.сховища
    window.location.href = "./03-shop.html"; // коли корзину очистили, то автоматично буду переходити на головну сторінку
}

// відмалюю всі обрані товари на сторінці
function createMarkup(arr) {
    return arr.map(({ img, name, qty, price }) => `
        <li class="cart-item product-card">
            <img src="${img}" alt="${name}" class="product-img"/>
            <h2>${name}</h2>
            <p>Quantity: ${qty}</p>
            <p>Total price: ${qty * price} грн</p>
        </li>
    `).join("")
}

// якщо хочу видалити лише один з продуктів, то потрібно додати id і прописати функцію.
