
// 즉시평가 


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




//지연평가
// 실제 for..of문이 어떻게 동작하는지 코드로 풀어서 대신 사용해보자


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


go(
    L.range(100),
    L.map(a => a + 10),
    L.filter(a => a % 2),
    take(5),
    console.log
)


