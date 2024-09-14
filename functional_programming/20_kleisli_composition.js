const curry = fn => (a, ...args) => args.length ? fn(a, ...args) : (...args) => fn(a, ...args);


const go1 = (a, fn) => a instanceof Promise ? a.then(fn) : fn(a)

const reduce = curry((fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;
    }

    return go1(acc, function recur(acc) {


        for (const a of iter) {
            acc = fn(acc, a);
            if (acc instanceof Promise) return acc.then(recur)
        }
        return acc;
    });
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















// kleisli composition
// 외부에 의존시 예상치 못하게 외부 값이 변경 되었을떄 안전하게 함수를 합성하는법



const users = [
    { id: 1, name: "aa" },
    { id: 2, name: "bb" },
    { id: 3, name: "cc" },
];

const getUserById = (id) => find(user => user.id === id, users) || Promise.reject("값이 없어요!!")


const f = ({ name }) => name;

const g = getUserById;

const fg = id => Promise.resolve(id).then(g).then(f).catch(e => console.log(e))

users.pop();
users.pop();


// go, pipe,reduce





go(
    Promise.resolve(1),
    a => a + 10,
    a => Promise.resolve(a + 100),
    a => a + 1000,
    console.log

)


// then로 결과 값을 꺼낼때 그 값은 절대 Promise가 아니다.

Promise.resolve(Promise.resolve(Promise.resolve(1))).then(console.log)