import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../items/LoadingOverlay";
import { BackendURL } from "../configs/GlobalVar";
import { UsePositionInfo } from "../../store";
import { useLocation } from "react-router-dom";
import axios from "axios";

function CategoryImage ({category}) {
    return (
        <img className="h-6 w-6 sm:w-8 sm:h-8 md:w-10 md:h-10 " src={`/images/food-categories/${category}.png`}></img>
    )
}

function Restaurant () {
    const {latitude, longitude, UpdateLatitude, UpdateLongitude} = UsePositionInfo((state) => ({
        latitude: state.latitude,
        longitude: state.longitude,
        UpdateLatitude: state.UpdateLatitude,
        UpdateLongitude: state.UpdateLongitude
      }));

    let location = useLocation()
    const restaurant_id = useParams()
    const [loading, SetLoading] = useState(false)
    const [restaurantData, SetRestaurantData] = useState([])
    const [locUpdated, SetLocUpdated] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            UpdateLongitude(pos.coords.longitude);
            UpdateLatitude(pos.coords.latitude);
            SetLocUpdated(true)
        })
    }, [location])

    useEffect(() => {
        SetLoading(true)
        if (locUpdated)
        {

            axios.post(`${BackendURL}/get_restaurant_byId/`, {
                id: restaurant_id["id"],
                latitude: latitude,
                longitude: longitude
            })
            .then((response) => {
                SetRestaurantData(response.data)
            })
            .catch((error) => {
                console.log(error, 'error');
            });

            SetLoading(false)
        }
    }, [restaurant_id, locUpdated])

    useEffect(() => {

        console.log(restaurantData.categories)

    }, [])

    if (restaurantData.length !== 0)
    {
        return (
            <div className="pt-[72px] flex flex-col md:flex-row py-2 mx-[12.5%] sm:mx-[15%] space-y-4">

                {/* restaurant banner (restaurant info) */}
                <div className="bg-green-600 flex flex-row space-x-4 rounded-lg w-full">

                    {/* restaurant name and restaurant picture */}
                    <img className="md:w-44 sm:w-32 w-24 md:h-44 sm:h-32 h-24 rounded-lg ml-4 pointer-events-none my-4" style={{objectFit:"cover"}} src={restaurantData.pictureURL}></img>
                    <div className="flex flex-col w-full text-white space-y-0.5 md:space-y-1.5">
                        <div>
                            <h3 className="md:text-2xl sm:text-xl text-lg mt-4 font-bold line-clamp-1">{restaurantData.name}</h3>
                        </div>

                        {/* ratings distance and categories information*/}
                        <div className="flex flex-col h-full justify-between pb-4">
                            <div className="flex flex-row space-x-1 items-center">
                                <img className="md:w-4 md:h-4 w-3 h-3 my-auto pointer-events-none" src="/images/food-categories/star_rating.png" alt="Star rating icon"></img>
                                <p className="md:text-sm text-xs">{restaurantData.rating}</p>
                                <p className="md:text-sm text-xs text-gray-300 font-bold pl-2">{restaurantData.distance + "km"}</p>
                            </div>
                            <div className="flex flex-row space-x-2 py-2">
                                {
                                    restaurantData.categories ? 
                                    restaurantData.categories.map((e, index) => {
                                        return (
                                            <CategoryImage key={index} category={e}/>
                                        )
                                    })
                                    :
                                    <div/>
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* div scroll container for the menus list*/}
                <div className="flex flex-col h-full">
                    
                </div>
            </div>
        )
    }
    else
    {
        return (
            <LoadingOverlay />
        )
    }
}

export default Restaurant;