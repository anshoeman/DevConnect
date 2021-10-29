import React,{Fragment, useEffect} from 'react'
import propTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import { getProfiles } from '../../actions/profile'
import Profileitem from './Profileitem'
const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
        getProfiles();
    },[])
    return (
        <div>
            {loading ?<Spinner/>:<Fragment>
               <h1 className="large text-primary">Developers</h1>
               <p className="lead">
                   <i className="fab fa-connectDevelop"></i> Browse And Connect With Developers
                   </p> 
                   <div className="profiles">
                       {profiles.length>0 ? (
                           profiles.map((profile)=>(
                               <Profileitem key={profile._id} profile = {profile}/>
                           ))
                       ):<h4>No Profiles Found</h4>}
                   </div>
                </Fragment>}
        </div>
    )
}

Profiles.propTypes = {
    getProfiles:propTypes.func.isRequired,
    profile:propTypes.object.isRequired,
}
const mapStateToProps = state=>({
    profile:state.profile
})
export default connect(mapStateToProps,{getProfiles})(Profiles)
