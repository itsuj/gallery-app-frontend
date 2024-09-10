import React from "react";


const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
        <div className="loading-spinner"></div>
        Due to server inactivity, the gallery may take up to 50 seconds or more to load initially. ...Please wait for the images to appear
        </div>
    )
}

export default LoadingSpinner;