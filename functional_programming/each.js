


// map,filter로 작성한 작성문에서 루프 부문과 해당 i번쨰 값을 찾는 부문이 중북이다.

//each함수를 사용해서 중복 부문을 없애보자, 정확히 말하면 명령형 부분을 감추어서 좀 더 선언적으로 만든다.




const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];



function filterUsers(array, fn) {
    const newList = [];
    each(array, function (value) {   // function({id:1........})
        if (fn(value)) newList.push(value) //  user.age>=19
    })
    return newList;
}


// 성인 그룹 name 추출  map함수

function mapUsers(array, fn) {
    const newList = [];
    each(array, function (user) {
        newList.push(fn(user))
    })
    return newList;
}


function each(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
    return array;

}

console.log(filterUsers(users, function (user) { return user.age >= 19 }))
console.log(mapUsers(filterUsers(users, function (user) { return user.age >= 19 }),
    function (user) { return user.name }))





// *다형성

//여기서 만든 map,filter 함수는 이미 자바스크립트에 존재 한다.
// 하지만 자바스크립트에 내장된 map과 filter는 지금 만든 함수와 약간의 차이가 있는데,
// 자바스크립트 map,filter는 메서드이고 객체지향 프로그래밍 이다.
//어레이가 아닌 어레이처럼 보이는 어레이 라이크가 있는데 이것들에는 map과 같은 메서드가 없다... 즉 다형성이 떨어진다.


