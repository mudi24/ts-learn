"use strict";
let str = 'hello';
let num = 3;
let b1 = true;
let n = null;
let u = undefined;
// let v1:void = null // 严格模式下会报错
let v2 = undefined;
console.log(str);
console.log(num);
console.log(b1);
console.log(v2);
let obj = { name: '', handle: () => { } };
let fn = (type) => {
    console.log(type.run);
};
let div = document.querySelectorAll('div, footer');
const axios = {
    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.send(null);
        });
    }
};
