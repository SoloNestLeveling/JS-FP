// 합성 관점에서의 promise와 모나드

//모나드 - 모나드는 함수 합성을 안정적으로 할 수 있게하는 개념.
// 자바스크립트에는 모나드 라는 직접적인 개념이 없지만 모나드가 무엇인지를 알면 좀더 응용 사고가 넓어진다



const g = a => a + 1;
const f = a => a * a;

console.log(f(g(1)))
console.log(f(g())); //이렇게 값을 알 수없는 상황에서 이 함수는 로직을 그대로 진행하여 NaN이라는 값을 출력한다.
// 이러한 잘못된 값 또는 값이 있는지 없는지 알 수 없는 상황에서 지금과 같이 외부에 영향을 주고 싶지 않는 효과임에도 
// 문제를 이르키는 것을 방지 하기 위해 모나드를 한다.

// [] >> 이 박스가 값을 담아둘수 있는 모나드이다.

[1].map(g).map(f).forEach(r => console.log(r))
//[].map(g).map(f).forEach(r => console.log(r))  // 이렇게 빈 값을 넣으면 애초에 에러가 발생한다.




// 비동기 모나드

Promise.resolve(2).then(g).then(f).then(r => console.log(r))
new Promise(reject => setTimeout(() => reject("에러"), 1000)).then(g).then(f).catch(r => r)



// 이렇게 코드를 작성하면 Promise가 pending 상태에서 값이 평가되지 않앗을때 예기치 못하게 then 체이닝이 실행되어 
// 원하지 않는 결과를 가져오는 것을 방지 할 수있는 개념이다.
