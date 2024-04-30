# typescript 学习

## 搭建环境

### 下载 ts

```
npm i typescript -g
```

### 验证是否下载成功

```
tsc -v
```
### 下载 ts-node

```shell
npm i ts-node -g
```
ts-node 可以自动监听 ts 文件的变化
```
ts-node index.ts
```
ts-node 可以直接运行 ts 文件

### 下载 node 的ts类型

```
npm i @types/node -D
```

### 切换到项目目录中，运行下面的命令

```
tsc --init 
```
这行命令会初始化 tsc（会生成一个ts.config.json文件）

### 新建一个ts文件，编写 ts 代码，运行下面的命令

如果已经下载了 ts-node 使用ts-node 就可以，不需要运行这行命令
```
tsc -w 
```
这行命令会监听 ts 文件变化

## typescipt 类型

### typescript 类型包括的范围

* any 任意类型 unknown 不知道的类型
* 1. top type 顶级类型: any  unknown
* 2. 构造函数类型：Object
* 3. 构造函数类型：Number String Boolean
* 4. 构造函数生成的实例类型：number string  boolean
* 5. 各式各样的数据类型：1   ''  false
* 6. 最底层的类型：never

```js
let a:Object = 123
let a1:Object = '123'
let a2:Object = []
let a3:Object = {}
let a4:Object = () =>{}
```

```js
let a:object = 123 // 错误
let a1:object = '123' // 错误
let a2:object = []
let a3:object = {}
let a4:object = ()=>{}
```

```js
let a:{} = 123 // 错误
let a1:{} = '123' // 错误
let a2:{} = []
let a3:{} = {}
let a4:{} = ()=>{}
// 但是无法操作内部属性
a.age = 345 // 错误
```
## any

any 包括除 unknown 以外的所有其他类型，所以typescript也叫 anyscript [手动狗头]

## unknown

* unknown 只能赋值给自身或者any
* unknown 不可以读取属性，也不能调用方法
* unknown 比 any 更安全

```js
let obj:unknown = { name: '', handle: ()=>{}}

// console.log(obj.name);
// obj.unknown()
```


## interface

* 不能多属性，也不能少属性
* 如果有两个同名 interface ，ts 会把 interface 内部的属性会进行合并
* 在 interface 中含有未知的 key 时，可以使用索引签名来定义
* interface 在属性后面添加?，表示该属性为可选，
* interface 在属性前面添加readonly关键字，表示该属性为只读，不可修改
* interface 接口继承
* interface 定义函数类型

```js
interface Person{
  name: string,
  age?: number,
  [propName.string]: any, // 索引签名
  readonly id: number,
  readonly cb: ()=>boolean
}

interface Person{
  gender: string
}

interface SuperPerson extends Person{  // 接口继承
  skill: string
}
let a:Person = {
  name: 'red',
  age: 18,
  gender: '123',
  ab: 1,
  bc: 'green'
}
let a:Person = {
  name: 'red',
  age: 18,
  gender: '123',
  ab: 1,
  bc: 'green',
  skill: '分身术'
}
```

```js
interface Fn{  // 定义函数类型
  (name:string):number[]
}

let fn:Fn = function(name){
  return [1]
}
```

## 数组类型

* number[]
* Array<boolean>
* 数组普通类型
 
 ```js
// 定义对象数组使用 interface
  interface X{
    name: string,
    age?: number
  }
  let arr:X[] = [{name:'red'}, {name:' green'}]
```
### 二维数组

* number[][]
* Array<Array<number>>


### 包括多种数据类型的数组类型

* any[]
* [number, string, boolean, {}] （元组）


```js
function a(...args:string[]){
  console.log(...args)
}

a('1','2')
```

```js
function a(...args:string[]){
  let b:IArguments = arguments
}

a('1','2')
// IArguments 等同于下面的 interface 
interface A{
  callee: Function,
  length: number,
  [index: number]: any
}
```

## 函数类型

