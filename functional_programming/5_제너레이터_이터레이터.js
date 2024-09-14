//제너레이터와 이터레이터

//제너레이터 이터레이터이자 이터러블을 생성하는 함수, (이터러블 객체를 생성하는 함수)

function* generator() {
    yield 1;
    yield 2;
    yield 3;
    return "윈터는 이쁘다."

}

const iter = generator()
console.log(iter[Symbol.iterator]() === iter) // generator 함수는 이터레이터이자 이터러블이다.

console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())


for (const g of iter) console.log(g) // 순회 가능

//제너레이터는 리턴도 가능한데 리턴하면 next()에서 done이 true가 되면 리턴값을 반환한다.


//즉 제너레이터는 문장을 순회 할 수있고 제너레이터를 통해 어떤 값이든 순회가능하게 로직을 만들수 있는 함수이다.


function* winter() {
    yield { name: "winter", age: 23, visual: "beautiful" }
}

const it = function* (iter) {
    for (const w of iter) {
        yield w
    }
}

const its = it(winter())
console.log(its.next())



console.log("--------------------홀수 추출------------------")


function* infinity(i = 0) {
    while (true) yield i++
}

function* limit(num, iter) {
    for (const a of iter) {
        yield a
        if (a === num) return
    }
}

function* odds(num) {
    for (const a of limit(num, infinity(1))) {
        if (a % 2) yield a;
        if (a === num) return
    }
}

const iter2 = odds(10)

console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())


console.log("---------------나머지 연사자")

//for..0f, 전개연산자, 구조 분해, 나머지 연산자

console.log(...odds(5), ...odds(10))



const [head, ...tail] = [1, 2, 3, 4, 5] //배열 분해
console.log(head)
console.log(tail)


const [a, b, ...rest] = odds(10)

console.log(a)
console.log(b)
console.log(rest)




