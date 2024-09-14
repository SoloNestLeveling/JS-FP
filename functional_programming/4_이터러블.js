

//Array, Map, Set

// Array

const array = [1, 2, 3]

for (const a of array) {
    console.log(a)
}

//Set
console.log("----------Set---------")

const set = new Set(["a", "b", "c"]);

for (const b of set) {
    console.log(b)
}

//Map
console.log("----------Map---------")

const map = new Map([['a', 3], ['b', 2], ['c', 3]])

for (const c of map) {
    console.log(c)
}



//이터러블, 이터레이터 프로토콜

/**
 * Array, Set, Map은 자바스크립트 내장 객체로써 이터러블/이터레이터 프로토콜을 따르고있다.
 * 이터러블 : 이터레이터를 리턴하는 [Symbol.interator]()를 가진 값
 * 이터레이터 : {value,done} 객체를 리턴하는 next()를 가진 값
 * 이터러블/이터레이터 프로토콜: 이터러블을 for....of, 전개 연산자 등과 함께 동작하도록한 규약
 */


// Array에 [Symbol.interator]키에 뭐가 들어있는지 확인해보자

console.log(array[Symbol.iterator]); // 함수가 들어있다.

// array[Symbol.iterator] = null // 심볼 이터레이터를 null로 하고 for문 순회를 돌려보자

// for (const i of array) {
//     console.log(i)
// } 

// "array is not iterable" 이라는 에러가 뜨면서 순회를 할 수없다. Set,Map도 동일하다.
// array, set, map은 이터러블이다. 즉 이터레이터를 리턴하는, [Symbol.iterator]()메서드를 가지고 있는데
// [Symbol.iterator]를 null로 만들자 이터러블이 아니라는 에러가 발생한 것.






// 어떻게 이터러블/이터레이터 프로토콜을 따르는가.
// 우선 //array[Symbol.iterator]()는 이터레이터를 반환하기 때문에 next()메서드를 가지고 있다.

const iterator = array[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 출력시 순차적으로 이렇게 출력된다.
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

//이터러블/이터레이터 프로토콜은 for..of 문에서 a에 value를 순차적으로 넘기고 done이 true가 되면 for문에서 빠져나온다.





console.log(set[0]) // undefined로 숫자 키로 접근이 안된다.
console.log(map[0])
// Map,Set은 순회시 i같이 증가하는 숫자를 key로 받아서 순회하는것이 아닌 이터러블/이터레이터 프로토콜에 따라 value를 넘겨 받는것이다.


//즉 이런식으로 사용 불가
const map2 = new Map([['a', 1], ['b', 2]])

for (let i = 0; i < map2.length; i++) {
    console.log(map2[i])
}




//Map을 좀더 깊게 살펴보면 놀라운 사실을 알수있다. ES6에서는 키 또는 벨류를 가져오는 방법으로 Object.keys() , Object.values()를 제공한다.

//자 Map에 이터레이터 next()를 통해서 값을 살펴보자

const mapIterator = map[Symbol.iterator]()

console.log(mapIterator.next())
//{ value: [ 'a', 3 ], done: false , __proto__: Object} 여기서보면 __proto__가 Object인것을 알수있다.
// 즉 Object.keys,values,entries를 사용 할 수있다.

for (const k of map.keys()) {
    console.log(k)          // 키 값만 추출
}

for (const v of map.values()) {
    console.log(v)         // 벨류 값만 추출
}

for (const e of map.entries()) {
    console.log(e)        // 키,벨류 전부 추출
}


const isIterable = a => a && a[Symbol.iterator];

const result1 = isIterable(array)
const result2 = isIterable(set)
const result3 = isIterable(map)

if (result1 && result2 && result3) {
    console.log(true)

} else console.log(false)
