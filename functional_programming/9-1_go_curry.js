const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];



// go + curry

const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args)






//위에서 만든 curry 함수를 map,filter,reduce 함수에 씌워준다.
// 그렇게 하여 인자를 하나만 받을시 나머지 인자를 받을때까지 기다리는 함수가 된다. 




const reduce = curry((fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;

    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
})

function add(p, c) {
    return p + c
}


const map = curry((fn, iter) => {
    const newLsit = []
    for (const a of iter) {
        newLsit.push(fn(a))
    }

    return newLsit
})


const filter = curry((fn, iter) => {
    const newLsit = []
    for (const a of iter) {
        if (fn(a)) newLsit.push(a)
    }

    return newLsit
})




const go = (...args) => reduce((a, fn) => fn(a), args)

const pipe = (...fn) => (a) => go(a, ...fn)






go(
    users,
    filter((user) => user.age > 19),
    map((user) => user.age),
    reduce(add),
    console.log
)


go(
    users,
    filter((user) => user.age <= 19),
    map((user) => user.age),
    reduce(add),
    console.log
)



//함수 조합으로 함수 만들기
//위에 함수에서 중복된는 함수를 묶어서 조합해주자

const totalAge = pipe(
    map((user) => user.age),
    reduce(add)
)


const baseTotalAge = (a) => pipe(
    filter(a),
    totalAge,
)

go(
    users,
    baseTotalAge(user => user.age > 19),
    console.log
)


go(
    users,
    baseTotalAge(user => user.age <= 19),
    console.log
)



const allAdd = curry((fn, iter) => go(
    iter,
    map(fn),
    reduce(add),

))


const totalAllAge = allAdd(user => user.age)


console.log(totalAge(users))



const L = {};

L.range = function* (l) {
    let i = -1
    while (++i < l) yield i
}

console.log(L.range(5))