// L.range함수

//입력한 숫자 만큼의 길이의 배열을 생성하는 함수


const range = (len) => {
    let i = -1
    const res = [];
    while (++i < len) {
        res.push(i)
    }
    return res;

};


console.log(range(5))


// 이 배열을 reduce함수로 전체 합을 구하는법


const reduce = (fn, iter, acc) => {
    if (!acc) {
        iter = iter[Symbol.iterator]();
        acc = iter.next().value
    }

    for (const a of iter) {
        acc = fn(acc, a)
    }
    return acc
}


const rangeList = range(5);

const add = (a, b) => a + b;

console.log(reduce(add, rangeList))



//느긋한 L.range

const L = {}
L.range = function* (len) {
    let i = -1
    while (++i < len) {

        yield i;
    }


};

console.log(L.range(5)) // 실행시 위에 코드처럼 바로 배열이 출력되지 않고 이상한 값이 출력됨 Object [Generator] {}, 이건 이터레이터를 담고있는 정보이다.



const iterList = L.range(5)




console.log(reduce(add, L.range(5)))


/**
 *  위 제너레이터 함수의 특징은,호출될 때는 실제로 제너레이터 객체가 반환되지만 함수 본체 내부의 코드는 아직 실행되니 않는다.
 *  L.range(5)를 실행하면 내부 코드가 실행되지는 않고 제너레이터 객체가 반환된다.
 * 
 * 실제로이 함수가 평가되는 시점은 reduce 함수에 의해 값이 평가 될때이다. reduce함수는 이터레이터를 받아서 값을 축적하는 역할을 하는데
 * 이때 실세로 값이 필요하기 때문에 제너레이터 객체의 평가가 이루어진다. 
 */




//range함수와 L.range함수의 차이는  range 함수는 reduce 함수 안에서 배열을 만들고 그 배열을 이터레이터로 만드는 과정을 거친다.
//하지만 L.range함수를 실행하면 이터레이터(제너레이터 객체)를 만들고 해당하는 함수를 실행하면 이미 만들어진 이터레이터를 리턴하고 순회를 한다.(조금 더 효율적임)



//실제로 눈에 띄는 성는차이는 없지만 어느정도 차이가 나는지 간단하게 테스트해보자.


const test = (name, time, fn) => {
    console.time(name)
    while (time--) fn();
    console.timeEnd(name)
}

test('range', 10, () => reduce(add, range(1000000)));
test('L.range', 10, () => reduce(add, L.range(1000000)));




const take = (limit, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a)
        if (res.length === limit) return res;

    }
    return res
}


console.log(take(2, [1, 2, 3, 4, 5]))