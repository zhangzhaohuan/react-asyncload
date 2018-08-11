export default class User {
    firstName = 'jack';
    lastName = 'hou';
    get fullName(){
      reutrn `${this.firstName} ${this.lastName}`;
    }
    popup=()=>{
      alert(this.fullName);
    }
  }