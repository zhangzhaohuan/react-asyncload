

## 基本规约

由于 Less 可以看做是 CSS 的超集，因此所有适用于 CSS 的规约均适用于 Less。故而其中重复的规约部分不再赘述。

## 规约

### `@import`

`@import` 语句必须声明于文件的头部位置。

```less
// bad
.page {
  width: 960px;
  margin: 0 auto;
}

@import "est/all.less";

// good
@import "est/all.less";

.page {
  width: 960px;
  margin: 0 auto;
}
```

### 变量定义

* 文件全局的变量在全局头部次于 `@import` 的位置声明；局部变量在块的头部位置声明。

```less
// bad
.page {
  width: @width;
  margin: 0 auto;
  
  @width: 960px;
}

// good
.page {
  @width: 960px;
    
  width: @width;
  margin: 0 auto;
}
```

* 变量命名必须使用减号 `-` 连接的形式 `@foo-bar`，不得使用驼峰形式 `@fooBar`。

```less
// bad
@sidebarWidth: 200px;

// good
@sidebar-width: 200px;
```

注意：Less 的变量值总是以同一作用域下最后一个同名变量为准，务必注意后面的设定会覆盖所有之前的设定。

### Mixins

* 使用逗号 `,` 来分隔参数，而不使用分号 `;`。在早期 less 仅使用逗号 `,` 来分隔参数，后来支持使用分号 `;`，为了保证对以往代码的兼容和统一，均使用逗号 `,` 来分隔。

```less
// bad
.size(@w; @h) {
  width: @w;
  height: @h;
}

// good
.size(@w, @h) {
  width: @w;
  height: @h;
}
```
 
在定义 mixin 时，如果 mixin 本身并不作为一段独立的 CSS 描述，而只是给其他 CSS 来调用，
那么在 mixin 名称后必须加上括号 `()`，以防止它被多此一举地输出到 CSS 文件中，甚至污染全局样式。
并且与此同时，在调用此 mixin 时，即使不用传参数，后面也必须加上括号 `()`。

仅用于被调用的 mixin，常常定义在文件的最外层 scope，而不像其他使用 class 选择器的 CSS 描述一般会在选择器的嵌套中定义。
这使得开发者可以在文件中的任意 scope 中都能调用到 mixin。
所以，同样道理，如果这些 mixin 后因为没加括号而被输出到了编译后的 CSS 文件中，那么它们会因为没有嵌套多层的选择器而变得非常容易污染全局样式。

```less
// bad
.big-text {
  font-size: 2em;
}

h3 {
  .big-text;
}

// good
.big-text() {
  font-size: 2em;
}

h3 {
  .big-text();
}
```

* mixin 名称和括号 `()` 间不保留空格。在用逗号 `,` 分隔参数列表时，逗号 `,` 后保留一个空格，前不留空格。

```less
// bad
.box {
  .size(30px,20px);
  .clearfix ();
}

// good
.box {
  .size(30px, 20px);
  .clearfix();
}
```

* 由于 mixin 部分采用 class 名称定义，因此 mixin 命名同 class 命名一样，使用减号 `-` 连接的形式 `@foo-bar`，不得使用驼峰形式 `@fooBar`。
即使是仅用于函数调用的 mixin，也如此。

```less
// bad
.bigText() {
  font-size: 2em;
}

// good
.big-text() {
  font-size: 2em;
}
```

### 继承

使用继承时，如果在声明块内书写 `:extend` 语句，必须写在开头：

```less
// bad
.sub {
  color: red;
  &:extend(.mod all);
}

// good
.sub {
  &:extend(.mod all);
  color: red;
}
```

### 四则运算符

四则运算符 `+` `-` `*` `/` 左右保留一个空格。

```less
// bad
@a: 200px;
@b: (@a+100px)*2;

// good
@a: 200px;
@b: (@a + 100px) * 2;
```


## 参考资料

* [LessCSS.org][less]
* [百度 Less 前端规约][baidu-spec]

[less]: http://lesscss.org
[baidu-spec]: https://github.com/ecomfe/spec/blob/master/less-code-style.md 