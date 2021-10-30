import React,{Fragment} from 'react'
import propTypes from 'prop-types'
import {Link} from "react-router-dom"
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike,removeLike,deletePost } from '../../actions/post'
const PostItem = ({addLike,removeLike,deletePost,auth,post:{_id,text,name,avatar,user,likes,comments,date},showActions}) => {
    return (
        <div class="posts">
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && <Fragment>
                <button onClick={e=>addLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </button>
            <button onClick={e=>removeLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} class="btn btn-primary">
              Discussion {comments.length>0 && (
                   <span class='comment-count'>{comments.length}</span>
              )}
              
            </Link>
            {!auth.loading && user===auth.user._id && (
                 <button
                 onClick={e=>deletePost(_id)}      
                 type="button"
                 class="btn btn-danger"
               >
                 <i class="fas fa-times"></i>
                 </button>
            )}
                </Fragment>}
        
          </div>
        </div>
        </div>
    )
}
PostItem.defaultProps = {
    showActions:true
}
PostItem.propTypes = {
post:propTypes.object.isRequired,
auth:propTypes.object.isRequired,
addLike:propTypes.func.isRequired,
removeLike:propTypes.func.isRequired,
deletePost:propTypes.func.isRequired,
}
const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem)
