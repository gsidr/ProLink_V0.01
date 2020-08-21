import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";


const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }


  return (<section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">ProLink</h1>
        <p className="lead">
          Create a profile and showcase your skill set to
          connect with other professionals
        </p>

        <div className="buttons">
          <Link to="/register" className="btn btn-primary login-signup-buttons">Sign Up</Link>
          <Link to="/login" className="btn btn-light login-signup-buttons">Login</Link>
        </div>

        <div className="functionalityDesc">
        <i className="fa fa-tags " aria-hidden="true">  Upload profile pictures </i>
        <br/>
        <i className="fa fa-tags " aria-hidden="true">  Search professionals via names</i>
        <br/>

        <i className="fa fa-tags " aria-hidden="true">  Create posts and like and comment</i>
        <br/>

        <i className="fa fa-tags " aria-hidden="true">  Chat in realtime with other professionals</i> 
        </div>
      </div>
    </div>
  </section>)
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool


}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);