1. 函数定义类型和返回类型 ｜ 函数定义类型和返回类型
2. 函数默认参数 ｜ 函数可选参数
3. 参数是一个对象如何定义
4. 函数 this 类型
5. 函数重载
 
```js
function add(a:number, b:number):number{
  return a+b
}
const add = (a:number, b:number):number => a+b
// 2. 函数默认参数 ｜ 函数可选参数
function add(a:number = 10, b?:number):number{
  return a+b
}
// 3. 参数是一个对象如何定义
interface User = {
  name: String,
  age: number
}
function add(user: User):User {
  return user
}
// 4. 函数 this 类型
interface Obj = {
  user: number[],
  add: (this:Obj, num:number)=> void
}
// ts 可以定义 this 的类型，在 js中无法使用 必须是第一个参数定义 this 的类型
let obj:Obj = {
  user: [1,2],
  add(this:Obj, num:number) {
    return this.user.push(num)
  } 
}
obj.add(4)
// 5. 函数重载
let user:number[] = [1,2,3]
function findNum(id:number):number[] // 如果传入的是id，就是单个查询
function findNum():number[]  // 如果没有传入参数，就是查询全部
function findNum(ids?: number[]| number):number[]{
  if(typeof ids === 'number'){
    return users.filter(v => v == ids)
  }else if(Array.isArray(ids)){
    user.push(...ids)  // 添加 id
    return user
  }else{
    return user
  }
  return 
}
findNum(1)
findNum()
findNum([4,5,6])
``` 

## 联合类型

```js
let a:number | string = '0234'

let fn = function (type: number | boolean):boolean {
  return !!type
}

fn(1)
fn(false)
```

## 交叉类型

```js
interface People {
  name: string,
  age: number
}
interface Man{
  sex: number
}
const newMan = (man: People & Man):void => {}
newMan({
  name: 'red',
  age: 18,
  sex: 1
})
```

## 类型断言

```js
let fn = function (num: number | string):void {
  console.log((num as string).length) // 断言的第一种写法
}
fn(123) // undefined
fn('123') // 3


interface A{
  run: string
}
interface B {
  build: string
}
let fn = (type: A | B):void =>{
  console.log((<A>type).run)  // 断言的第二种写法
}

fn({run: '123'})
fn({build: '456'})


(window as any).abc = '123'
```


## 内置对象（浏览器对象）

```js
let num:Number = new Number(1)
let date:Date = new Date()
let reg:RegExp = new RegExp(/\w/)
let err:Error = new Error()
let xhr:XMLHttpRequest = new XMLHttpRequest()
```

```js
// HTML (元素名称) Element HTMLElement
let div = document.querySelector('div')
let div = document.querySelector('div') as HTMLElement

let div:NodeList = document.querySelectorAll('div')
div.forEach()


let div:NodeListOf<HTMLElement | HTMLDivElement> = document.querySelectorAll('div, footer')


let local:Storage = localStorage
let lo:Location = location
let cookie:string = document.cookie // 注意

let promise:Promise<number> = new Promise((r)=>r(1))

promise.then(res => {
  // 输入 res. 会有语法提示，弹出 number 类型的方法
})
```

## class

1. class 的基本用法 继承 和 类型约束 implements
2. class 的修饰符 
   1. readonly private（私有方法，只能在内部使用） 
   2. protected（在内部和子类中使用） 
   3. public（默认所有方法都是public，内部外部都可以使用）
3. super 原理 
4. 静态方法
5. get set

