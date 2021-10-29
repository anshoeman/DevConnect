//On Logout we need to clear the profile
import React ,{Fragment, useEffect}from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {
    useEffect(()=>{
        getCurrentProfile()
    },[])
    return loading && profile === null ? <Spinner/> :<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}
        </p>
        {profile!==null ? <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education = {profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                    <i className="fas fa-user-minus"></i>Delete My Account
                </button>
            </div>
            </Fragment>:<Fragment><p>You Have Not Yet Setup a Profile,Please Add Some Info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile</Link></Fragment>} 
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    profile:propTypes.object.isRequired,
    deleteAccount:propTypes.func.isRequired
}

const mapStateToProps =state=>({
auth:state.auth,
profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)

