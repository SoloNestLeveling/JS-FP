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




const map = pipe(
    L.map,
    take(Infinity)
);



const filter = pipe(
    L.filter,
    take(Infinity)
);



//L.flatten  , flatten

//flatten 밑에 배열들은 전개해서 하나의 배열로 만드는함수

const number = [[1, 2], 3, 4, [5, 6]]

const isIterable = a => a && a[Symbol.iterator]

L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) {
            yield* a                //for (const b of a) yield b = yield* a
            // [1,2] 이건 배열임으로 이터러블이다, 이터러블이 확인되면 안에 있는 1,2 순회해서 b에 넣어주는거다,
        } else yield a;  // 단일값은 이터러블이 아니므로 바로 yield하게 한다.
    }
}

const it = L.flatten(number)

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())


const flatten = pipe(  // 즉시 평가하는 flatten 함수
    L.flatten,
    take(Infinity) // take로 즉시 평가한다.
)

console.log(flatten(number))





// yield*을 사용하면 자동 순회 하게 된다.
//즉 for(const a of [1,2,3]) = yield* [1,2,3] 





// L.deepFlat

L.deepFlat = function* f(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield* f(a);
        else yield a;
    }
};


const flat = L.deepFlat([1, [2, [3, 4], [[5]]]])

console.log(flat.next())
console.log(flat.next())
console.log(flat.next())
console.log(flat.next())
console.log(flat.next())
console.log(flat.next())



//즉시 실행 평가 deepFlat

go(
    number,
    L.flatten,
    take(Infinity),
    console.log
)




// const deepFlat = pipe(
//     L.deepFlat,
//     take(Infinity)
// )

// console.log(deepFlat([1, [2, [3, 4], [[5]]]]))







