// 未解决err：装饰器在vscode中无法使用
import { model } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/mota/user';
@model(User)
export default class App3 extends React.Component {
  onFilstNameChange = event=>{
    this.model.firstName= event.target.value;
  };
  render(){
    return <div>
      <p>{this.model.fullName}</p>
      <p>
        <input onChange={this.onFilstNameChange}/>
      </p>
      <p>
        <button onClick={this.model.popup}></button>
      </p>
    </div>;
  }
}
