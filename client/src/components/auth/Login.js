import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { getCurrentProfileWhileLogin } from "../../actions/profile";



const Login = ({ login, isAuthenticated, user, profile, getCurrentProfileWhileLogin, }) => {


    const [formData, setFormData] = useState({

        email: "",
        password: "",


    }); //React Hooks usage

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        login(email, password);




    };

   



    if (isAuthenticated) {

        if (user != null) {

            getCurrentProfileWhileLogin()

            
            if(profile.loading===false){
                
                if(profile.currentProfile!=null){
                    return <Redirect to={`/profile/${user._id}`} />
                }
                else{
                    return <Redirect to={`/dashboard`} />
                }
            }


        }


    }




    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>

                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" onChange={(e) => onChange(e)} value={email} />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        onChange={(e) => onChange(e)}
                        value={password}
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    profile: PropTypes.object,
    getCurrentProfileWhileLogin: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated, //Created a new prop isAutheticated for the Component
    user: state.auth.user,
    profile: state.profile
}

)
export default connect(mapStateToProps, { login, getCurrentProfileWhileLogin })(Login);
