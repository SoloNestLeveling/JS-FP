import { curry, reduce, L, take, go1, pipe, go } from './0-1_module.mjs'

// 지연평가 + Promise - L.map , map, take



// 기본적인 코드
go(
    [1, 2, 3],
    L.map(a => a + 10),
    take(Infinity),
    console.log,
)


// 배열이 Promise인 경우


go(
    [Promise.resolve(4), Promise.resolve(5), Promise.resolve(6)],
    L.map(a => a + 10),
    take(Infinity),
    console.log,  // [ '[object Promise]10', '[object Promise]10', '[object Promise]10' ]
)
// 결과 값이 이상해진다, L.map에서 프로미스 배열을 받을떄 받고나서 바로 yield fn(a)를 함으로 오류가 난다.
// 우선 L.map의 yield부분을 go1 함수로 바꿔준다.
// go1 함수로 바꾼후 [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]
// 이렇게 대기 상태의 프로미스 값을 받는다.
// take에서는 대기상태 Promise 값을 바로 배열에 넣기 때문에 take 부분을 고쳐준다.






