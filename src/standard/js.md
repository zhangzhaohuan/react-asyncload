
本章内容为ES5规约，ES6请参考 [ES6规约](./4.es2015-style-guide.html)

> 对当前规约有更好的建议，请到 [issue](http://gitlab.alibaba-inc.com/f2e-specs/style-guide/issues) 页面反馈给我们，谢谢！

## <a id="utf8">编码</a>

  - 使用 utf-8 编码



## <a id="strict">严格模式</a>

  - 【强制】总是在 js 文件头部声明使用严格模式，这样可以使代码更加健壮，参考 [MDN 严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

  ```javascript
  'use strict';

  // ...
  ```



## <a id="whitespace">空格与缩进</a>

  - 使用 2 个空格作为缩进。

    ```javascript
    // bad
    function () {
    ∙∙∙∙var name;
    }

    // bad
    function () {
    ∙var name;
    }

    // good
    function () {
    ∙∙var name;
    }
    ```

  - 在大括号前放一个空格。

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog'
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog'
    });
    ```

  - 在控制语句（`if`、`while` 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格。

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

  - 使用空格把运算符隔开，二元运算符两侧须有一个空格，一元运算符与操作对象之间没有空格。

    ```javascript
    // bad
    var x=y+5;

    // good
    var x = y + 5;

    // bad
    var isRight = result === 0? false: true;

    // good
    var isRight = result === 0 ? false : true;

    // bad
    var a=!arr.length;
    a ++;

    // good
    var a = !arr.length;
    a++;
    ```

  - 在文件末尾插入一个空行。

    ```javascript
    // bad
    (function (global) {
      // ...stuff...
    })(this);
    ```

    ```javascript
    // bad
    (function (global) {
      // ...stuff...
    })(this);↵
    ↵
    ```

    ```javascript
    // good
    (function (global) {
      // ...stuff...
    })(this);↵
    ```

  - key, value 之间只需要一个空格，因为这样更加自然与易读。

  ```javascript
  // bad
  {
  	a           : 'short',
    looooongname: 'long'
  }

  // bad
  {
    a:            'short',
    looooongname: 'long'
  }

  // good
  {
    a: 'short',
    looooongname: 'long'
  }
  ```

  - switch 下的 case 和 default 须增加一个缩进层级。[ESlint参考](http://eslint.org/docs/rules/indent#switchcase)

  ```javascript
  // bad
  switch (a) {
  case "a":
    break;
  case "b":
    break;
  default:
    // do ...
  }

  // good
  swtich (a) {
    case "a":
      break;
    case "b":
      break;
    default:
      // do ...
  }
  ```

  - 在使用长方法链时进行缩进。使用前面的点 `.` 强调这是方法调用而不是新语句。

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    var leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);
    ```

  - 在块末和新语句前插入空行。

    ```javascript
    // bad
    if (foo) {
      return bar;
    }
    return baz;

    // good
    if (foo) {
      return bar;
    }

    return baz;

    // bad
    var obj = {
      foo: function () {
      },
      bar: function () {
      }
    };
    return obj;

    // good
    var obj = {
      foo: function () {
      },

      bar: function () {
      }
    };

    return obj;
    ```




## <a id="blocks">块</a>

  - 使用大括号包裹所有的多行代码块。

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function () { return false; }

    // good
    function () {
      return false;
    }
    ```

  - 如果通过 `if` 和 `else` 使用多行代码块，把 `else` 放在 `if` 代码块关闭括号的同一行。

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```



## <a id="commas">逗号</a>

  - **不使用**行首逗号。

    ```javascript
    // bad
    var story = [
        once
      , upon
      , aTime
    ];

    // good
    var story = [
      once,
      upon,
      aTime
    ];

    // bad
    var hero = {
        firstName: 'Bob'
      , lastName: 'Parr'
      , heroName: 'Mr. Incredible'
      , superPower: 'strength'
    };

    // good
    var hero = {
      firstName: 'Bob',
      lastName: 'Parr',
      heroName: 'Mr. Incredible',
      superPower: 'strength'
    };
    ```

  - **不使用**额外的行末逗号。这样做会在 IE6/7 和 IE9 怪异模式下引起问题。另外，多余的逗号在某些 ES3 的实现里会增加数组的长度。

    ```javascript
    // bad
    var hero = {
      firstName: 'Kevin',
      lastName: 'Flynn',
    };

    var heroes = [
      'Batman',
      'Superman',
    ];

    // good
    var hero = {
      firstName: 'Kevin',
      lastName: 'Flynn'
    };

    var heroes = [
      'Batman',
      'Superman'
    ];
    ```



