
//Map

const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];


//원하는 값 추출 

const nameLsit = []

for (const a of users) {
    nameLsit.push(a.name)
}

console.log(nameLsit)




const ageLsit = []

for (const a of users) {
    ageLsit.push(a.age)
}

console.log(ageLsit)


// 위에처럼 원하는 값을 추출할 수 있지만 계속 비슷한 코드를 중복 작성 해야한다....
// 중복되는 부분을 추상화를 시켜서 중복을 제거하는 함수형 프로그래밍을 해보자


console.log("-----------중복제거---------")


const mapList = (iter, fn) => {
    const newLsit = []
    for (const a of iter) {
        newLsit.push(fn(a))
    }
    return newLsit
}

console.log(mapList(users, (user) => user.name)) // name 추출
console.log(mapList(users, (user) => user.age)) // age 추출



// Map함수의 다형성
// 유사 array여도 이터러블/이터레이터 프로토콜을 따른다면 map 사용 가능

console.log("--------map의 다형성----------")


function* generator() {
    yield 1;
    yield 3;
    yield 5;
}

console.log(mapList(generator(), (a) => a * a))



const m = new Map()
m.set('a', 10);
m.set('b', 20);

console.log(mapList(m, ([k, v]) => [k, v * 2]))