```js
interface Options{
  el: string | HTMLElement
}

interface VueCls {
  options: Options,
  init(): void
}

interface Vnode {
  tag: string,
  text?: string,
  children: Vnode[]
}

class Dom {
  private createElement(el: string){
    return document.createElement(el)
  },
  setText(el: HTMLElement, text: string | null){
    el.textContent = text
  },
  render(data: Vnode){
    let root = document.createElement(data.tag)
    if(data.children && Array.isArray(data.children)){
      data.children.forEach(item => {
        let child = this.render(item)
        root.appendChild(child)
      })
    }else{
      this.setText(root, data.text)
    }
    return root 
  }
}
class Vue extends Dom implements VueCls{
  readonly options: Options,
  constructor(options: Options){
    super() // 父类的prototype.constructor.call
    this.options = options
    this.init()
    // super.render() // 调用父类的 render 方法
  },
  static version(){ // 静态方法
    // 静态方法只能调用其他的静态方法
    return '1.0.0'
  }
  init(): void {
    let data: Vnode ={
      tag: 'div',
      children: [
        {
          tag: 'div',
          text: '子节点1'
        },
        {
          tag: 'div',
          text: '子节点2'
        }
      ]
    }
    
    let app = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el
    app.appendChild(this.render(data))
  }
}

new Vue({
  el: '#app'
})
```

```js
class Ref {
  _value: any,
  constructor(value: any){
    this._value = value
  },
  get value(){
    return this._value + '123'
  },
  set value(newValue){
    this._value = newValue + 'set'
  }
}

const ref = new Ref('哈哈哈')
console.log(ref.value)
```

## 抽象类

* abstract 所定义的抽象类
* abstract 所定义的方法 都只能描述不能进行一个实现
* 抽象类无法被实例化

```js
abstract class Vue {
  name: string,
  constructor(name?: string){
    this.name = name
  },
  getName():string{
    return this.name
  }
  abstract init(name:string):void 
}

class React extends Vue { // 派生类
  constructor(){
    super()
  }
  init(name: string){

  }
  setName(name:string){
    this.name = name
  }
}

const react = new React()
react.setName('123')

console.log(react.getName())
```

## 元组类型

```js
let arr:[string, number] = ['2', 3]
arr.push(4) // 可以
arr.push(false) // 不可以，越界元素，只能添加元组内定义的类型

const arr:readonly[x:string, y?:number] = ['1']

let excel:[string, string, number][] = [
  ['mike', '男', 18],
  ['mike', '男', 18],
  ['mike', '男', 18],
]


const arr:readonly[x:string, y:number] = ['1', 2]
type first = typeof arr[0]  // number
type first = typeof arr['length'] // 2
```

## 枚举类型

1. 数字枚举
```js
enum Color{
  red,
  green, 
  blue
}

console.log(Color.red) // 0
console.log(Color.green) // 1
console.log(Color.blue) // 2
// 自定义枚举
enum Color{
  red = 1,
  green = 5, 
  blue = 6
}
// 增长枚举
enum Color{
  red = 1,
  green, 
  blue
}

console.log(Color.red) // 1
console.log(Color.green) // 2
console.log(Color.blue) // 3
```

2. 字符串枚举
```js
enum Color{
  red = 'red'
  green = 'green'
  blue = 'blue'
}
```

3. 异构枚举
```js
enum Color{
  yes = 1,
  no = '2'
}
```
4. 接口枚举

```js
   enum Types {
      yyds,
      dddd
   }
   interface A {
      red:Types.yyds
   }
 
   let obj:A = {
      red:Types.yyds
   }
```

5. const 枚举
  
let  和 var 都是不允许的声明只能使用const

编译后：

* const 声明的枚举会被编译成常量
* 普通声明的枚举编译完后是个对象


```js
const enum Types{
   No = "No",
   Yes = 1,
}
```

6. 反向映射


```js
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fall
```
字符串不支持 反向映射

```js
enum Enum {
   success = '456' // 这里不支持字符串
}
let success:string = Enum.success;
let key = Enum[success]
```

## 类型推论

1. 声明变量赋值，没有定义类型
2. 声明变量不赋值，没有定义类型

```js
let str = '345'
str = 123 // 报错
str = '123' // 正确
```

```js
let str

str = 123 // 正确
str = '123' // 正确
str = true // 正确
```

## 类型别名

* 定义类型别名
* 定义函数别名
* 定义联合类型别名
* 定义值的别名

```js
type str = string
 
 
let s:str = "345"
 
console.log(s);
```

