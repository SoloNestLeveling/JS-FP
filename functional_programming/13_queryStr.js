// queryStr 함수



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

    iter = iter[Symbol.iterator]()
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        yield fn(a)
    }


});


L.filter = curry(function* (fn, iter) {

    iter = iter[Symbol.iterator]()
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (fn(a)) {
            yield a
        }
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
const pipe = (...args) => (a) => go(a, ...args)



// Array.prototype.join 보다 다형성이 좋은 join 함수 
// 이터러블/이터레이터 프로토콜을 따르는 배열을 모두 순회가능

//지연평가된 값을 join 할 수도 있다.



const join = curry((sep = ',', iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));



L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]]
}




const queryStr = obj => go(
    obj,
    L.entries,
    L.map(([k, v]) => `${k}=${v}`),
    join('&')

)


const queryStr2 = pipe(
    Object.entries,
    map(([k, v]) => `${k}=${v}`),
    join('&')

)


console.log(queryStr({ name: 'Winter', age: 23, part: 'Vocal-Visual' }))
console.log(queryStr2({ name: 'Winter', age: 23, part: 'Vocal-Visual' }))


const it = L.entries({ name: 'Winter', age: 23, part: 'Vocal-Visual' })

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
