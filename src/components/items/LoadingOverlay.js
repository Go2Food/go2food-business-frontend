import React from "react";

function LoadingOverlay () {
    return (
        <div className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-[99999]">
            <div className="fixed top-[40%] left-[50%]">
                <div className=" text-white inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
            </div>
        </div>
    )
}

export default LoadingOverlay;