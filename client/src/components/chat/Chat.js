import React, { useState, useEffect } from 'react';
import useChatPairing from "../../hooks/useChatPairing";
import { projectFirestore, addElement } from "../../firebase/ImgGridConfig";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = ({ auth, profile }) => {

    const [sender, setSender] = useState("null");
    const [receiver, setReceiver] = useState("null");
    const [textValue, setTextValue] = useState("");
    const [pairId, setPairId] = useState("");
    const [selectedReceiver, setselectedReceiver] = useState("");
    const [messagesArray, setMessagesArray] = useState([]);




    useEffect(() => {
        if (
            auth.user !== null && selectedReceiver !== "" && selectedReceiver !== "null"
        ) {
            setSender(auth.user._id);
            setReceiver(selectedReceiver);
        }

    }, [selectedReceiver,auth.user])





    useChatPairing(sender, receiver, setPairId, setMessagesArray)




    const submitHandler = (e) => {
        e.preventDefault();
        if (pairId !== "" && textValue !== "") {
            console.log("semi working")


            ///////  Getting current datetime///////////
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;


            const dbRef = projectFirestore.collection("chatPairs").doc(pairId);
            dbRef.update({
                messages: addElement({
                    createdBy: auth.user.name,
                    creationTime: dateTime,
                    text: textValue,
                    creatorId: auth.user._id,
                    key: uuidv4()

                })

            })

            setTextValue("")

        }


    }


    const onChange = e =>
        setselectedReceiver(e.target.value);

    const textInputHandler = (e) => {
        setTextValue(e.target.value)
    }



    return (

        <div>
            <h1><i className="fas fa-comments"></i> Chat</h1>
            <select name="status" value={selectedReceiver} onChange={onChange} >
                <option value="null">* Users List</option>
                {
                    (profile.chatList.length !== 0 && auth.user != null) && profile.chatList.map((item) => {
                        if (item.user._id !== auth.user._id) return (

                            <option key={item.user._id} value={item.user._id}> {item.user.name}</option>
                        )
                        else{
                            return null
                        }
                    })
                }

            </select>
            <ScrollToBottom className="chat-block">



                


                <div className="chat-messages">

                    {(messagesArray.length !== 0) && messagesArray.map((item) => {

                        var textCSS = "left";
                        var nameCss = "left";
                        var textStyle={"color":"green"};

                        if (item.creatorId === auth.user._id) {
                             textStyle={"fontWeight": 1200,"color":"#38a1f3","fontSize": "20px"};
                            nameCss = "right"
                            textCSS = "right"
                        }

                        return (
                            <div key={item.key} className="chat-container">

                                <div className={`${nameCss} `} style={textStyle}>{item.createdBy}</div>

                                <br/>
                                <div className={`chatText-${textCSS}`}> {item.text} </div>


                            </div>
                        )
                    })}



                </div>

                



            </ScrollToBottom>
            <div className="chat-form-container">
                <form id="chat-form" onSubmit={e => submitHandler(e)}>
                    <input className="msg-text-area" type="text" style={{ outline: "none" }} value={textValue} onChange={e => textInputHandler(e)} placeholder="Enter Message" required />
                    <div className="sendButton" onClick={e => submitHandler(e)}><i className="fas fa-paper-plane fa-lg" /></div>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({

    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps)(Chat)
