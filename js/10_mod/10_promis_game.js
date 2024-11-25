/**
 * Напиши програмне забезпечення для ігрового автомата.
 * Для вирішення завдання використай готову розмітку HTML та базову стилізацію.
 *
 * Після натиснення на кнопку "Start game"
 * в кожному віконці по черзі має з'являтись
 * смайлик з затримкою в 1 секунду ('🤑' або '👿')
 *
 * Під час обробки кожного віконця створи масив з Promis-ами
 * в якому кожен з них буде відповідати за своє віконце,
 * після чого оброби даний масив за допомогою методу Promise.allSettled
 *
 * Після того як всі віконця були заповнені потрібно
 * щоб скріпт автоматично визначав чи гравець переміг, чи ні.
 * Якщо в кожному віконці однаковий смайлик це означає що користувач переміг
 *
 * В поле result виводить повідомлення про статус гри ('Winner' або 'Loser')
 *
 * Після повторного натискання на кнопку "Start game"
 * поле має очищатись, а гра починатись з початку.
 */


const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const result = document.querySelector(".result");

startBtn.addEventListener("click", handleStart);

function handleStart() {
//кнопка активна після отримання результату, або на початку гри
    startBtn.disabled = true; // disabled - це властивість, котру модна прописати в HTML, aле вона зробить кнопку неактивною, тому прописуємо її в JS
//очищуємо поле при натисканні
    result.innerHTML = "";
// можна Array.from або spred оператор, котрий розгорнув псевдомасив і поклав у масив
    const promises = [...container.children].map(() => {
        return new Promise((resolve, reject) => {
            const random = Math.random();

            if(random > 0.5) {
                resolve("🤑");
            } else {
                reject("👿");
            }
        })
    })

  //  збирає усі проміси: успішні та неуспішні
    Promise.allSettled(promises)
        .then(items => {
            const isWinner =
                items.every((item) => item.status === "fulfilled") ||
                items.every((item) => item.status === "rejected")      

            items.forEach((item, i) => {
            // для очищення формию Цей код синхронний, тому він виконається першим, а потім вже setTimeout
                container.children[i].textContent = "";
            //щоб з'являвся кожний смайлик через 1000мсек
                setTimeout(() => {
                    container.children[i].textContent = item.value || item.reason;
                //останній елемент на якому з'явиться надпис Winner або Loser
                    if(i === items.length - 1) {
                        result.innerHTML = isWinner ? "Winner" : "Loser"; 
                    // кнопка неактивна, поки не вийде результат
                        startBtn.disabled = false; // тут вбираю НЕактивність кнопки, вона стає клікабельною
                    }
                }, 1000 * (i + 1))
            })  
        })
}

/**
 * ==============================================================
 */
// const form = document.querySelector("form");
// form.addEventListener("submit", handleSubmit);

// function handleSubmit(event) {
//     event.preventDefault();
//отримала форму з усіма ел-ми
// const promiseState = event.target.elements;
// console.log(promiseState); 
/**результат цього виклику в консолі
 * 
 * HTMLFormControlsCollection(5) [input, fieldset, input, input, button, delay: input, state: RadioNodeList(2)]
    0:input
    1:fieldset
    2:input
    3:input
    4:button
    delay:input
    state: RadioNodeList(2) [input, input, value: 'fulfilled']
 */
//    const promiseState = event.target.elements.state.value;
//     // console.log(promiseSt ate);
//     const delay = event.target.elements.delay.value; // це строка ввода часу, тому його і ставимо у setTimeout
//     setTimeout(() => {
//         console.log("lalala");
        
//     }, delay);
    
// }

// iziToast.show({
//     id: null, 
//     class: '',
//     title: '',
//     titleColor: '',
//     titleSize: '',
//     titleLineHeight: '',
//     message: '',
//     messageColor: '',
//     messageSize: '',
//     messageLineHeight: '',
//     backgroundColor: '',
//     theme: 'light', // dark
//     color: '', // blue, red, green, yellow
//     icon: '',
//     iconText: '',
//     iconColor: '',
//     iconUrl: null,
//     image: '',
//     imageWidth: 50,
//     maxWidth: null,
//     zindex: null,
//     layout: 1,
//     balloon: false,
//     close: true,
//     closeOnEscape: false,
//     closeOnClick: false,
//     displayMode: 0, // once, replace
//     position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
//     target: '',
//     targetFirst: true,
//     timeout: 5000, // щоб закривати вікно
//     rtl: false,
//     animateInside: true,
//     drag: true,
//     pauseOnHover: true,
//     resetOnHover: false,
//     progressBar: true,
//     progressBarColor: '',
//     progressBarEasing: 'linear',
//     overlay: false,
//     overlayClose: false,
//     overlayColor: 'rgba(0, 0, 0, 0.6)',
//     transitionIn: 'fadeInUp',
//     transitionOut: 'fadeOut',
//     transitionInMobile: 'fadeInUp',
//     transitionOutMobile: 'fadeOutDown',
//     buttons: {},
//     inputs: {},
//     onOpening: function () {},
//     onOpened: function () {},
//     onClosing: function () {},
//     onClosed: function () {}
// });

// https://marcelodolza.github.io/iziToast/