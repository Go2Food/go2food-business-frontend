import {React, useRef, useState} from "react";
import { UseImageSelector, UseRestaurantAccountInfo } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import { BackendURL } from "../configs/GlobalVar";
import { wait } from "../utils/Functionabilities";

function DeleteMenuConfirmation ({SetThisShown = () => {}, GetMenuData = () => {} , deletion_id}) {
    const [Loading, SetLoading] = useState(false)

    const DeleteMenu = async (deletion_id) => {
        SetLoading(true)
        await axios.delete(`${BackendURL}/delete_menu/`, {
            data: {
                id: deletion_id
            }
        })
        .then((response) => {
            if (response.data["detail"] !== "menu deletion failed")
            {
                SetLoading(false)
                SetThisShown(false)
                GetMenuData()
            }
        })
        .catch((error) => {
            console.log(error, 'error');
            SetLoading(false)
        });
    }
    

    return (
        <div className="fixed bg-black bg-opacity-50 top-[-16px] left-0 w-full h-full z-[99997]">
            {Loading ? <LoadingOverlay/> : <div/>}

            {/* restaurant menu addition container */}
            <div className="flex flex-col bg-white rounded-lg p-4 space-y-2 w-[75%] sm:w-[500px] mx-auto mt-[180px]">
                <p className="text-xl font-bold pt-2 mx-auto">DELETE MENU</p>
                <p className="text-lg pt-2 mx-auto">Are you sure? This action is irreversible and the menu can't be retrieved again</p>

                <div className="flex flex-row space-x-10 mx-auto pt-14">
                    <button onClick={() => {SetThisShown(false)}} className="p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg font-bold">CANCEL</button>
                    <button onClick={() => DeleteMenu(deletion_id)} className="py-2 px-7 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg font-bold">OK</button>

                </div>
                

            </div>
        </div>
    )
}

export default DeleteMenuConfirmation;