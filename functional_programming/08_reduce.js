
//reduce



const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];


//명형형
const numbers = [1, 2, 3, 4, 5]

let total = 0

for (const a of numbers) {
    total += a
}

console.log(total)



//선언형 reduce (어려움!!)

const reduce = (fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;  // 이렇게 next로 값을 추출하면 배열에서 값이 추출되고 나머지 남은 값들이 루프를 돌게 된다.

    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
}

function add(p, c) {
    return p + c
}

console.log(reduce((p, c) => p + c, [1, 2, 3], 0))



// map,set,reduce 중첩해서 사용하기

console.log("------------------------------------")

const map = (fn, iter) => {
    const newLsit = []
    for (const a of iter) {
        newLsit.push(fn(a))
    }

    return newLsit
}


const filter = (fn, iter) => {
    const newLsit = []
    for (const a of iter) {
        if (fn(a)) newLsit.push(a)
    }

    return newLsit
}






console.log(
    reduce(add, (map(user => user.age, filter(user => user.age > 19, users))))
)


const go = (...args) => reduce((a, fn) => fn(a), args)


go(
    users,
    users => filter(user => user.age > 19, users),
    users => map(user => user.age, users),
    users => reduce(add, users),
    console.log
)
