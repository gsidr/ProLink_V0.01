

const setLoggedinprofile =(profileData)=>{
    if(profileData){
        localStorage.setItem("currentProfile",JSON.stringify( profileData))
    }
    else{

        localStorage.clear("currentProfile");
    }

}

export default setLoggedinprofile