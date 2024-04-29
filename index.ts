let str:string = 'hello'
let num:number = 3
let b1:boolean = true
let n:null = null 
let u:undefined = undefined
// let v1:void = null // 严格模式下会报错
let v2:void = undefined

console.log(str);
console.log(num);
console.log(b1);
console.log(v2);


let obj:unknown = { name: '', handle: ()=>{}}

// console.log(obj.name);
// obj.unknown()

interface A{
  run: string
}
interface B {
  build: string
}
let fn = (type: A | B):void =>{
  console.log((<A>type).run)
}


let div:NodeListOf<HTMLElement | HTMLDivElement> = document.querySelectorAll('div, footer')