// take 제한된 길이로 배열을 잘라주는 함수


// reduce, take함수는 결과를 만드는 함수이다.
// 지연평가중 지연을 중단하고 결과를 도출 할때 reduce,take를 사용히면 평가를 종료시킨다.

const range = (len) => {
    let i = -1
    const res = [];
    while (++i < len) res.push(i)

    return res
}

const L = {}
L.range = function* (len) {
    let i = -1

    while (++i < len)
        yield i
}


const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args);

const go = (...args) => reduce((a, fn) => fn(a), args)


const reduce = curry((fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]()
        acc = iter.next().value
    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
})

const add = (a, b) => a + b;



const take = curry((limit, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === limit) return res
    }
    return res
});

console.log(take(10, range(1000))) // range는 실제로 1000배열을 만들고 거기서 10번째까지만을 추려낸다.
console.log(take(5, L.range(1000))) // L.range는 지연평가되기 때문에 실제로 1000배열을 만들지 않고 평가하면서 리미트값 5를 추려낸다.




go(
    range(10),
    take(5),
    reduce(add),
    console.log
)