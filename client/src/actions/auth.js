import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL, USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,LOGOUT,
    CLEAR_PROFILE,
    CLEAR_CURRENT_PROFILE
} from './types';
import { setAlert } from "./alert";



//Load User

export const loadUser = () => async dispatch => {

    
    try {
        const res = await axios.get("/api/auth");
        
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        

    } catch (err) {
        console.error(err.message);
        dispatch({
            type: AUTH_ERROR
        });

    }
}


//Register User

export const register = ({ name, email, password }) => async dispatch => {
    const body = JSON.stringify({ name, email, password });

    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));// redux actions can be triggered from anywhere 
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }

    


};


// Login User
export const login = ( email, password ) => async dispatch => {
    const body = JSON.stringify({ email, password });

    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch({ type: CLEAR_PROFILE });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));// redux actions can be triggered from anywhere 
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }

  
};

export const logout=()=>dispatch=>{
    dispatch({type:LOGOUT});
    dispatch({type:CLEAR_CURRENT_PROFILE});
    dispatch({type:CLEAR_PROFILE});
};
