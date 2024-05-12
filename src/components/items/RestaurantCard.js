import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantCard ({id, name, range, rating, img_url}) {
    const navigate = useNavigate()
    return (
        <div onClick={() => {navigate(`/restaurant/${id}`)}} className='flex justify-center items-center bg-green-600 text-white p-2 mr-4 rounded-md hover:bg-green-700 active:bg-green-800 md:min-w-[200px] md:min-h-[200px] min-w-[150px] min-h-[150px]'>
            <div className="w-full items-center justify-center m-auto">
                <img className=" w-full md:h-28 sm:h-24 h-20 rounded-lg mx-auto pointer-events-none" style={{objectFit:"cover"}} src={img_url} alt="Restaurant Thumbnail"></img>

                <p className="text-xs text-gray-200"> {range + " km"}  </p>

                <p className="text-sm sm:text-base md:text-lg font-bold line-clamp-1">{name}</p>

                {/* rating info */}
                <div className="flex">
                    <img className="w-4 h-4 mr-1 my-auto pointer-events-none" src="/images/food-categories/star_rating.png" alt="Star rating icon"></img>
                    <p className="text-xs ">{rating}</p>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard;