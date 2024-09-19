const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];



//명령형 

const over20Ages = []

for (const a of users) {
    if (a.age > 19) over20Ages.push(a)
}

console.log(over20Ages)


const under20Ages = []

for (const a of users) {
    if (a.age < 19) under20Ages.push(a)
}

console.log(under20Ages)

//역시 이런식으로 하면 중복이 된다.


//선언형으로 리팩토링

console.log("--------선언형-----------")

function filter(iter, fn) {
    const newLsit = [];
    for (const a of iter) {
        if (fn(a)) newLsit.push(a)
    }
    return newLsit;
}

console.log(filter(users, (user) => user.age > 19)) // 20세 이상 
console.log(filter(users, (user) => user.age < 20)) //19세 이하


//다른 작업

console.log(filter([1, 2, 3, 4, 5], (a) => a % 2))
console.log(filter(function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}(), (a) => a % 2 === 0))

