

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


const isIterable = a => a && a[Symbol.iterator]

L.flatten = function* f(iter) {
    for (const a of iter)
        if (isIterable(a)) {
            yield* f(a)
        } else yield a
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


// 2차배열 다루기

const arr = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10]
]

go(
    arr,
    L.flatten,
    L.filter(a => a % 2),
    take(Infinity),
    console.log
)


const users = [
    {
        name: "winter", age: 23, family: [
            { name: 'w1', age: 50 }, { name: 'w2', age: 48 }, { name: 'w3', age: 27 }
        ]
    },
    {
        name: "min", age: 31, family: [
            { name: 'm2', age: 55 }, { name: 'm2', age: 54 }, { name: 'm3', age: 17 }
        ]
    },
    {
        name: "karina", age: 24, family: [
            { name: 'k2', age: 53 }, { name: 'k2', age: 51 }, { name: 'k3', age: 25 }
        ]
    },
    {
        name: "doo", age: 14, family: [
            { name: 'd2', age: 38 }, { name: 'd2', age: 40 }, { name: 'd3', age: 9 }
        ]
    }
]

const flat = (iter) => go(
    iter,
    L.map(user => user.family),
    L.flatten,
    L.filter(user => user.age < 21),
    L.map(user => user.name),  
    take(Infinity),
)

console.log(flat(users))