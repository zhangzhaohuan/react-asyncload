# react-router4.0异步加载组件

## 项目启动
```
npm install

npm start
```
### react-router4.0 api
#### \<Route>
* three render methods
  * \<Route component>
    * use React.createElement to create a new React Element
    * will create a new component every render.this results in the existing component unmounting and the new component mounting instead of just updating the existing component 
  * \<Route render>
    * inline rendring
  * \<Route  children>
    * inline rendring
```
//区别 render、children
  <Route exact path="/home" render={(props) => {
    console.log(props.match);
    return <Home />
  }} />

  <Route path="/about" children={(props) => {
    console.log(props.match);
    return <About />
  }} />

//分析：
  地址栏地址为：/about时
  render不执行；children执行
  地址栏地址为：/home时
  render执行；children执行
  地址栏地址为：/other时
  render不执行；children执行
//结论
 无论地址是否匹配，children一直执行，render只有在地址匹配的时候执行。children执行(地址不匹配)时match为null，children执行（地址匹配）时match正常
```

* three props
  * match
  * location
  * history
* exact

| path | location.pathname | exact | matches|
| :------:| :------: | :------: |:------:|
| /home | /home | true |true|
| /home | /home/ | true |false|
| /home | /home/aa | true |false|
<p>总结：exact精确匹配</p>
* strict

| path | location.pathname | strict | matches|
| :------:| :------: | :------: |:------:|
| /home | /home | true |true|
| /home | /home/ | true |true|
| /home | /home/aa | true |true|
| /home/ | /home | true |false|
| /home/ | /home/ | true |true|
| /home/ | /home/aa | true |true|
<p>总结：strict：匹配末尾的分隔符的有无</p>