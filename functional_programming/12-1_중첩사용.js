// range , map , filter , take, reduce 중첩사용  


// 즉시평가

const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args);


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

const map = curry((fn, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(fn(a))
    }
    return res
})

const filter = curry((fn, iter) => {
    const res = [];
    for (const a of iter) {
        if (fn(a)) res.push(a)
    }
    return res;
})

const range = (len) => {
    let i = -1;
    const res = [];
    while (++i < len) {
        res.push(i)
    }
    return res
}


const take = curry((limit, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a)
        if (res.length === limit) return res
    }
    return res
})


const go = (...args) => reduce((a, fn) => fn(a), args)
const pipe = (...args) => (a) => go(a, ...args);



go(
    range(10),
    map(a => a + 10),
    filter(a => a % 2),
    take(2),
    console.log
)