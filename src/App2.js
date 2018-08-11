/* react-router4.0 redirects(Auth)  */
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
    <Router>
        <div>
            <AuthButton />
            <ul>
                <li><Link to="/public">Public Page</Link></li>
                <li><Link to="/protected">Protected Page</Link></li>
            </ul>
            <Route path="/public" component={Public} />
            <PrivateRoute path="/protected" component={Protected} />
            <Route path="/login" component={Login} />
            {/* <Redirect to="/login"/> */}
        </div>
    </Router>   
)

const fakeAuth = {  
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
                fakeAuth.signout(() => history.push('/'))
            }}>Sign out</button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? ( 
            <Component {...props} />
        ) : (
                <Redirect to={{ 
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        }
    }

    componentDidMount(){
        console.log(this.props.location.state);    
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
        })
    }   
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        console.log(from);
        const { redirectToReferrer } = this.state;
        console.log(redirectToReferrer);
        

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

export default AuthExample