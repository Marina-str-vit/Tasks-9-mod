//бажано в Promise писати саме ці параметри!!!
// return не потрібен
// const result = new Promise((resolve, reject) => {
//   const random = Math.random(); //рандомно обирає число

//   setTimeout(() => {
//     if (random > 0.5) {
//       resolve("fulfilled");
//     } else {
//       reject("rejected");
//     }
//   }, 2000);
// });

// console.log(result); //вийде результат ={ об'єкт } поточного стану асинхронного коду. у даному випадку поки число не буде >0.5, в консолі буде "rejected", потім стан змінеться на "fulfilled"

//  ?? як дістати данні з промісу ?!
// then - успіх, catch - не успіх,
//викликаємо метод об'єкту then і catch
// result
//   .then((data) => {
//     console.log("then", data); // then fulfilled
//   })
//   .catch((error) => {
//     console.log("catch", error);
//   })
//   .finally(() => {
//     console.log("finally"); //відпрацює в будь-якому випадку
//   });

/**========================================== */
/**
 * ланцюги промісів
 */

// const promise = new Promise((resolve, reject) => {
//   resolve(5);
// });

// promise
//   .then((data) => {
//     return data * 2;
//   })
//   .then((value) => {
//     return value - 2;
//   })
//   .then((value) => console.log(value)) // 8
//   .catch((error) => console.log(error))
//   .finally(() => {
//     console.log("ok"); // ok
//   });


  // const promise = new Promise((resolve, reject) => {
  //   resolve(10);
  // });

  // promise
  // .then((value) => {
  //    new Promise (resolve => {
  //     resolve (value * 2)
  //    })
  // })
  // .then(value => console.log(value)); // return  відсутній тому значення undefined
  // //
  // // те саме з return
  // promise
  // .then((value) => {
  //   return new Promise (resolve => {
  //     resolve (value * 2)
  //    })
  // })
  // .then(value => console.log(value)); // 20

/**=========================================== */
/*
 * Промісифікація:
 * - Проблема доступу до результату проміса з колбеком
 * - Функція, яка повертає проміс
 */

// const makeOrder = (dish, onSuccess, onError) => {
//   const random = Math.random();

//   setTimeout(() => {
//     if(random > 0.5) {
//       onSuccess(`Ваше замовлення ${dish}`);
//     } else {
//       onError("Закінчилися продукти");
//     }
//   }, 1000)
// }

// makeOrder(
//   // 1 аргумент
//   "Пиріжок",
//   // 2 аргумент
//   (str) => {
//     console.log("success", str)
//   },
//   // 3 аргумент
//   (str) => {
//     console.log("error", str)
//   }
// )
/**
 * та ж функція але промісуємо її, тобто вона не буде обробляти внутрі себе успішний результат або помилку, а буде повертати як проміс і потім його обробляємо
 */

// const makeOrder = (dish) => {
//  //фун-ція повертає проміс!! -- де resolve це метод успішного завершення, а reject -- метод не успішного завершення функції
//   return new Promise((resolve, reject) => {
//     const random = Math.random();

//     setTimeout(() => {
//       if(random > 0.5) {
//         resolve(`Ваше замовлення ${dish}`);
//       } else {
//         reject("Закінчилися продукти");
//       }
//     }, 1000)
//   })
// }
// console.log("Пиріжок"); // отримаємо поки що лише ПРОМІС!!!

// makeOrder("Пиріжок")  //обробка Проміса!!
//   .then((result) => console.log(result)) // це довільний параметр!!, він може бути будь-якимю Аргументов є "Пиріжок" та + строка у функції
//   .catch(tototo => console.log(tototo))  // це довільний параметр!!

/*=================================================
*
 * Промісифікація «синхронних» функцій
 * - Promise.resolve()
 * - Promise.reject()
 */

// const makeOrder = (dish, onSuccess, onError) => {
//   const random = Math.random();

//   if(random > 0.5) {
//     onSuccess(`Ваше замовлення ${dish}`);
//     return;
//   }

//   onError("Закінчилися продукти");
// }

// makeOrder(
//   "Пиріжок",
//   (str) => {
//     console.log("success", str)
//   },
//   (str) => {
//     console.log("error", str)
//   }
// )
/**--------------------------
 * ДЛЯ СИНХРОННОГО КОДУ!
 *результат виконання статичних методів обов'язково ПОВЕРТАТИ == return *
 */
// const makeOrder = (dish) => {
//   const random = Math.random();

//   if(random > 0.5) {
//     return Promise.resolve(`Ваше замовлення ${dish}`);
//   } else {
//     return Promise.reject("Закінчилися продукти");
//   }
// }

// makeOrder("Пиріжок")
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// ===================   Promise.all Promise.race    =================

const startTime = Date.now(); // ПОТОЧНА ДАТА В МІЛІСЕКУНДАХ з півночі 1 січня 1970 року.
console.log(startTime);
//для прикладу дата сьогодні
const date = new Date(); // день місяць дата рік час 00:00:00
console.log(date);

const res1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      resolve({ title: "first", time:  deltaTime })
    }, 3000)
  })
}

const res2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      resolve({ title: "second", time:  deltaTime })
    }, 1000)
  })
  }

const res3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      resolve({ title: "third", time:  deltaTime })
    }, 5000)
  })
}

// res1()
//   .then(data => console.log(data)) // {title: 'second', time: 1002}
//   .catch(error => console.log(error))

// res2()
//   .then(data => console.log(data)) // {title: 'first', time: 3007}
//   .catch(error => console.log(error))

// res3()
//   .then(data => console.log(data)) // {title: 'third', time: 5010}
//   .catch(error => console.log(error))

  // console.log(res1); // тут лише опсилання на функцію, результата немає!
 // console.log(res1()); // тут є результат! функцію викликали

/**
 * дочекається коли всі проміси виконаються і лише тоді виведе результат
 * наприклад: галерею фото на екран
 */

// Promise.all([res1(), res2(), res3()]) 
//   .then(data => console.log(data))  // якщо всі успіх, то буде масив результатів
//   .catch(error => console.log(error)) // якщо error, то буде лише він!!
  /**
   * результат цього промісу: усі успішні
   * 
   * (3) [{…}, {…}, {…}]
        0: {title: 'first', time: 3005} 
        1: {title: 'second', time: 1004}
        2: {title: 'third', time: 5013}
        length: 3
   */
  
/**
 * один проміс успішний або неуспішний, який завершиться найперший !!
 */
  
// Promise.race([res1(), res2(), res3()])
//   .then(data => console.log(data))
//   .catch(error => console.log(error))
/**
 * {title: 'second', time: 1007}
 */


/**================================================================
 * повтор!!
 */
//це змінна де зберігається мій проміс
// const lalala = new Promise((resolve, reject) => {
//   resolve(5)
// })
// console.log(lalala); // Promise {<fulfilled>: 5}

// // функція
// const foo = () => {
//   return new Promise((resolve, reject) => {
//     resolve(10)
//   })
// }
//посилання на проміс
// console.log(foo);
/**
 * Promise {<fulfilled>: 5}
()) => {
  return new Promise((resolve, reject) => {
    resolve(10)
  })
}
 */

//результат промісу
// console.log(foo()); //Promise {<fulfilled>: 10}