## <a id="semicolons">分号</a>

  - 【强制】**使用分号。**

    ```javascript
    // bad
    (function () {
      var name = 'Skywalker'
      return name
    })()

    // good
    (function () {
      var name = 'Skywalker';
      return name;
    })();

    // good (防止函数在两个 IIFE 合并时被当成一个参数
    ;(function () {
      var name = 'Skywalker';
      return name;
    })();
    ```

    [了解更多](http://stackoverflow.com/a/7365214/1712802).




## <a id="objects">对象</a>

  - 使用字面量创建对象。

    ```javascript
    // bad
    var item = new Object();

    // good
    var item = {};
    ```

  - 不要使用[保留字](http://es5.github.io/#x7.6.1)作为键名，它们在 IE8 下不工作。[更多信息](https://github.com/airbnb/javascript/issues/61)

    ```javascript
    // bad
    var superman = {
      default: { clark: 'kent' },
      private: true
    };

    // good
    var superman = {
      defaults: { clark: 'kent' },
      hidden: true
    };
    ```

  - 使用同义词替换需要使用的保留字。

    ```javascript
    // bad
    var superman = {
      class: 'alien'
    };

    // bad
    var superman = {
      klass: 'alien'
    };

    // good
    var superman = {
      type: 'alien'
    };
    ```



## <a id="arrays">数组</a>

  - 使用字面量创建数组。

    ```javascript
    // bad
    var items = new Array();

    // good
    var items = [];
    ```

  - 使用 Array#push 向数组增加元素。

    ```javascript
    var someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  - 当你需要拷贝数组时，使用 Array#slice。[jsPerf](http://jsperf.com/converting-arguments-to-an-array/7)

    ```javascript
    var len = items.length;
    var itemsCopy = [];
    var i;

    // bad
    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    itemsCopy = items.slice();
    ```

  - 使用 Array#slice 将类数组对象转换成数组。

    ```javascript
    function trigger() {
      var args = Array.prototype.slice.call(arguments);
      ...
    }
    ```




## <a id="strings">字符串</a>

  - 使用单引号 `''` 包裹字符串。

    ```javascript
    // bad
    var name = "Bob Parr";

    // good
    var name = 'Bob Parr';

    // bad
    var fullName = "Bob " + this.lastName;

    // good
    var fullName = 'Bob ' + this.lastName;
    ```

  - 超过 100 个字符的字符串应该使用连接符写成多行。
  - 注：若过度使用，通过连接符连接的长字符串可能会影响性能。[jsPerf](http://jsperf.com/ya-string-concat) & [讨论](https://github.com/airbnb/javascript/issues/40).

    ```javascript
    // bad
    var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    var errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    var errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

  - 程序化生成的字符串使用 Array#join 连接而不是使用连接符。尤其是 IE 下：[jsPerf](http://jsperf.com/string-vs-array-concat/2).

    ```javascript
    var items;
    var messages;
    var length;
    var i;

    messages = [{
      state: 'success',
      message: 'This one worked.'
    }, {
      state: 'success',
      message: 'This one worked as well.'
    }, {
      state: 'error',
      message: 'This one did not work.'
    }];

    length = messages.length;

    // bad
    function inbox(messages) {
      items = '<ul>';

      for (i = 0; i < length; i++) {
        items += '<li>' + messages[i].message + '</li>';
      }

      return items + '</ul>';
    }

    // good
    function inbox(messages) {
      items = [];

      for (i = 0; i < length; i++) {
        // use direct assignment in this case because we're micro-optimizing.
        items[i] = '<li>' + messages[i].message + '</li>';
      }

      return '<ul>' + items.join('') + '</ul>';
    }
    ```




## <a id="functions">函数</a>

  - 函数表达式：

    ```javascript
    // 匿名函数表达式
    var anonymous = function() {
      return true;
    };

    // 命名函数表达式
    var named = function named() {
      return true;
    };

    // 立即调用的函数表达式（IIFE）
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

  - 【强制】不要在非函数块（if, while 等）里声明函数，如有需要，可以把函数赋值给一个变量。浏览器允许你这么做，但它们的解析表现不一致。
  - **注：** ECMA-262 把 `块` 定义为一组语句。函数声明不是语句。[阅读对 ECMA-262 这个问题的说明](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97)。

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    var test;
    if (currentUser) {
      test = function test() {
        console.log('Yup.');
      };
    }
    ```
  - 函数或方法传递的参数最好不要超过三个
  - [JSHint参考](http://jshint.com/docs/options/#maxparams)、[ESLint参考](http://eslint.org/docs/rules/max-params)

    ```javascript
    // bad
    function foo (bar, baz, qux, qxx) {
      doSomething();
    }

    // good
    function foo (bar, baz, qux) {
      doSomething();
    }
    ```

  - 【强制】永远不要把参数命名为 `arguments`。这将取代函数作用域内的 `arguments` 对象。

    ```javascript
    // bad
    function nope(name, options, arguments) {
      // ...stuff...
    }

    // good
    function yup(name, options, args) {
      // ...stuff...
    }
    ```





## <a id="properties">属性</a>

  - 使用 `.` 来访问对象的属性。

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    // bad
    var isJedi = luke['jedi'];

    // good
    var isJedi = luke.jedi;
    ```

  - 当通过变量访问属性时使用中括号 `[]`。

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    function getProp(prop) {
      return luke[prop];
    }

    var isJedi = getProp('jedi');
    ```




## <a id="variables">变量</a>

  - 总是使用 `var` 来声明变量。不这么做将导致产生全局变量。我们要避免污染全局命名空间。

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    var superPower = new SuperPower();
    ```

  - 使用多个 `var` 声明多个变量。这样做更易于增删，不发生遗漏 `var` 而导致全局变量的风险，也不用再担心调换错 `;` 跟 `,`。

    ```javascript
    // bad
    var items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // （跟上面的代码比较一下，看看哪里错了）
    var items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    var items = getItems();
    var goSportsTeam = true;
    var dragonball = 'z';
    ```

  - 最后再声明未赋值的变量。当你需要引用前面的变量赋值时这将变的很有用。

    ```javascript
    // bad
    var i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    var i;
    var items = getItems();
    var dragonball;
    var goSportsTeam = true;
    var len;

    // good
    var items = getItems();
    var goSportsTeam = true;
    var dragonball;
    var length;
    var i;
    ```

  - 在作用域顶部声明变量。这将帮你避免变量声明提升相关的问题。

    ```javascript
    // bad
    function () {
      test();
      console.log('doing stuff..');

      //..other stuff..

      var name = getName();

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // good
    function () {
      var name = getName();

      test();
      console.log('doing stuff..');

      //..other stuff..

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // bad - 不必要的函数调用
    function () {
      var name = getName();

      if (!arguments.length) {
        return false;
      }

      this.setFirstName(name);

      return true;
    }

    // good
    function () {
      var name;

      if (!arguments.length) {
        return false;
      }

      name = getName();
      this.setFirstName(name);

      return true;
    }
    ```



## <a id="hoisting">声明提升</a>

  - 变量声明会提升至作用域顶部，但赋值不会。

    ```javascript
    // 我们知道这样不能正常工作（假设这里没有名为 notDefined 的全局变量）
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // 但由于变量声明提升的原因，在一个变量引用后再创建它的变量声明将可以正常工作。
    // 注：变量赋值为 `true` 不会提升。
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // 解释器会把变量声明提升到作用域顶部，意味着我们的例子将被重写成：
    function example() {
      var declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }
    ```

  - 匿名函数表达式会提升它们的变量名，但不会提升函数的赋值。

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }
    ```

  - 命名函数表达式会提升变量名，但不会提升函数名或函数体。

    ```javascript
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // 当函数名跟变量名一样时，表现也是如此。
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      }
    }
    ```

  - 函数声明提升它们的名字和函数体。

    ```javascript
    function example() {
      superPower(); // => Flying

      function superPower() {
        console.log('Flying');
      }
    }
    ```

  - 了解更多信息在 [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting) by [Ben Cherry](http://www.adequatelygood.com/).




## <a id="comparison-operators--equality">比较运算符 & 等号</a>

  - 尽量使用 `===` 和 `!==` 而不是 `==` 和 `!=`.
  - 条件表达式（例如 `if` 语句）通过抽象方法 `ToBoolean` 强制计算它们的表达式，并且总是遵守下面的规则：

    + **对象** 被计算为 **true**
    + **Undefined** 被计算为 **false**
    + **Null** 被计算为 **false**
    + **布尔值** 被计算为 **布尔的值**
    + **数字** 如果是 **+0、-0 或 NaN** 被计算为 **false**，否则为 **true**
    + **字符串** 如果是空字符串 `''` 被计算为 **false**，否则为 **true**

    ```javascript
    if ([0]) {
      // true
      // 一个数组就是一个对象，对象被计算为 true
    }
    ```

  - 使用 shortcuts

    ```javascript
    // bad
    if (name !== '') {
      // ...stuff...
    }

    // good
    if (name) {
      // ...stuff...
    }

    // bad
    if (collection.length > 0) {
      // ...stuff...
    }

    // good
    if (collection.length) {
      // ...stuff...
    }
    ```



## <a id="type-casting--coercion">类型转换</a>

  - 在语句开始时执行类型转换。
  - 字符串：建议使用强制类型转换

    ```javascript
    //  => this.reviewScore = 9;

    // bad
    var totalScore = this.reviewScore + '';

    // good
    var totalScore = String(this.reviewScore);
    // also good
    var totalScore = '' + this.reviewScore;

    // bad
    var totalScore = '' + this.reviewScore + ' total score';

    // good
    var totalScore = this.reviewScore + ' total score';
    ```

  - 【强制】使用 `parseInt` 转换数字时总是带上类型转换的基数。备注：parseFloat 方法没有基数参数

    ```javascript
    var inputValue = '4';

    // bad
    var val = new Number(inputValue);

    // bad
    var val = +inputValue;

    // bad
    var val = inputValue >> 0;

    // bad
    var val = parseInt(inputValue);

    // good
    var val = Number(inputValue);

    // good
    var val = parseInt(inputValue, 10);
    ```

  - 布尔:

    ```javascript
    var age = 0;

    // bad
    var hasAge = new Boolean(age);

    // good
    var hasAge = Boolean(age);

    // good
    var hasAge = !!age;
    ```




## <a id="constructors">构造函数</a>

  - 【建议】给对象原型分配方法，而不是使用一个新对象覆盖原型。覆盖原型将导致继承出现问题：重设原型将覆盖原有原型！

    ```javascript
    function Jedi() {
      console.log('new jedi');
    }

    // bad
    Jedi.prototype = {
      fight: function fight() {
        console.log('fighting');
      },

      block: function block() {
        console.log('blocking');
      }
    };

    // good
    Jedi.prototype.fight = function fight() {
      console.log('fighting');
    };

    Jedi.prototype.block = function block() {
      console.log('blocking');
    };
    ```

  - 方法可以返回 `this` 来实现方法链式使用。

    ```javascript
    // bad
    Jedi.prototype.jump = function jump() {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function setHeight(height) {
      this.height = height;
    };

    var luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    Jedi.prototype.jump = function jump() {
      this.jumping = true;
      return this;
    };

    Jedi.prototype.setHeight = function setHeight(height) {
      this.height = height;
      return this;
    };

    var luke = new Jedi();

    luke.jump()
      .setHeight(20);
    ```


  - 写一个自定义的 `toString()` 方法是可以的，但要确保它可以正常工作且不会产生副作用。

    ```javascript
    function Jedi(options) {
      options || (options = {});
      this.name = options.name || 'no name';
    }

    Jedi.prototype.getName = function getName() {
      return this.name;
    };

    Jedi.prototype.toString = function toString() {
      return 'Jedi - ' + this.getName();
    };
    ```



## <a id="modules">模块</a>

  - 【推荐】模块应该以 `!` 开始。这样确保了当一个不好的模块忘记包含最后的分号时，在合并代码到生产环境后不会产生错误。[详细说明](https://github.com/airbnb/javascript/issues/44#issuecomment-13063933)
  - 文件应该以驼峰式命名，并放在同名的文件夹里，且与导出的名字一致。
  - 【推荐】增加一个名为 `noConflict()` 的方法来设置导出的模块为前一个版本并返回它。
  - 【强制】永远在模块顶部声明 `'use strict';`。

    ```javascript
    // fancyInput/fancyInput.js

    !function (global) {
      'use strict';

      var previousFancyInput = global.FancyInput;

      function FancyInput(options) {
        this.options = options || {};
      }

      FancyInput.noConflict = function noConflict() {
        global.FancyInput = previousFancyInput;
        return FancyInput;
      };

      global.FancyInput = FancyInput;
    }(this);
    ```




## <a id="events">事件</a>

  - 【推荐】当给事件附加数据时（无论是 DOM 事件还是私有事件），传入一个对象而不是原始值。这样可以让后面的贡献者增加更多数据到事件数据而无需找出并更新事件的每一个处理器。例如，不好的写法：

    ```js
    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', function (e, listingId) {
      // do something with listingId
    });
    ```

    更好的写法：

    ```js
    // good
    $(this).trigger('listingUpdated', { listingId : listing.id });

    ...

    $(this).on('listingUpdated', function (e, data) {
      // do something with data.listingId
    });
    ```




## <a id="jquery">jQuery</a>

  - 【推荐】使用 `$` 作为存储 jQuery 对象的变量名前缀。

    ```javascript
    // bad
    var sidebar = $('.sidebar');

    // good
    var $sidebar = $('.sidebar');
    ```

  - 【推荐】缓存 jQuery 查询。

    ```javascript
    // bad
    function setSidebar() {
      $('.sidebar').hide();

      // ...stuff...

      $('.sidebar').css({
        'background-color': 'pink'
      });
    }

    // good
    function setSidebar() {
      var $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...stuff...

      $sidebar.css({
        'background-color': 'pink'
      });
    }
    ```

  - 对 DOM 查询使用层叠 `$('.sidebar ul')` 或 父元素 > 子元素 `$('.sidebar > ul')`。 [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)
  - 对有作用域的 jQuery 对象查询使用 `find`。

    ```javascript
    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();
    ```



## <a id="comments">注释规约</a>

### 原则

- 不要为了注释而注释，多余的注释等价于冗余的代码
- 如有必要，注释尽量详尽

注释的目的是：提高代码的可读性，从而提高代码的可维护性。

### 单行注释

单行注释使用 `//`, 一般面向的是语句或者简单逻辑的代码块 (if, for, function)

- 单行注释应以两个斜线开始，以行尾结束，且应在双斜线后加入一个空格以清晰表达注释内容

  ```javascript
  //bad, something to do

  // good, something to do
  ```

- 【推荐】应独立于一行，不要追加在某条语句的后面

  ```javascript
  var active = true;  // bad, is current tab

  // good, is current tab
  var active = true;
  ```

- 【推荐】在单行注释前添加一个空行，便于阅读区分

  ```javascript
  // bad
  function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    var type = this._type || 'no type';

    return type;
  }

  // good
  function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    var type = this._type || 'no type';

    return type;
  }
  ```

### 多行注释

一般情况下，多行注释用于函数/对象/文件。

- 【推荐】多行注释使用 `/** */` 或 `/* */`, 不推荐使用多行的 `//` 来替代 `/**/`.

  ```javascript
  // bad
  // it's foo
  // but not bar
  function foo() {
  }

  // good, it's foo, but not bar
  function foo() {
  }

  /*
   * good
   * it's foo, but not bar
   */
  function foo() {
  }

  /**
   * good
   * it's foo, but not bar
   */
  function foo() {
  }
  ```

对于公共的类/库/组件等代码，面向较多的使用者，推荐使用更为完善的注释规约：

- 函数功能说明，**必选**
- 参考文档链接，可选
- 示例，可选
- 参数说明，可选
- 返回值说明，有则必选
- api 类型(public/private), 可选

如下，是一个良好风格的示例：

  ```javascript
  /**
   * 发送旺旺/邮件的方法
   *
   * Doc: http://api.fed.taobao.net/mc
   *
   * Example:
   *   message(1, '马云', 'Hello')
   *     .then(function(result) {
   *       // 成功逻辑处理
   *     })
   *     .catch(function(err) {
   *       // 错误逻辑处理
   *     });
   *
   * @param {Number}   type     0-旺旺 1-邮件
   * @param {String}   name     旺旺昵称
   * @param {String}   content  消息内容
   * @return {Promise}
   * @api public
   */
  function message(type, name, content) {

    // some code
    return new Promise(function(resolve, reject) {

    });

  };
  ```

### 文件注释

文件注释，即声明在文件头部，描述文件的元信息。文件注释的基本规则：

- 文件描述，**必选**

  ```javascript
  /**
   * 这个文件的作用是什么
   */
  ```

### 协议注释

对于引用的外部框架/库，以及我们自己写的开源库，头部会包含一些开源协议声明的注释，对于这部分的注释，我们是**不希望也不能**将之压缩，这时候需要使用 `/*! */` 的注释方式，如下：

```javascript
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */
```

### 标记注释

平时的写代码的过程，可能会遇到某个地方是个隐藏的 bug, 因为某种原因还没法修复，或者是方法还有一些需要完成的功能，这时候我们需要加上相应的注释告知未来的自己或者是合作者，这里常用的有三种标签：

- `// TODO: How about auto-correcting small spelling errors?`
- `// FIXME: This won't work if the file is missing.`
- `// XXX: This method badly needs refactoring: should switch by core type.`

如下为示例代码：

```javascript
// TODO 需要考虑参数个数不确定的情况
funcion add(a, b) {
  return a + b;
}

function render(data) {
  // FIXME data 为 undefined 时会报错
  if (data.status === 1) {
    // ...
  }
}

// XXX 这里的异常需要处理，否则后续的脚本都没办法执行
JSON.parse(data);
```




## <a id="naming-conventions">命名规约</a>

### 原则

**所有的命名必须有语义，所以永远不要使用单个字符命名。**

### 变量

- 变量声明必须使用 `var`,(ES6语法推荐使用`let`或者`const`) 命名规约统一为**小驼峰命名法**：即第一个单词首字母小写，其余单词的首字母大写。

  ```javascript
  // dirty
  eventType = 'click';

  // bad
  var eventtype = 'click';

  // bad
  var EventType = 'click';

  // good
  var eventType = 'click';
  ```

- 对象字面量命名使用小驼峰

  ```javascript
  // bad
  var Base = {
    isOnline: function() {
      // ...
    }
  };
  return Base;

  // good
  var base = {
    isOnline: function() {
      // ...
    }
  };
  return base;
  ```

### 常量

- 【强制】常量的命名使用全大写字母，多单词使用下划线分开，例如：

  ```javascript
  // good
  var WELCOME_TEXT = 'Hello World';
  ```

### 构造函数/类

- 构造函数/类使用大驼峰命名，即所有单词首字母大写。如下示例：

  ```javascript
  // good
  function MenuButton() {
  }

  MenuButton.prototype.show = function () {
  };
  ```

### 函数名

- 普通函数名使用小驼峰，尽可能的选用动词作为名字。

### 布尔值

- 尽量使用表示状态的词汇来命名布尔值：可以是形容词、副词，或充当状语成分的词组。这种情况下，不要添加诸如 `is`, `has`, `can`
  的前缀，因为那样看上去像是命名一个方法。

  ```javascript
  // good
  this.available = true;
  this.isAvailable = function () {
    return this.available;
  };

  // bad
  this.isAvailable = true;
  ```

- 【推荐】如果无法通过上一种情况来命名，比如描述的目标是一个名词，那么可以添加诸如 `is`, `has`, `can` 的前缀。

  ```javascript
  // good
  this.hasName = true;

  // bad
  this.name = true;
  ```

- 【推荐】使用「表示肯定的」词汇来命名布尔值，而不是「表示否定的」。因为这样更易读，并且 **具有更好的兼容性**：因为如果此变量未定义，那么其默认值为
  `undefined`，等价于 `false`。

  ```javascript
  // good
  this.available = false;

  // bad
  this.unavailable = true;
  ```




## <a id="ecmascript-5-compatibility">ECMAScript 5 兼容性</a>

  - 参考 [Kangax](https://twitter.com/kangax/) 的 ES5 [兼容表](http://kangax.github.com/es5-compat-table/).


## <a id="tools">lint工具</a>

  - [ESLint](http://eslint.org/) - [eslint-config-ais](http://web.npm.alibaba-inc.com/package/@ali/eslint-config-ais) 阅读本规约 [eslint章节](../6.tools/1.eslint.md) 了解更多


## <a id="guide">参考资料</a>

  - [Annotated ECMAScript 5.1](http://es5.github.com/)
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
  - [前端规约指引](http://guide.taobao.net/3.javascript-style-guide.php)
