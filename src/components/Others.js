import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
export default class Others extends React.Component {
  render() {
    let { match } = this.props;
    return (
      <div>
        <h2>其他页面</h2>
        <Link to={`${match.url}/10086`}>
          中国移动客服
        </Link><br />
        <Link to={`${match.url}/10000`}>
          中国电信
        </Link><br />
        <Link to={`${match.url}/10010`}>
          中国联通
        </Link><br />
        <Route path={`${match.url}/:userId`} component={User} />
      </div>
    );
  }
}

const User = ({ match }) => (
  <div>
    <h2>接收到的参数{match.params.userId}</h2>
  </div>
)