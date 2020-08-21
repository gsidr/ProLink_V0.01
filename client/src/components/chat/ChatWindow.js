import React,{useState,useEffect} from 'react'
import { connect } from "react-redux"
import Chat from "./Chat";
import { getProfilesForChat } from '../../actions/profile';

const ChatWindow = ({ auth, profile,getProfilesForChat }) => {


    const [chatState, setchatState] = useState("closed");

    const toggleChatState=(e)=>{

        if (profile.chatList.length===0){
            getProfilesForChat()
        }

        setchatState(e)
    }

    useEffect(() => {
        if(auth.user===null){

            setchatState("closed")
        }

    }, [auth])



    if (auth.user === null) {
        return (
            null
        )
    }
    else {

        if (
           false
        ) {
            return (
                null
            )
        }
        else {

            return (

                <div>

                    {/* <button className="open-button" value="open" onClick={e=>toggleChatState(e)}>Chat</button> */}

                    <div className="chat-open"  onClick={e=>toggleChatState("open")}><i className="fa fa-commenting-o fa-3x" aria-hidden="true"></i></div>
                    <div className={`chat-popup-${chatState}`} id="myForm">
                        <div className="form-container">
                            

                            
                            
                            {/* <textarea placeholder="Type message.." name="msg" required></textarea> */}
                            {chatState==="open"&&(<Chat/>)}

                            
                        </div>
                        {/* <button type="button" value="closed" className="btn cancel" onClick={e=>toggleChatState("closed")}>Close</button> */}
                        <div className="chat-open"  onClick={e=>toggleChatState("closed")}><div className="chat-close-button"><i className="fa fa-times fa-3x" aria-hidden="true"></i></div></div>


                    </div>
                </div>
            )
        }


    }


}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStateToProps,{getProfilesForChat})(ChatWindow)
