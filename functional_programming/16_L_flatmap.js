const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args);





const reduce = (fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter) {
        acc = fn(acc, a);
    }
    return acc;
}







const L = {};


L.map = curry(function* (fn, iter) {
    for (const a of iter) {
        yield fn(a)
    }
});



const isIterable = (a) => a && a[Symbol.iterator]

L.flatten = function* (iter) {

    for (const a of iter) {
        if (isIterable(a)) {
            yield* a
        } else yield a
    }
}




const take = curry((limit, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a)
        if (res.length === limit) return res;
    }
    return res;
});

const range = (len) => {
    let i = -1;
    const res = [];
    while (++i < len)
        res.push(i)
    return res
}

const map = curry((fn, iter) => go(
    iter,
    L.map(fn),
    take(Infinity)
))




const go = (...args) => reduce((a, fn) => fn(a), args);

const pipe = (f, ...fn) => (...args) => go(f(...args), ...fn);



// L.flatMap

L.flatMap = curry(pipe(
    L.map,
    L.flatten
));

const iter = L.flatMap(a => a + 10, [1, 2, [3, 4], [5]])

console.log(iter.next()) // 결과값 11 12 3 , 4 1 0 5 1 0
console.log(iter.next())
console.log(iter.next())

const flatMap = pipe(
    L.map,
    L.flatten,
    take(Infinity)
)

console.log(flatMap(range, [1, 2, 3]))


