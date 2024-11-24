/**
 *
 */
//через new створюємо екземпляр классу, тепер  currentDate - це об'єкт
// const currentDate = new Date();
// console.log(currentDate); // об'єкт приведений до рядка і показує реальний повний час

// console.log(currentDate.getTime()); //отримую Date у вигляді числа, щоб потім можна розраховувати різничю в часі
// // якщо потрібно у мілісекундах
// console.log(Date.now()); // - це статичний метод

// console.log(currentDate.getDay()); //отримуємо день попорядку де Неділя == 0, Понеділок == 1 ....
// console.log(currentDate.getMonth()); // Січень == 0, Лютий == 1 .....

// const d1 = Date.now();
// setTimeout(() => {
//   const d2 = Date.now();
//   console.log(d2 - d1);
// }, 2000); // є погрешность із-за навантаження на процессор

/**==============================================================
 *
 * Напишемо клас Timer, який буде
 * запускати! та зупиняти!! відлік часу
 *
 */
//т.як класи у кнопках однакові, то звертаємось до data-атрибутів
const startBtn = document.querySelector("button[data-action-start]");
const stopBtn = document.querySelector("button[data-action-stop]");
const clockface = document.querySelector(".clockface");
/**
 *  створили конструктор де ми створили властивість,
 * яка буде перевіряти, чи запущений чи ні таймер
 * прописали функції: старту, стоп + очищення, показ таймера
 */
class Timer {
  //          об'єкт
  constructor({ onTick }) {
    this.isActive = false;
    //створили властивість де зберінається посилання на функцію updateClockfase
    this.onTick = onTick; //
    this.intervalId = null;

    this.init(); // запускаємо в конструкторі, щоб його було постіно видно
  }
  //це об'єкт з "00", щоб він постійно був на екрані
  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }
  //зупиняємо і очищаємо форму
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    //!!! якщо прибрати нижні дві строки, то таймер зупиниться, але не обнулиться
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      // у даному випадку це булеве значення, а для if по дефолту буль буде true,
      //тому коли туди попадає значення false (строка 37), то функція одразу припиниться
      // і піде далі виконуватися
      return;
    }
    // тут знайде нове значення і почне виконуватися
    this.isActive = true;

    const startTime = Date.now(); // отримали час коли клікнули по кнопці startBtn
    // отримаємо значення скільки часу пройшло і він актуалізовується кожну секунду
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      // через this викликається функція, що є не в локальній видимості
      const time = this.getTimeComponents(deltaTime); //функ. у мілісекундах, хвилинах і годинах

      this.onTick(time);
    }, 1000);
  }

  //
  //ця конструкція вже є в бібліотеках, а це її розбір: що з а чим і як
  getTimeComponents(time) {
    //відкидую добу
    const hours = this.pad(
      //             відкидуємо сек   хв  години         сек   хв
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) //Math.floor - округлілі
    );
    //відкидуємо години                              сек  хв      тут секунди в хвилини
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    //відкидуємо хвилини, залишаємо лише секунди
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    //    короткий  синтаксис
    return { hours, mins, secs };
  }
  //функція pad() отримує у value числа з функціїї getTimeComponents(time)
  pad(value) {
    //отримали число перевели до рядка і зробили його двоїчним
    return String(value).padStart(2, "0"); // властивість padStart додає кількість нулів
  }
}

//передали функцію в новостворений екземпляр классу!
const timer = new Timer({
  //у властивості onTick лежить посилання на updateClockfase
  onTick: updateClockfase,
});
//
//коли передаємо колбек функцію, то у нас втрачений контекст,
//тоді її підв'язати методом bind(), яки передає посилання
startBtn.addEventListener("click", timer.start.bind(timer));
stopBtn.addEventListener("click", timer.stop.bind(timer)); //для зупинки таймеру

//записуємо значення
function updateClockfase({ hours, mins, secs }) {
  clockface.textContent = `${hours}:${mins}:${secs}`;
}

// /**=======================================================  */
// //приклад без створення конструктора екземпляру класса
// let isActive = false;
// let intervalId = null;

// init();

// function start() {
//   if (isActive) {
//     return;
//   }

//   isActive = true;
//   const startTime = Date.now();

//   intervalId = setInterval(() => {
//     const currentTime = Date.now();
//     const deltaTime = currentTime - startTime;
//     const time = getTimeComponents(deltaTime);

//     onTick(time);
//   }, 1000);
// }

// function getTimeComponents(time) {
//   const hours = pad(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   );
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

//   return { hours, mins, secs };
// }

// function pad(value) {
//   return String(value).padStart(2, "0");
// }

// function stop() {
//   clearInterval(intervalId);
//   isActive = false;
//   const time = getTimeComponents(0); //створює об'єкт де прописані всі нулі
//   onTick(time);
// }
// // такі функції можна викликати до момента її створення!!, якщо буДе СТРІЛОЧНА функція то буде ПОМИЛКА
// function init() {
//   const time = getTimeComponents(0);
//   onTick(time);
// }

// function onTick({ hours, mins, secs }) {
//   clockface.textContent = `${hours}:${mins}:${secs}`;
// }

// startBtn.addEventListener("click", start);
// stopBtn.addEventListener("click", stop);
