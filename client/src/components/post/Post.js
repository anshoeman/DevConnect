import React,{Fragment,useEffect} from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const Post = ({getPost,post:{post,loading},match}) => {
    useEffect(()=>{
        getPost(match.params.id);
    },[getPost])
    return loading || post === null? <Spinner/> : <Fragment>
        <Link to="/posts" className = "btn">Back To Posts</Link>
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._id}/>
        <div className="comments">
            {post.comments.map(comment=>(
                <CommentItem key={comment._id} comment={comment} postId={post._id}/>
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
getPost:propTypes.func.isRequired,
post:propTypes.object.isRequired,
}
const mapStateToProps = state=>({
    post:state.post
})
export default connect(mapStateToProps,{getPost})(Post)
