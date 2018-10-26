/**
 * react-router4.0 BasicExample
 * 按需加载
 */

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Something from './components/Something';
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>

  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => {
      return <h3>Please select a topic.</h3>
    }
    } />
  </div>
)

class AC extends React.Component {
  state = {
    component: null
  }
  async componentDidMount() {
    const { default: Component } = await this.props.loader;
    this.setState({
      component: <Component {...this.props} />
    });
  }
  render() {
    return this.state.component;
  }
}


const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={(props) => {
    console.log(props);
    return (
      <li className={props.match ? 'active' : ''}>
        <Link to={to} {...rest} />
      </li>
    )
  }
  } />
)



const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/others">其他</Link></li>
        <li><Link to="/something">something</Link></li>
      </ul>
      <hr />
      <Route strict path="/home/" component={Home} />
      {/* <Route exact path="/home" render={(props) => {
        console.log(props.match);
        return <Home />
      }} /> */}
      <Route strict path="/about" component={About} />
      {/* <Route path="/about" children={(props) => {
        console.log(props.match);
        return <About />
      }} /> */}

      <Route path="/topics" component={Topics} />
      {/* <Route path="/something" component={Something}/> */}
      <Route path="/something" render={(props) => (
        <AC {...props} loader={import('./components/Something')} />
      )} />
      <Route path="/others" render={(props) => (
        <AC {...props} loader={import('./components/Others')} />
      )} />
      <ul>
        <ListItemLink to="/somewhere" />
        <ListItemLink to="/somewhere-else" />
      </ul>
    </div>
  </Router>
)
export default BasicExample

