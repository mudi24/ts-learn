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