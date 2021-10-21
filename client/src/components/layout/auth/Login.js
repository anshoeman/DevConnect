import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import propTypes from 'prop-types';
import { login } from '../../../actions/auth';
const Login = ({login,isAuthenticated}) => {
  const [formData,setFormData] = useState({
    email:'',
    password:'',
});

const { email,password } = formData
const onChange = e => setFormData({...formData,[e.target.name]:e.target.value}) 
const onSubmit = e =>{
    e.preventDefault()
    login(email,password);
}
  //Redirect
  if(isAuthenticated){
    return <Redirect to="/dashboard"/>
  }
    return (
        <div> 
            <section class="container">
      <div class="alert alert-danger">
        Invalid credentials 
      </div>
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
      <form class="form" onSubmit={e=>onSubmit(e)}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e=>onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
        </div>
    )
}

Login.propTypes = {
  login:propTypes.func.isRequired,
  isAuthenticated:propTypes.bool
}
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login) 