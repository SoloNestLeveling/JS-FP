//사용자 정의 이터러블/이터레이터 프로토콜

const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { done: true } : { value: i--, done: false };
            },
            [Symbol.iterator]() { return this }
        }
    }
}


const iterator = iterable[Symbol.iterator]();
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

for (const a of iterator) console.log(a)


//위에 사용자 정의 이터러블/이터레이터 프로토콜은 잘 구현된 것이아니다.
// [Symbol.iterator](){return this}  이것을 추가해서 자기 자신을 이터레이터로 만든다?

console.log("-----------------------")

const array = [1, 2, 3];
const iterator2 = array[Symbol.iterator]()
iterator2.next()   // 이런식으로 이터레이터를 진행하다 순회 하면 실행된 이터레이터를 제외하고 순회한다.

for (const b of iterator2) console.log(b)


//그리고 iterator2는  [Symbol.iterator]를 가지고 있고 이것을 실행하면 자기 자신이다.

console.log(iterator2[Symbol.iterator]() === iterator2)


//현시점에서 이터러블/이터레이터 프로토콜은 거의 대부분에 적용 되어있고 유사 배열에서도 사용 가능하다.


//전개 연산자(spread) 같은 경우도 이터러블/이터레이터 프로토콜을 따른다.

const list = [1, 2, 3]
const set = new Set([4, 5, 6]);
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

console.log([...list, ...set, ...map]) // 전개 연산이 정상적으로된다.


list[Symbol.iterator] = null

console.log([...list, ...set, ...map])  // 이렇게 list 이터러블을 null 만드니 전개가 되지 않는다.


