import { useState, useEffect } from "react";
import { projectStorage,projectFirestore,timeStamp } from "../firebase/ImgGridConfig";


const useStorage = (file,auth) => {

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => { 

        //references
        const storageRef=projectStorage.ref(file.name);
        const collectionRef=projectFirestore.collection("images");

        const unsub=   storageRef.put(file).on("state_changed",(snap)=>{
            let percentage =(snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(percentage);
        },(err)=>{
            setError(err);
        },async()=>{
            const url =await storageRef.getDownloadURL();
            
            collectionRef.doc(auth.user._id).set({
                userName:auth.user.name,
                profilePicUrl:url,
                createdAt:timeStamp()
            })
            setUrl(url);

        });
        return ()=>unsub();



    

    },
        [file,auth.user._id,auth.user.name]);

return{progress,url,error}

}

export default useStorage;