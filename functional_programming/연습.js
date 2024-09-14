const users = [
    { id: 1, name: "winter", age: 23 },
    { id: 2, name: "eunChea", age: 22 },
    { id: 3, name: "karina", age: 24 },
    { id: 4, name: "kyungMin", age: 30 },
    { id: 5, name: "minJi", age: 17 },
    { id: 6, name: "heaYun", age: 15 },
    { id: 7, name: "jun", age: 25 },
];


const filterUsers = (array, fn) => {
    const newList = []
    each(array, function (user) { if (fn(user)) newList.push(user) })
    return newList
}






const mapUsers = (array, fn) => {
    const newList = [];
    each(array, function (user) { newList.push(fn(user)) })
    return newList
}



const each = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
    return array;
}


const curryr = (fn) => {
    return function (a, b) {
        return arguments.length === 2 ? fn(a, b) : function (b) { return fn(b, a) }
    }
}



const _get = curryr((obj, key) => {
    return obj === null ? undefined : obj[key]
})

console.log(_get("name")(users[0]))

const getName = _get("name")



console.log(mapUsers(filterUsers(users, function (user) { return user.age >= 19 }),
    function (user) { return user.name }))


console.log(filterUsers(users,
    function (user) { return user.age >= 19 }))


console.log([1, 2, 3].map((p, c) => p + c, 0))