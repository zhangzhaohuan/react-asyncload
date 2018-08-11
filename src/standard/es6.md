<style>
  .js-summary{
    position:fixed;
    padding:5px 10px;
    background:#FAFAFA;
    right:70px;
    top:60px;
    width:165px;
    border:1px solid rgba(0,0,0,.07);
    font-size: 12px !important;
    opacity: .6;
    transition: all .3s;
  }
  .js-summary:hover{
    opacity: 1;
  }
</style>

<div class="js-summary">
  <ol>
    <li><a href="#variables">变量</a></li>
    <li><a href="#strings">字符串</a></li>
    <li><a href="#objects">对象</a></li>
    <li><a href="#functions">函数</a></li>
    <li><a href="#class">类</a></li>
    <li><a href="#modules">模块系统</a></li>
    <li><a href="#others">其他</a></li>
  </ol>
</div>

<a id="table-of-contents"></a>


## 定义

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，ES6的第一个版本，就这样在2015年6月发布了，正式名称就是《ECMAScript 2015标准》（简称ES2015）。2016年6月，小幅修订的《ECMAScript 2016标准》（简称ES2016）如期发布，这个版本可以看作是ES6.1版，因为两者的差异非常小（只新增了数组实例的includes方法和指数运算符），因此，ES6是一个泛指， 含义是5.1版以后的JavaScript的下一代标准，涵盖了ES2015、ES2016等，而ES2015则是正式名称，特指该年发布的正式版本的语言标准。

## 规则

### <a id="variables">变量</a>

* 【强制】 使用 let 或者 const 代替 var

```javascript
// Bad
var x = "y";
var CONFIG = {};

// Good
let x = "y";
const CONFIG = {};
```

* 【强制】 禁止修改被定义为 const 类型的变量

```javascript
// Bad
const a = 0;
a = 1;

const a = 0;
a += 1;

const a = 0;
++a;

for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
  console.log(a);
}

for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
  console.log(a);
}
```

