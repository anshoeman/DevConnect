import React,{useState} from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { addExperience } from '../../actions/profile'
const AddExperience = ({addExperience,history}) => {
    const [formData,setFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled,toggleDisabled] = useState(false);
    const {company,title,location,from,to,current,description} = formData;
    const onChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    return (
        <div>
            <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e=>{
          e.preventDefault();
          addExperience(formData,history)
      }}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} required onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} required onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} required onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
        </div>
         <div class="form-group">
          <p><input type="checkbox" checked={current}name="current" value={current} onChange={e=>{
              setFormData({...formData,current: !current});
              toggleDisabled(!toDateDisabled)
          }} />{' '}Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} required onChange={e=>onChange(e)} disabled={toDateDisabled?'disabled':''}/>
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} required onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </div>
    )
}

AddExperience.propTypes = {
    addExperience:propTypes.func.isRequired,
}

export default connect(null,{addExperience})(AddExperience)