const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];

const adultUsers = [];
const adolescentUsers = [];


//명령형 

//성인, 청소년 구별하기

for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 19) {
        adultUsers.push(users[i])
    }
}


for (let i = 0; i < users.length; i++) {
    if (users[i].age < 19) {
        adolescentUsers.push(users[i])

    }
}






console.log(adultUsers)
console.log(adolescentUsers)



//성인 그룹 name 추출하기

const thrityNames = []
for (let i = 0; i < adultUsers.length; i++) {
    thrityNames.push(adultUsers[i].name)
}

console.log(thrityNames)



// 청소년 그룹의 나이 추줄

const adolescentAges = [];

for (let i = 0; i < adolescentUsers.length; i++) {
    adolescentAges.push(adolescentUsers[i].age)
}

console.log(adolescentAges)


console.log("-----------------리팩토링--------------------------")

//----------위의 명령형 코드를 함수형 코드로 리팩토링하기

// 성인과 청소년을 구별하는 코드는 나이부분을 제외하면 중복이 된다.
// 함수형 프로그래밍으로 중복 코드 줄이기


//성인, 청소년 구별  filter

function filterUsers(array, fn) {
    const newList = [];

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            newList.push(array[i])
        }
    }
    return newList;
}

console.log(filterUsers(
    users,
    function (user) { return user.age >= 19 }
))

console.log(filterUsers(
    users,
    function (user) { return user.age < 19 }
))


// 성인 그룹 name 추출  map함수

function mapUsers(array, fn) {
    const newList = [];
    for (let i = 0; i < array.length; i++) {
        newList.push(fn(array[i]))
    }
    return newList;
}


const adult = filterUsers(users, function (user) { return user.age >= 19 })
const adolescent = filterUsers(users, function (user) { return user.age < 19 })

const adultNames = mapUsers(adult, function (user) { return user.name })
const adolAges = mapUsers(adolescent, function (user) { return user.age })

console.log(adultNames);
console.log(adolAges);

// 이렇게 대입문을 많이 사용하기는 했지만 실제로 함수형 프로그래밍에서는 대입문을 최대한 줄여서 간결하게 작성한다.


//위의 코드에서 대입문을 없앤 좀 더 간결한 코드

//성인 그룹 이름

console.log("---------대입문을 줄인 코드-------------------")

console.log(
    mapUsers(
        filterUsers(users, function (user) { return user.age >= 19 }),
        function (user) { return user.name }
    )

)


console.log(
    mapUsers(
        filterUsers(users, function (user) { return user.age < 19 }),
        function (user) { return user.age }
    )

)

 















//users 필터 뿐만 아니라 다른 작업도 할 수 있다.
console.log("------------------------------------")

console.log(filterUsers(

    [1, 2, 3, 4, 5, 6],
    function (num) { return num % 2; }
))

console.log(filterUsers(

    [1, 2, 3, 4, 5, 6],
    function (num) { return !(num % 2); }
))