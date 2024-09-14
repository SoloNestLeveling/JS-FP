const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args);

const reduce = curry((fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter) {
        acc = fn(acc, a);
    }
    return acc;
});


const L = {};

L.map = curry(function* (fn, iter) {
    for (const a of iter) {
        yield fn(a)
    }
});


L.filter = curry(function* (fn, iter) {
    for (const a of iter) {
        if (fn(a)) yield a;
    }
})

L.range = function* (len) {
    let i = -1
    while (++i < len)
        yield i
}

const take = curry((limit, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a)
        if (res.length === limit) return res;
    }
    return res;
});


const go = (...args) => reduce((a, fn) => fn(a), args);


const pipe = (fn, ...args) => (...as) => go(fn(...as), ...args);





const join = (sep = ',', iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter)


const find = curry((fn, iter) => go(
    iter,
    L.filter(fn),
    take(1),
    ([a]) => a
));


// L.map,filter를 이용해서 map,filter만들기

const map = (fn, iter) => go(
    iter,
    L.map(fn),
    take(Infinity)
)







// 위 코드를 좀 더 간결하게

const map2 = pipe(
    L.map,
    take(Infinity)
);

console.log(map2(a => a + 10, L.range(5)))


const filter = pipe(
    L.filter,
    take(Infinity)
);

console.log(filter(a => a % 2, [0, 1, 2, 3]))


console.log(L.map([1, 2, 3], (a) => a * 2))