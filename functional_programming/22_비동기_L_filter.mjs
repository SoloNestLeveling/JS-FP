import { curry, reduce, L, take, go1, pipe, go } from './0-1_module.mjs'


go(
    [1, 2, 3, 4, 5, 6],
    L.map(a => Promise.resolve(a * a)),
    L.filter(a => {
        console.log(a);
        return a % 2
    }),             // map으로부터 Promise 값을 받고 있다.
    take(2),
    console.log
)