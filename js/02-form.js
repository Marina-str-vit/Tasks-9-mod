const STORAGE_KEY = "feedback-form"; //створили Службову Константу, яку не треба 
                                      //змінювати, і щоб потім записати її  в localStorage

const form = document.querySelector(".feedback-form"); //отримали доступ до форми
const textarea = form.querySelector("textarea");   // маємо textarea з form, щоб не 
                                                     //шукати її з усього документа
textarea.addEventListener("input", onTextareaInput);

form.addEventListener("submit", clearSubmit); // очищуємо форму після відправки клієнтом даних
populateText();  //викликаємо функцію, щоб отримати данні зі сховища


/*
- Отримуємо значення поля
  - Зберігаємо його у сховище
*/

function onTextareaInput(event) {
  const value = event.target.value; // отримую значення, що ввів користувач
  localStorage.setItem(STORAGE_KEY, value); // зберігаємо данні в сховищі
}

/*
* - отримувати данні з Локальлного сховища і перевіряємо, чи є текст
*/

function populateText() {
 const message = localStorage.getItem(STORAGE_KEY); // отримали данні

 //перевіряємо, чи є текст
 if (message) {
  textarea.value = message; // ми викликаємо!! цю функцію populateText вище і бачимо, що за данні отримали 
 }
}

/*
* - Скасовуємо стандартну поведінку
* - Видаляємо повідомлення зі сховища
* - Очищуємо форму
Навіщо?: дані вже пішли на сервер, і свою роботу на клієнті вже викон.
*/

function clearSubmit(event) {
  event.preventDefault(); // звертаємося до об'єкта і викликаємо метод preventDefault() і тепер форма автоматично не перезавантажується
  // зі сторони клієнта  відбувається відправка форми
  
  event.currentTarget.reset(); // очищаю форму або!!  form.reset();  !!

  // данні відправилися, тому видаляю з локал.сховища
  localStorage.removeItem(STORAGE_KEY);
}