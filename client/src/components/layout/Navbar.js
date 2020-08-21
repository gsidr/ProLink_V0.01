import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Fragment } from "react";


const Navbar = ({ auth: { isAuthenticated,loading,user }, logout,profile }) => {
  const authLiks = (
    <ul>
      <li>
        

         {(profile!=null &&user!=null)&& (<Fragment ><Link to={`/profile/${user._id}`}>  Profile </Link></Fragment>)
        }

        

      </li>
      <li>
        <Link to="/profiles">

          People

        </Link>

      </li>
      <li>
        <Link to="/posts">

          Posts

        </Link>

      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">dashboard</span>

        </Link>

      </li>
      <li>
        <Link to="/login" onClick={logout}>
          
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>{" "}
        
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/PROFILES">

          People

        </Link>

      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
        <i className="fa fa-home" aria-hidden="true"/> ProLink
          {/* <i className="fas fa-code" /> ProLink */}
        </Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLiks : guestLinks}</Fragment>)}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile:state.profile.currentProfile
});

export default connect(mapStateToProps, { logout })(Navbar);
