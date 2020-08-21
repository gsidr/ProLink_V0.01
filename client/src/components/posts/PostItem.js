import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';







const PostItem = ({    
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {


  ///////////////////////  states which were initialised by the props on component mount won't update automatically with props updating //////

  const [likeState, setCurrentLike] = useState({
     user,liked:false
  }); 





  ////////////////////////////  This functionality can be optimised   //////////////////////////
  useEffect(()=>{
    let flag=0;
    if(auth.user!=null){
      

      
      likes.forEach((likeItem) => {
        

        if (likeItem.user === auth.user._id) {
          setCurrentLike({...likeState,liked:true})
          flag=1;

        }
        
      }
      
      )

    }
    if(flag===0){
      setCurrentLike({...likeState,liked:false})
    }

  },[likes,auth.user]);
  


  ///////////////////////////////////////////////////////////////////////////

 


  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img-profile_posts' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>

            
            { likeState.liked? (
            <button
              onClick={() => {removeLike(_id)}}
              
              type='button'
              className='btn btn-light'
            >
              <i className='fa fa-heart' />
            </button>
            
            ) :
            
            
           ( <button
              onClick={() => {addLike(_id)}}
              type='button'
              className='btn btn-light'
            >
                <i className='fa fa-heart-o' />{' '}

              </button>)
            }





            <span>{<span>{likes.length}</span>}</span>

            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);