import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
//We will connect our redux with component by using something called connect
//Whenever we use redux we need to import it
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert'
import { register } from '../../../actions/auth'
import propTypes from 'prop-types'

const Register = ({setAlert,register}) => {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2} = formData;
    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit = async e =>{
        e.preventDefault()
        if(password!==password2){
            setAlert('Password Does not Match','danger')
        }else{
            register({name,email,password});
          }
    }
    return (
        <Fragment>
            <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          value={name}
          onChange={e=>onChange(e)}
         />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
        </Fragment>
    )
}
Register.propTypes = {
  setAlert:propTypes.func.isRequired,
  register:propTypes.func.isRequired,
}
export default connect(null,{setAlert,register})(Register)
