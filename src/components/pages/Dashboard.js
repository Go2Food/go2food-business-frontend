import {React, useState, useEffect} from "react";
import LoadingOverlay from "../items/LoadingOverlay";
import { BackendURL } from "../configs/GlobalVar";
import { useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AddMenuOverlay from "../items/AddMenuOverlay";
import DeleteMenuConfirmation from "../items/DeleteMenuConfirmation";
import { UseRestaurantAccountInfo } from '../../store';
import MenuCard from "../items/MenuCard";
import axios from "axios";

function CategoryImage ({category}) {
    return (
        <img className="h-6 w-6 sm:w-8 sm:h-8 md:w-10 md:h-10 " src={`/images/food-categories/${category}.png`}></img>
    )
}

function Dashboard () {
    // component controller variables
    const [AddMenuDialogShown, SetAddMenuDialogShown] = useState(false)
    const [DeleteMenuDialogShown, SetDeleteMenuDialogShown] = useState(false)

    // everything else
    let location = useLocation()
    const { restaurant_id} = UseRestaurantAccountInfo((state) => ({
        restaurant_id: state.restaurant_id
      }));

    // local data to this page
    // const [loading, SetLoading] = useState(false)
    const [restaurantData, SetRestaurantData] = useState([])
    const [menuData, SetMenuData] = useState([])
    const [selectedMenu, SetSelectedMenu] = useState("null")

    // functions
    const GetRestaurantData = () => {
        axios.post(`${BackendURL}/get_restaurant_byId_restaurant_account/`, {
            id: restaurant_id
        })
        .then((response) => {
            SetRestaurantData(response.data)
        })
        .catch((error) => {
            console.log(error, 'error');
        });
    }

    const GetMenuData = () => {
        axios.post(`${BackendURL}/get_menu_restaurant/`, {
            id: restaurant_id
        })
        .then((response) => {
            SetMenuData(response.data)
        })
        .catch((error) => {
            console.log(error, 'error');
        });
    }

    useEffect(() => {
        GetRestaurantData()
    }, [location])

    useEffect(() => {
        GetMenuData()
    }, [location])

    if (restaurantData.length !== 0)
    {
        return (
            <div className="pt-[72px] flex flex-col py-2 mx-[12.5%] sm:mx-[15%] space-y-4">
                {AddMenuDialogShown ? <AddMenuOverlay SetThisShown={SetAddMenuDialogShown} GetMenuData={GetMenuData}/> : <div/>}
                {DeleteMenuDialogShown ? <DeleteMenuConfirmation SetThisShown={SetDeleteMenuDialogShown} deletion_id={selectedMenu} GetMenuData={GetMenuData} /> : <div/>}
                {/* restaurant banner (restaurant info) */}
                <div className="bg-green-600 flex flex-row space-x-4 rounded-lg w-full p-2 sm:p-3 md:p-4">

                    {/* restaurant name and restaurant picture */}
                    <img className="md:w-44 md:h-44 sm:w-32 sm:h-32 w-28 h-28 rounded-lg pointer-events-none" style={{objectFit:"cover"}} src={restaurantData.pictureURL}></img>
                    <div className="flex flex-col w-full text-white space-y-0.5 md:space-y-1.5">
                        <div>
                            <h3 className="md:text-2xl sm:text-xl text-lg font-bold line-clamp-1">{restaurantData.name}</h3>
                        </div>

                        {/* ratings distance and categories information*/}
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-row space-x-1 items-center">
                                <img className="md:w-4 md:h-4 w-3 h-3 my-auto pointer-events-none" src="/images/food-categories/star_rating.png" alt="Star rating icon"></img>
                                <p className="md:text-sm text-xs">{restaurantData.rating}</p>
                                {/* <p className="md:text-sm text-xs text-gray-300 font-bold pl-2">{restaurantData.distance + "km"}</p> */}
                            </div>
                            <div className="flex flex-row space-x-2">
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
                
                {/* add menu button */}
                <div className="flex flex-row items-center space-x-2 md:space-x-4 ">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />

                    <button onClick={() => {SetAddMenuDialogShown(true)}} className="p-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white"><AddIcon/></button>
                    <p className="text-base md:text-xl font-bold">ADD MENU</p>

                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>

                {/* div scroll container for the menus list*/}
                <div className="flex flex-col h-full space-y-2 md:space-y-3">
                {
                    menuData !== 0 ? 
                    menuData.map((e, index) => {
                        return (
                            <MenuCard key={index} id={e["_id"]} pictureUrl={e["pictureURL"]} name={e["name"]} description={e["description"]} category={e["category"]} price={e["price"]} ShowDeleteConfirmation={SetDeleteMenuDialogShown} SetSelectedId={SetSelectedMenu}/>
                        )
                    })
                    :
                    <div/>
                }
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

export default Dashboard;