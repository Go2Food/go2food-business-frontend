import React from "react";

function RestaurantCardSkeleton () {
    return (
        <div className="flex flex-col justify-center bg-green-600 text-white p-2 mr-4 rounded-md md:min-w-[200px] md:min-h-[200px] min-w-[150px] min-h-[150px]">
            <div className="animate-pulse space-y-2">
                <div className="w-full md:h-28 sm:h-24 h-20 rounded-lg bg-green-500"/>
                <div className="h-2 bg-green-500 rounded w-5"/>
                <div className="h-2 bg-green-500 rounded"/>
                <div className="flex flex-row w-full space-x-2">
                    <div className="h-2 w-4 bg-green-500 rounded"/>
                    <div className="h-2 w-6 bg-green-500 rounded"/>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCardSkeleton;