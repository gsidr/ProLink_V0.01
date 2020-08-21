import { GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, NO_REPOS, SEARCH_PROFILES, GET_CURRENT_PROFILE, CLEAR_CURRENT_PROFILE,GET_CHAT_PROFILES } from "../actions/types";


var currentProfileParsed=null
if(localStorage.currentProfile){
    currentProfileParsed=JSON.parse( localStorage.currentProfile);
}

const initialState = {
    currentProfile: currentProfileParsed,
    profile: null,
    profiles: [],
    chatList:[],
    repos: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case SEARCH_PROFILES:
            return {
                ...state,
                profiles: state.profiles.filter(item => item.user.name.toLowerCase().includes(payload.toLowerCase().trim())),
                loading: false
            }

            case GET_CHAT_PROFILES:
                return{
                    ...state,chatList:payload
                }

        case PROFILE_ERROR:
            return {
                ...state, error: payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            
            return {
                ...state,
                currentProfile:null,
                loading: true
            };


        case GET_CURRENT_PROFILE:
            
            return {
                ...state,
                currentProfile:payload,
                profile:payload,
               
                loading: false
            }

        case GET_PROFILES:
            return {
                ...state, profiles: payload,
                loading: false
            }
        case NO_REPOS:
            return {
                ...state,
                loading: false
            }


        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,

                repos: [],
                loading: true
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default: return state;

    }
}