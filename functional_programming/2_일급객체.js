// 자바스크립트에서 함수는 일급객체로서 값으로 다루어질수 있다.

//addMaker 함수는 일급객체, 순수함수, 클러저를 이용한 예시이다.

function addMaker(a) {
    return function (b) {
        return a + b
    }
}


const add5 = addMaker(5)
console.log(add5(10))

//--------------------------------

function f4(f1, f2, f3) {
    return f3(f1() + f2())
}

console.log(f4(
    function () {
        return 3
    },
    function () {
        return 3
    },
    function (a) {
        return a * a
    }
))

//함수형 프로그래밍이란 순수함수를 조합하여 함수의 평가 시잠이나,평가방법을 조합해나아가는 방식의 패러다임



//순수 함수

function add(a, b) {
    return a + b
}

console.log(add(5, 5)) // add 함수는 순수 함수다, add함수는 항상 동일한 인자를 주면 동일한 결괏값을 준다.


//순수함수(2)

var obj1 = { val: 10 };

function addValue(obj, b) {
    return { val: obj.val + b }  // 직접 외부의 값을 변경하지 않고 참조만 한다
}

console.log(obj1.val)  // 10
addValue(obj1, 20);
console.log(obj1.val)  //10  , 외부 값이 전혀 변경되지 않았다.

const obj2 = addValue(obj1, 20);

console.log(`obj1: ${obj1.val} , obj2: ${obj2.val} `) //외부 객체를 전혀 건드리지 않고 완전히 새로운 객체를 생성했다.

//평가 시점이 중요하지 않고, 언제 평가하더라고 동일한 값을 출력한다.

console.log("---------------------------------------------------")






// 순수 함수가 아닌경우

var c = 5;

function add2(a, b) {
    return a + b + c    // 현재 add2는 전역 변수인 c에 의존한다.
}

console.log(add2(1, 3))    // c 상태 변경전 평가 시점, 결괏값 9
console.log(add2(1, 4))

c = 10   // c의 상태를 변경

console.log(add2(1, 3))   // c 상태 변경후 평가 시점, 결괏값 14
console.log(add2(1, 4))


// 결괏값을 보면 동일한 인자를 전달했음에도 결괏값이 다르다. 이렇게 결과 달라지는 함수가 아니다!!

// 위 코드는 순수 함수의 가장 중요한 부분 중 하나인 평가 시점이 중요하지 않다는 규칙을 따르지 않는다.

// 위 코드는  c의 상태 변경 시점에 따라 언제 평가했나에 따라 결괏값이 달라진다.







var c = 10;

function add3(a, b) {
    c = b;    // 외부상태에 영향을 미치는 다른 출력이 있다면 순수함수가 아니다.
    return a + b;
}


console.log(`c : ${c}`)   // c: 10
console.log(add3(20, 30))
console.log(`c : ${c}`)   // c: 30





const add10 = a => a + 10 // 함수를 일급객체로 다루기 때문에 이렇게  함수를 변수에 할 당 할 수 있다.
console.log(add10(5)) // 결괏값 15



const x = () => () => 1
console.log(x()) // 결괏값으로 함수를 리턴한다 () =>1

const result = x()
console.log(result()) // 결괏값 1


