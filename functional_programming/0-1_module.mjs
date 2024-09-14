const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args)

const go1 = (a, fn) => a instanceof Promise ? a.then(fn) : fn(a);

const reduce = curry((fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }

    return go1(acc, function recur(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;

            acc = fn(acc, a);
            if (acc instanceof Promise) return acc.then(recur)
        }
        return acc
    })
})

const L = {}

L.map = curry(function* (fn, iter) {
    for (const a of iter)
        yield go1(a, fn)
});

L.filter = curry(function* (fn, iter) {
    for (const a of iter) {
        if (fn(a)) yield a
    }
});


L.range = function* (len) {
    let i = -1;
    while (++i < len) yield i
}



L.deepFlat = function* f(iter) {
    const isIterable = a => a && a[Symbol.iterator]
    iter = iter[Symbol.iterator]()
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (isIterable(a)) yield* f(a);
        else yield a
    }
}


const take = curry((limit, iter) => {
    const res = [];
    iter = iter[Symbol.iterator]();

    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;

            if (a instanceof Promise) return a.then(
                a => {
                    res.push(a);
                    return res.length === limit ? res : recur()
                });

            res.push(a);
            if (res.length === limit) return res
        }
        return res
    }();
});


const go = (...args) => reduce((a, fn) => fn(a), args)

const pipe = (f, ...fn) => (...args) => go(f(...args), ...fn);




export { curry, reduce, L, take, go1, pipe, go };