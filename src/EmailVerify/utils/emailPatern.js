/*
* 检查邮箱格式
* 参数可以是单个的邮箱，可以是数组，返回布尔值
*/
export default function(email) {
  //const emailPatern = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-]+\.)+(com|cn|net|org)$/;
  const emailPatern = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9_-]+\.)+(.+)$/;
  if (Array.isArray(email)) {
    return email.every((item) => {
      return emailPatern.test(item);
    });
  } else {
    return emailPatern.test(email);
  }
}