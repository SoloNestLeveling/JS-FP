


const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];


const reduce = (fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;

    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
}

function add(p, c) {
    return p + c
}


const map = (iter, fn) => {
    const newLsit = []
    for (const a of iter) {
        newLsit.push(fn(a))
    }

    return newLsit
}


const filter = (iter, fn) => {
    const newLsit = []
    for (const a of iter) {
        if (fn(a)) newLsit.push(a)
    }

    return newLsit
}



console.log(reduce(add, map(filter(users, (user) => user.age > 19), (user) => user.age)))


//앞서 reduce에서 작성한 이 코드는 함수가 중첩되어 있지만, 코드를 읽기가 불편한 점이 있다.
// 위에 코드를 좀더 표현력 높게 만들어보자



// 코드를 값으로 다루어 표현력 높이기

//go - 인자와 함수를 받아서 즉시 처리

// go 함수의 기본적인 메커니즘

/**
 * const go = () =>{}
 * go(
 *  0,
 *  a=> a+1,
 *  a=> a+10,
 *  a=> a+100,
 *  console.log         
 * );  //  111 출력
 */


const go = (...args) => reduce((a, fn) => fn(a), args)
go(
    add(0, 3), // 두개 인자를 전달하고 싶을떄
    a => a + 1,
    a => a + 10,
    a => a + 100,
    console.log
)




// pipe - 함수들이 나열되어있는 합성된 함수를 만드는 함수

const pipe = (f, ...fn) => (...args) => go(f(...args), ...fn);
const pipe2 = (...fn) => (a) => go(a, ...fn)


const f = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100
)

console.log(f(1, 1))


console.log("--------------pipe test----------")
const userAge = pipe(
    map(users, (user) => user.age,
        reduce(add, users)
    ));
console.log(userAge())


// go 함수를 사용하여 읽기좋은 코드로 만들기


go(
    users,
    users => filter(users, (user) => user.age > 19),
    adultUsers => map(adultUsers, (user) => user.age),
    ages => reduce(add, ages),
    console.log   // console 함수를 호출하는게 아닌 함수 자체를 전달하는거다 console.log() X
)




// go + curry

function curry(fn) {
    return function (a, ...args) {
        return args.length ? fn(a, ...args) : (...args) => fn(a, ...args)
    }
}

const mult = curry((a, b) => a * b)

console.log(mult(2)(2))