*【推荐】 定义变量应在你需要它的时候，并放在合理的地方 [参考](https://github.com/airbnb/javascript#variables--define-where-used)
	* 解释：`let`、`const`是块级作用域而非函数作用域

```javascript
// bad - unnecessary function call
function checkName(hasName) {
  const name = getName();

  if (hasName === 'test') {
    return false;
  }

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }

  const name = getName();

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}
```

*【推荐】 如果变量值未被修改，建议使用 const 来定义变量

```javascript
// Normal
let a = 3;

// Good
const a = 3;
```

*【推荐】 引用类型建议使用 const 定义

```javascript
// Bad
const a = { b: 1 };
a = {};

// Bad
let c = { d: 1 };
c.d = 2;

// Good
const e = { f: 1 };
e.f = 2;
```

**[⬆ 回到顶部](#table-of-contents)**

### <a id="strings">字符串</a>

*【推荐】 建议使用字符串模板替换字符串链接

```javascript
// Normal
var str = "Hello, " + name + "!";
var str = "Time: " + (12 * 60 * 60 * 1000);

// Good
var str = "Hello World!";
var str = `Hello, ${name}!`;
var str = `Time: ${12 * 60 * 60 * 1000}`;
```

**[⬆ 回到顶部](#table-of-contents)**

### <a id="objects">对象</a>

* 【强制】 禁止对象上的键值进行不必要的计算

```javascript
// Bad 
var foo = {["a"]: "b"};

// Good
var foo = {"a": "b"};
```

*【推荐】 使用更加简洁的字面量

```javascript
// Normal
var foo = {
  x: x,
  y: y,
  z: z,
};

var foo = {
  a: function() {},
  b: function() {}
};

// Good
var foo = {x, y, z};

var foo = {
  a() {},
  b() {}
}
```

**[⬆ 回到顶部](#table-of-contents)**

### <a id="functions">函数</a>

* 【强制】 禁止使用箭头函数当它可以与比较混淆时

```javascript
// Bad
var x = a => 1 ? 2 : 3;
var x = (a) => 1 ? 2 : 3;
var x = (a) => (1 ? 2 : 3);
```

*【推荐】 箭头函数的函数主体部分应被大括号包裹 

```javascript
// Normal
let foo = () => 0;

// Good 
let foo = () => {
  return 0;
};
let foo = (retv, name) => {
  retv[name] = true;
  return retv;
};
```

*【推荐】 箭头函数的参数应被小括号包裹

```javascript
// Normal
a => {}

// Good
(a) => {}
```

*【推荐】 建议回调函数使用箭头函数

```javascript
// Normal
foo(function(a) { return a; });
foo(function() { return this.a; }.bind(this));

// Good
foo(a => a);
foo(function*() { yield; });
```

* 【强制】 generator函数中一定要存在yield

```javascript
// Bad
function* foo() {
  return 10;
}

// Good
function* foo() {
  yield 5;
  return 10;
}

function foo() {
  return 10;
}
```

*【推荐】 建议使用剩余参数代替arguments

```javascript
// Normal
function foo() {
  console.log(arguments);
}

// Good
function foo(...args) {
  console.log(args);
}
function foo(action, ...args) {
  action.apply(null, args);
}
```

*【推荐】 建议使用 Reflect 当适用的时候

```javascript
// Normal
myFunction.apply(undefined, args);
myFunction.apply(null, args);
obj.myMethod.apply(obj, args);
obj.myMethod.apply(other, args);

myFunction.call(undefined, arg);
myFunction.call(null, arg);
obj.myMethod.call(obj, arg);
obj.myMethod.call(other, arg);

// Good
Reflect.apply(myFunction, undefined, args);
Reflect.apply(myFunction, null, args);
Reflect.apply(obj.myMethod, obj, args);
Reflect.apply(obj.myMethod, other, args);
Reflect.apply(myFunction, undefined, [arg]);
Reflect.apply(myFunction, null, [arg]);
Reflect.apply(obj.myMethod, obj, [arg]);
Reflect.apply(obj.myMethod, other, [arg]);
```

**[⬆ 回到顶部](#table-of-contents)**

### <a id="class">类</a>

* 【强制】 不允许修改类声明的变量

```javascript
// Bad 
class A { }
A = 0;

A = 0;
class A { }
```

* 【强制】 在类成员中禁止重复名称

```javascript
// Bad
class Foo {
  bar() { }
  bar() { }
}

class Foo {
  bar() { }
  get bar() { }
}

class Foo {
  static bar() { }
  static bar() { }
}
```

```javascript
// Good
class Foo {
  bar() { }
  qux() { }
}

class Foo {
  get bar() { }
  set bar(value) { }
}

class Foo {
  static bar() { }
  bar() { }
}
```

* 【强制】 继承类的构造函数一定调用 super(), 非继承类的构造函数一定不调用 super()

```javascript
// Bad
class A {
  constructor() {
    super();  // This is a SyntaxError.
  }
}

class A extends B {
  constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class A extends null {
  constructor() {
    super();  // Would throw a TypeError.
  }
}

class A extends null {
  constructor() { }  // Would throw a ReferenceError.
}
```
```javascript
// Good
class A {
  constructor() { }
}

class A extends B {
  constructor() {
    super();
  }
}
```

* 【强制】 禁止在构造函数的 super() 执行之前使用 this

```javascript
// Bad
class A extends B {
  constructor() {
    this.a = 0;
    super();
  }
}

class A extends B {
  constructor() {
    this.foo();
    super();
  }
}

class A extends B {
  constructor() {
    super.foo();
    super();
  }
}

class A extends B {
  constructor() {
    super(this.foo());
  }
}
```

```javascript
// Good
class A {
  constructor() {
    this.a = 0; // OK, this class doesn't have an `extends` clause.
  }
}

class A extends B {
  constructor() {
    super();
    this.a = 0; // OK, this is after `super()`.
  }
}

class A extends B {
  foo() {
    this.a = 0; // OK. this is not in a constructor.
  }
}
```

* 【强制】 禁止使用无用的构造函数

```javascript
// Bad
class A {
  constructor () {
  }
}

class A extends B {
  constructor (...args) {
    super(...args);
  }
}

// Good 
class A { }

class A {
  constructor () {
    doSomething();
  }
}

class A extends B {
  constructor() {
    super('foo');
  }
}

class A extends B {
  constructor() {
    super();
    doSomething();
  }
}
```

**[⬆ 回到顶部](#table-of-contents)**

### <a id="modules">模块系统</a>

* 【强制】 禁止重复引用

```javascript
// Bad
import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';

// Good
import { merge, find } from 'module';
import something from 'another-module';
```

* 【强制】 禁止使用导入、导出、解构的重命名功能时重命名为何之前一样的名字

```javascript
// Bad
import { foo as foo } from "bar";
export { foo as foo };
export { foo as foo } from "bar";
let { foo: foo } = bar;
let { 'foo': foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}
```

```javascript
// Good
import * as foo from "foo";
import { foo } from "bar";
import { foo as bar } from "baz";

export { foo };
export { foo as bar };
export { foo as bar } from "foo";

let { foo } = bar;
let { foo: bar } = baz;
let { [foo]: foo } = bar;

function foo({ bar }) {}
function foo({ bar: baz }) {}

({ foo }) => {}
({ foo: bar }) => {}
```

*【推荐】 建议使用 import export 来取代非标准的CMD AMD等

```javascript
// Normal
const _ = require('lodash');

// Good
import * as _ from 'lodash';
```

**[⬆ 回到顶部](#table-of-contents)**

### <a id="others">其他</a>

* 【强制】 Symbol函数前不能使用new命令

```javascript
// Bad
var foo = new Symbol('foo');

// Good
var foo = Symbol('foo');
```

*【推荐】 使用Symbol函数最好传入描述

```javascript
// Normal
var foo = Symbol();

// Good
var foo = Symbol("some description");
```

* 【强制】 禁止使用 parseInt() 当用到二进制，八进制，十六进制的时候

```javascript
// Bad
parseInt("111110111", 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 255;

// Good
parseInt(1);
parseInt(1, 3);

0b111110111 === 503;
0o767 === 503;
0x1F7 === 503;

a[parseInt](1,2);

parseInt(foo);
parseInt(foo, 2)
```

**[⬆ 回到顶部](#table-of-contents)**
















 