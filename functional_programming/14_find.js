
const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];




const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args);


const reduce = curry((fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]()
        acc = iter.next().value
    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
});


const map = curry((fn, iter) => {
    const res = [];
    for (const a of iter)
        res.push(fn(a))

    return res
});


const filter = curry((fn, iter) => {
    const res = [];
    for (const a of iter) {
        if (fn(a)) res.push(a)
    }

    return res
});


const range = (len) => {
    let i = -1;
    const res = [];
    while (++i < len)
        res.push(i)

    return res
};



const L = {}


L.map = curry(function* (fn, iter) {
    for (const a of iter) {
        yield fn(a)
    }
});




L.filter = curry(function* (fn, iter) {
    for (const a of iter) {
        if (fn(a)) yield a
    }
});



L.range = function* (len) {
    let i = -1;
    while (++i < len)
        yield i
};



const take = curry((limit, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a)
        if (res.length === limit) return res
    }

    return res
});


const go = (...args) => reduce((a, fn) => fn(a), args);
const pipe = (f, ...fn) => (...args) => go(f(...args), ...fn)




const join = curry((sep = ',', iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));



L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]]
}




// const find = (fn, iter) => go(
//     iter,
//     filter(a => ((console.log(a), fn(a)))), //여기서 확인해보나 이미 배열이 평가되어 만들어졌다.
//     a => (console.log(a), a),
//     take(1),
//     ([a]) => a  // 베열 깨기
// )


// L 함수를 통해서 take를 통해 평가지연을 실행하는 함수로 만들어보자


// const l_find = curry((fn, iter) => go(
//     iter,
//     L.filter(a => (console.log(a), fn(a))),
//     a => (console.log(a), a),  // 값이 평가지연되어 이터레이터가 반환되었다.
//     take(1),      // take는 반환된 이터레이터에서 조건에 맞을때까지 하나씩 꺼내본다. 0을 꺼내보고 false임으로 1을 꺼내보고 true가 되어 1을 반환한다.
//     ([a]) => a
// ))


const l_find = curry((fn, iter) => go(
    iter,
    L.filter(fn),
    take(1),
    ([a]) => a
));



const l_find1 = pipe(
    L.filter(),
    take(1),
    ([a]) => a
);



console.log(l_find(a => a % 2, [0, 1, 2, 3, 4, 5]))
console.log(l_find1(a => a % 2 === 0, [0, 1, 2, 3, 4, 5]))



go(
    users,
    L.map(user => user.age),
    l_find(user => user < 19),
    console.log
)










