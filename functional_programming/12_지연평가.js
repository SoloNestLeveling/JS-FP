
// 지연평가 (Lazy Evaluation)
/**
 * -제떄 계산법: 값이필요한 순간까지 지연했다가 필요한 순간 값을 계산한다.
 * (느긋한 계산법)
 *
 * - 제너레이터 /이터레이터 프로토콜을 기반으로 구현 
 */



const users = [
    { id: 1, name: "a", age: 23 },
    { id: 2, name: "b", age: 20 },
    { id: 3, name: "c", age: 24 },
    { id: 4, name: "d", age: 30 },
    { id: 5, name: "e", age: 17 },
    { id: 6, name: "f", age: 15 },
    { id: 7, name: "g", age: 25 },
];


// L.map

const L = {}
L.map = function* (fn, iter) {
    for (const a of iter) {
        yield fn(a)
    }
}

const iter = L.map(a => a + 10, [1, 2, 3])

console.log(iter.next())   // 이런식으로 next를 통해 아직 평가되지 않은 제너레이터 객체를 평가 시킬수 있다.
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())




L.filter = function* (fn, iter) {
    for (const a of iter) {
        if (fn(a)) yield a
    }
}

const f = L.filter(a => a % 2, [1, 2, 3, 4, 5])

console.log(f.next())
console.log(f.next())
console.log(f.next())
console.log(f.next())





const curry = fn => (a, ...args) => args.length ? fn(a, ...agrs) : (...args) => fn(a, ...args);


const reduce = (fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
}

const go = (...args) => reduce((a, fn) => fn(a), args)
const pipe = (...args) => (a) => go(a, ...args);
