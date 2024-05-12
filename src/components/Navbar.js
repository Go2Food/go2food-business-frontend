import React from "react";
import Appbar from "./items/Appbar";
import NavSideBar from "./items/NavSideBar";

function Navbar () {
    return (
        <div>
            <Appbar />
            <NavSideBar />
        </div>
    )
}

export default Navbar;