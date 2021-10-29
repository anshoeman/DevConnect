import React,{useEffect} from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'
const ProfileGithub = ({username,getGithubRepos,repos}) => {
    useEffect(()=>{
        getGithubRepos(username)
    },[])
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                GitHub Repos
            </h2>
            {repos.map((repo)=>{
                <h1>{repo.name}</h1>
            })}
        </div>
    )
}

ProfileGithub.propTypes = {
    getGithubRepos:propTypes.func.isRequired,
    repos:propTypes.array.isRequired,
    username:propTypes.string.isRequired,
}


const mapStateToProps = state =>({
    repos:state.profile.repos
})
export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub)
