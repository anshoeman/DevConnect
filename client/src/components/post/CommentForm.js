import React,{useState} from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'
const CommentForm = ({postId,addComment}) => {
    const [text,setText] = useState('');
    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A comment</h3>
        </div>
        <form class="form my-1" onSubmit={
            e=>{e.preventDefault();
        addComment(postId,{text});
        setText('');
        }}>
          <textarea
          value={text}
          onChange={e=>setText(e.target.value)}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
addComment:propTypes.func.isRequired,
}

export default connect(null,{addComment})(CommentForm)
