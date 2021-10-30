import React,{useEffect,useState,Fragment} from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import {getPosts} from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'
const Posts = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=>{
        getPosts()
    },[getPosts])
    return loading ? <Spinner/>:(
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i>Welcome To The Community
            </p>
            <PostForm/>
            <div className="posts">
                {posts.map((post)=>(
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
 getPosts:propTypes.func.isRequired,
 post:propTypes.object.isRequired,
}
const mapStateToProps = state =>({
    post:state.post
})
export default connect(mapStateToProps,{getPosts})(Posts)
