// ES6 리스트 순회

//기존에는 for문에서 리스트 length에 의존하는 명령형 순회였다

const list = [1, 2, 3];
const str = "abc"

for (let i = 0; i < list.length; i++) {
    console.log(list[i])
}

for (let i = 0; i < str.length; i++) {
    console.log(str[i])
}


//ES6에서의 선언적인 순회 for...of  , for....in

for (const a of list) {
    console.log(a)
}

for (const b of str) {
    console.log(b)
}


