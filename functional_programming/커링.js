
// 커링 - 자바스크립트에는 내장된 기능은 아니지만, 함수가 일급객체이고, 평가시점을 마음대로 정의 할 수 있어서 구현이가능
//  - 함수에 인자를 하나씩 적용해 나아가다가 필요한 인자가 모두 채워지면 함수 본채를 실행하는 기법


//curry


const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];


function curry(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b);
        }
    }
}


const add = curry(function (a, b) {
    return a + b
});

console.log(add(5)(5))


// 위의 코드에서 add() 인자가 두개 들어 올시 미루어뒀던 함수본채를 바로 실행하게하는법


function curry2(fn) {
    return function (a, b) {
        return arguments.length === 2 ? fn(a, b) : function (b) { return fn(a, b) }
    }
}


const add2 = curry2(function (a, b) { return a + b })

console.log(add2(5)(10))
console.log(add2(10, 10))


const sub = curry2(function (a, b) { return a - b })

const add10 = sub(10);

console.log(add10(5))



function curryR(fn) {
    return function (a, b) {
        return arguments.length === 2 ? fn(a, b) : function (b) { return fn(b, a) }
    }
}


console.log(curryR(function (a, b) { return a - b })(10)(5))


// get함수

function get(obj, key) {
    return obj === null ? undefined : obj[key]
}

const user1 = users[0]

console.log(get(user1, "name"))