import React from "react";

function MenuCard ({id, pictureUrl, name, description, category, price, ShowDeleteConfirmation = () => {}, SetSelectedId = () => {}}) {

    const OpenDeletionDialog = (id) => {
        SetSelectedId(id)
        ShowDeleteConfirmation(true)
    }

    return (
        <div className="flex flex-row w-full bg-green-600 rounded-lg p-2 md:p-4 space-x-2 md:space-x-4">
            {/* menu image */}
            <img className="w-24 h-24 md:w-36 md:h-36 pointer-events-none rounded-lg" style={{objectFit:"cover"}} src={pictureUrl}></img>

            {/* menu info */}
            <div className="flex flex-col space-y-1 sm:space-y-2 w-full justify-between">
                <div>
                    <div className="flex flex-row sm:space-x-2 space-x-1 items-center">
                        <p className="text-base md:text-xl text-white font-bold line-clamp-1">{name}</p>
                        <p className="text-sm md:text-base text-gray-200 font-bold">{price+"$"}</p>
                    </div>
                    <p className="text-sm md:text-lg text-white line-clamp-2"> {description} </p>
                </div>
                <p className="text-sm md:text-lg text-white font-bold line-clamp-1"> Category: {category} </p>
            </div>

            {/* menu controls */}
            <div className="my-auto">
                <button onClick={() => {OpenDeletionDialog(id)}} className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-sm md:text-base text-white font-bold p-1 md:p-2 rounded-lg">DELETE</button>
            </div>


        </div>
    )
}

export default MenuCard;