```js
type str = () => string
 
 
let s: str = () => "6"
 
console.log(s);
```

```js
type str = string | number
 
 
let s: str = 123
 
let s2: str = '123'
 
console.log(s,s2);
```

```js
type value = boolean | 0 | '213'
 
 
let s:value = true
//变量s的值  只能是上面value定义的值
```

### type 和 interface 的区别

1. interface 可以使用 extends 关键字进行继承，type 不可以继承
2. type 可以使用联合类型或交叉类型，interface 不可以
3. interface 遇到重名的会合并内部属性， type 不可以出现重名的情况


### type 高级用法

extends 关键字

```js
type a = 1 extends number ? 1 : 0 //1
 
type a = 1 extends Number ? 1 : 0 //1
 
type a = 1 extends Object ? 1 : 0 //1
 
type a = 1 extends any ? 1 : 0 //1
 
type a = 1 extends unknow ? 1 : 0 //1
 
type a = 1 extends never ? 1 : 0 //0
```

## never

```js
// 返回never的函数必须存在无法达到的终点
 
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}
 
// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
}
```

### never 和 void 的区别

1. void类型只是没有返回值 但本身不会出错， never 只会抛出异常没有返回值

```js
    function Void():void {
        console.log();
    }
 
   
    function Never():never {
      throw new Error('aaa')
    }
```

2. 当我们鼠标移上去的时候会发现 只有void和number，never在联合类型中会被直接移除

```js
type A = void | number | never
```

### never 常见的应用场景

```js
type A = '小杯' | '大杯' | '超大杯' 
 
function isXiaoMan(value:A) {
   switch (value) {
       case "小杯":
           break 
       case "大杯":
          break 
       case "超大杯":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}
```

## Symbol

Symbol 会创建一个唯一的值
```js
let a1:symbol = Symbol(1)
let a2:symbol = Symbol(1)

a1 == a2 // false

// 创建两个相同的 symbol 的方法
Symbol.for(1) === Symbol.for(1) // true 

// Symbol.for 会在 全局Symbol 中查找有没有注册过这个 key，如果有则直接用，如果没有则创建一个
```
for in 遍历、Object.keys 遍历、getOwnPropertyNames、 JSON.stringfy 都无法拿到对象中的 symbol
```js
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```

如何拿到 对象中的 symbol 属性

```js
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))  // 只拿到了对象中为 symbol 的key
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))  // 拿到了对象中全部的key
```

## 生成器

```js
function* gen(){
  yield Promise.resolve('1')
  yield '2'
  yield '3'
  yield '4'
}

const man = gen()
console.log(man.next());  //{ value: 1, done: false }
console.log(man.next());  //{ value: 2, done: false }
console.log(man.next());  //{ value: 3, done: false }
console.log(man.next());  //{ value: 4, done: false }
console.log(man.next());  //{ value: undefined, done: true }
```

## 迭代器

支持遍历大部分类型迭代器 arr nodeList argumetns set map 等

```js
var arr = [1,2,3,4];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: 4, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```

### 使用 iterator 实现 for of 

```js
function each(value: any){
  let It:any = value[Symbol.iterator]()
  let next:any = {done:false}
  while(!next.done){
    next = It.next()
    if(!next.done){
      console.log(next.value)
    }
  }
}
// each(arr)
```

### for of 迭代器的语法糖

```js
for (let value of map) {
    console.log(value)
}
```

### for of 是不能循环对象的，因为对象没有 iterator 

### 数组解构的原理其实也是调用迭代器的

```js
var [a,b,c] = [1,2,3]
 
var x = [...xxxx]
```

### 自己实现一个迭代器来使对象支持 iterator

```js
 
const obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
        return {
            max: this.max,
            current: this.current,
            next() {
                if (this.current == this.max) {
                    return {
                        value: undefined,
                        done: true
                    }
                } else {
                    return {
                        value: this.current++,
                        done: false
                    }
                }
            }
        }
    }
}
console.log([...obj])
 
for (let val of obj) {
   console.log(val);
   
}
```
