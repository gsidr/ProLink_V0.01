import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/ImgGridConfig";

const useChatPairing = (temp1, temp2,setPairId,setMessagesArray) => {

    const[mainDoc,setmainDoc]=useState([]);

    useEffect(()=>{

        var collFound=0;
        
        const unsubTemp= projectFirestore.collection("chatPairs")
        if(temp1!=="null"&&temp2!=="null"){


            const unsub= projectFirestore.collection("chatPairs")
        .onSnapshot((snap)=>{
            let document="";
            snap.forEach(doc=>{

                if(doc.id.includes(temp1)&&doc.id.includes(temp2)){
                    collFound=1;
                    document={id:doc.id, data:doc.data()};
                    setPairId(doc.id);
                    setMessagesArray(doc.data().messages);
                    //console.log(doc.data());
                    
                }

            });

            if(collFound){
                setmainDoc(document);
            }
            else{
                unsubTemp.doc(temp1+" "+temp2).set({
                    name:temp1,messages:[],id:temp1+" "+temp2
                })
            }

            
            
        });

        return ()=>unsub();

        }
        // else{
        //     setPairId("");
        //     setMessagesArray([]);
        // }

       


    },[temp1,temp2]) 


    return {mainDoc};
}

export default useChatPairing
