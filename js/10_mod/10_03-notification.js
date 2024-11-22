/**
 * - Показуємо та ховаємо, додаючи/видаляючи клас is-visible
 * - Ховаємо через певний час
 * - Ховаємо при кліці
 * - Не забуваємо чистити таймер
 *
 * наприклад, так працює баннер з рекламою
 *
 */

const NOTIFICATION_DELAY = 3000;
// отримали віконце, що буду ховати та показувати
const notification = document.querySelector(".js-alert");

//let = щоб можна було її переініціалізовувати та використовувати будь-якій локальній області видимості, можна просто без null
let timerId = null;

//при кліку ховаємо вікно
notification.addEventListener("click", onNotificationClick);

showNotification();

// додали клас, щоб зробити ел-нт видимим та потім через 3сек. воно закриється

function showNotification() {
  notification.classList.add("is-visible"); //додали клас
  // звернулися до ел-ту і закрили його через NOTIFICATION_DELAY
  timerId = setTimeout(() => {
    // timerId --> це ідентифікатор функції
    console.log("hide");
    hideNotification();
  }, NOTIFICATION_DELAY);
}

//створили окрему функцію де видялаяємо клас видимості!!!
// цю функцію потім підставляємо в  таймер setTimeout її видимості
function hideNotification() {
  notification.classList.remove("is-visible");
}

function onNotificationClick() {
  hideNotification();
  clearTimeout(timerId); // timerId --> це ідентифікатор функції
}
