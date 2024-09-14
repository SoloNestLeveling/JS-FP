// promise
// promise의 가장핵심은 일급값으로 다루어 진다는 것이다.
// promise는 대기와 성공과 실패를 다루는 일급 값으로 이루어져있다.
// 즉 일급값으로 다루어 진다는것은 변수에 항당 될수도 있고 인자로 값으로 전달도 가능 하기때문에 다양하게 사용 가능해진다.


function add20(a) {
    return new Promise(resolve => setTimeout(() => resolve(a + 20), 1000))
}

const a = add20(5)

// a.then(console.log)


// console.log(a)


// 값으로써의 promise



//일반적인 함수

const go1 = (a, fn) => fn(a);

const add5 = a => a + 5

console.log(go1(10, add5))

console.log(Promise.resolve(10), add5)


// 위에 코드를 비동기적으로 실행한다면? 이상한 결과 값이 출력
// 비동기 상황에서도 안전하게 값을 받을수 있도록 Promise가 일급 객체인것을 이용하여 go 함수를 작성한다.


const go2 = (a, fn) => a instanceof Promise ? a.then(fn) : fn(a);

go2(Promise.resolve(4), add5).then(console.log)

const result = Promise.resolve(4)

go2(result, add5).then(console.log)


const delay1000 = a => new Promise(resolve => setTimeout(() => resolve(a), 1000));

go2(delay1000(20), add5).then(console.log) // 정상적으로 출력

const r2 = delay1000(20)


go2(go2(r2, add5), console.log)





