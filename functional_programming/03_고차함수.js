// 고차함수

// 고차함수에는 2가지가 있다.
// 1. 함수를 인자를 받아서 실행하는 함수
// 2. 함수를 만들어서 리턴하는 함수.



// 1.함수를 인자로 받는 고차함수

function apply(fn) {
    return fn(5)
}


function add(a) {
    return a + 1
}

console.log(apply(add))  //결과값 6


// 화살표 함수로 작성

const apply2 = fn => fn(1);

const add2 = a => a + 2;

console.log(apply2(add2)) //결과값 3
console.log(apply2(a => a - 1)) // 이렇게 함수 자체를 인자로 보낼수도 있다.





console.log("--------------------------------------")

// times 함수

function times(fn, num) {
    let i = 0
    while (i++ < num) fn(i)
};

times(console.log, 3)
times(a => console.log(a + 10), 3)


//함수를 만들어서 함수를 리턴하는 함수(클로저)

function addMaker(a) {
    return function (b) {
        return a + b
    }
}

const add5 = addMaker(5);

console.log(add5(20))




const addMaker2 = a => b => a + b;

const add10 = addMaker2(10)

console.log(add10(5))

