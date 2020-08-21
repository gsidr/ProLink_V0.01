import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { connect } from "react-redux"
import { changeCurrentAvatar } from "../actions/profile"

const ProgressBar = ({ file, setFile, auth, changeCurrentAvatar }) => {

    const { url, progress } = useStorage(file, auth);
    console.log(progress, url);

    useEffect(() => {
        if (url) {

            changeCurrentAvatar(url)

            setFile(null);

        }
    }, [url, setFile, changeCurrentAvatar])

    return (
        <div
            className="progress-bar" style={{ width: progress + "%" }}></div>
    )

}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { changeCurrentAvatar })(ProgressBar);