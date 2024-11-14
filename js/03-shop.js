const instruments = [
  {
      id: 1,
      img: "https://static.dnipro-m.ua/cache/products/7056/catalog_origin_218728.jpg",
      name: "Шуруповерт",
      price: 150,
      description: "Мережевий дриль-шуруповерт TD-30 — надійний помічник для робіт по дому та в невеликій майстерні, якщо необхідно виконувати роботу переважно з закручування кріпильних елементів. Муфта регулювання крутного моменту робить інструмент універсальним вибором як для свердління, так і для роботи з кріпленнями."
  },
  {
      id: 3,
      img: "https://static.dnipro-m.ua/cache/products/992/catalog_origin_322784.jpg",
      name: "Шліфмашина",
      price : 1299,
      description: "Кутова шліфувальна машина Dnipro-M GS-98 – модель, яка поєднує в собі оптимальне співвідношення потужності, ваги та мобільності. Конструкція шліфмашини сприяє зручній та надійній роботі, навіть однією рукою. Інструмент ідеально підходить для виконання різу на висоті та використання у важкодоступних місцях. Низький рівень шуму та вібрації, двопозиційне розташування додаткової рукоятки під кутом 100 градусів, мінімізує втому під час шліфування."
  },
  {
      id: 4,
      img: "https://static.dnipro-m.ua/cache/products/5596/catalog_origin_191105.jpg",
      name: "Пила",
      price: 11049,
      description: "Мобільна акумуляторна ланцюгова пила DCS-200BC DUAL призначена для обрізання зайвих гілок, спилювання дерев та чагарника, заготівлі дров, покрою будматеріалів та демонтажних робіт. Її просто використовувати у будь-яких місцях: на висоті, на виїзних роботах, у лісі або саду. При цьому Вам не потрібно буде турбуватися про підключення до мережі."
  },
  {
      id: 5,
      img: "https://static.dnipro-m.ua/cache/products/2023/catalog_origin_323420.jpg",
      name: "Рівень",
      price: 897,
      description: "Рівень серії ProVision виробництва DNIPRO-M має не тільки високу точність вимірювань і чудові захисні властивості, а й надає максимальний комфорт користувачеві в процесі експлуатації."
  },
  {
      id: 6,
      img: "https://static.dnipro-m.ua/cache/products/9500/catalog_origin_470179.jpg",
      name: "Тример",
      price: 3699,
      description: "Тример електричний Dnipro-M 110 призначений для покосу густої трави, а також кущів з діаметром стовбура до 10 мм."
  },
  {
      id: 7,
      img: "https://static.dnipro-m.ua/cache/products/6483/catalog_origin_325859.jpg",
      name: "Мотокоса",
      price: 11049,
      description: "Мотокоса Dnipro-M 43 призначена для покосу трави, чагарників, бур'янів, газонів, а також для заготівлі сіна в невеликих масштабах.    Використовується для польових робіт на садовій ділянці площею до 2000 м2."
  },
  {
      id: 8,
      img: "https://static.dnipro-m.ua/cache/products/4980/catalog_origin_183761.jpg",
      name: "Генератор",
      price: 10890,
      description: "Бензиновий генератор GX-25 номінальною потужністю 2,5 кВт забезпечить автономність побутових приладів на дачі або у приватному будинку. Ви зможете одночасно підключити до нього освітлення, холодильник, зарядку телефону, ноутбук та водяний насос."
  }
]


const container = document.querySelector(".js-list"); //це  тег ul 
const PRODUCT_LS = "basket";    // ключ під яким у локал.сховище будемо зберігати те, що вибрав покупець

container.insertAdjacentHTML("beforeend", createMarkup(instruments)); // підв'язали створену функцію з об'єктом де будуть відображатися усі товари

container.addEventListener("click", handleAdd); //делегую подію, буду розуміти по чому клікнули і з цього буду щось робити

// функю для стіорення массива
function createMarkup(arr) {
  return arr    //використали деструктуризацію
      .map(({ id, img, name, price, description }) => ` 
          <li data-id="${id}" class="product-card js-product">
              <img src="${img}" alt="${name}" class="product-img"/>
              <h2 class="product-title">${name}</h2>
              <p class="product-description">${description}</p>
              <p class="product-price">${price} грн</p>
              <button class="product-add-btn js-add">Add to basket</button>
          </li>
      `).join(""); // join("") для того, щоб все привести до рядка  
}

//можна не робити ситуацію з перевіркою, чи правильно клікнули чи ні, 
// а одразу писати:!! event.target.classList.contains("js-add") !! і далі одразу інші умови для кліка
function handleAdd(event) {
  if(!event.target.classList.contains("js-add")) {
      return;
  }
// отримання з батьківського елемента <li>
  const product = event.target.closest(".js-product");
  const productId = +product.dataset.id; // отримання id продукту що буде вибирати клієнт
  const currentProduct = instruments.find(({ id }) => id === productId); // використовую метод масиивів !!  find() !! порівнюю і записую у новий масив
  
  const products = JSON.parse(localStorage.getItem(PRODUCT_LS)) ?? []; // отримую данні, що саме обрав клієнт

            
  const index = products.findIndex(({ id }) => id === productId); // шукаю індекс елемента, чи він є, якщо ні то буде -1
  
  if(index !== -1) {
    // створюю нову властивість !! .qty !!, щоб можна було зберігати декілька одинакових об'єктів
      products[index].qty += 1; // products[index] == тут знаходиться продукт, що отримали після кліку клієнта на нього
  } else {
      currentProduct.qty = 1; // в новий масив додаю нову властивість
      products.push(currentProduct);
  }
// кладу весь список вибраних товарів в локал.сховище
  localStorage.setItem(PRODUCT_LS, JSON.stringify(products));
}