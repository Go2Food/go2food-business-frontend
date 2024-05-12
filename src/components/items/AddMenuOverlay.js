import {React, useRef, useState} from "react";
import { UseImageSelector, UseRestaurantAccountInfo } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "./LoadingOverlay";
import { BackendURL } from "../configs/GlobalVar";
import { wait } from "../utils/Functionabilities";

function AddMenuOverlay ({GetMenuData = () => {}, SetThisShown = () => {}}) {
    // global state
    const {menu_picture, UpdateMenuPicture} = UseImageSelector((state) => ({
        menu_picture: state.menu_picture,
        UpdateMenuPicture: state.UpdateMenuPicture
      }));
    
    const {restaurant_id} = UseRestaurantAccountInfo((state) => ({
    restaurant_id: state.restaurant_id,
    }));

    // local states
    const [Loading, SetLoading] = useState(false)

    // location
    const navigate = useNavigate();

    // refs to the fields
    const MenuNameRef = useRef(null);
    const MenuDescriptionRef = useRef(null);
    const MenuCategoryRef = useRef(null);
    const MenuPriceRef = useRef(null)

    // validators for the fields
    const [MenuPictureInvalid, SetMenuPictureInvalid] = useState(false)
    const [MenuNameInvalid, SetMenuNameInvalid] = useState(false);
    const [MenuDescriptionInvalid, SetMenuDescriptionInvalid] = useState(false)
    const [MenuCategoryInvalid, SetMenuCategoryInvalid] = useState(false);
    const [MenuPriceInvalid, SetMenuPriceInvalid] = useState(false)

    // form validator
    const [MenuAdditionFailed, SetMenuAdditionFailed] = useState(false)

    // post new data to the backend
    const AddMenu = async () => {
        SetLoading(true);
        var formData = new FormData();
        formData.append("restaurant_id", restaurant_id)
        formData.append("file", menu_picture, menu_picture.name)
        formData.append("name", MenuNameRef.current.value.trim())
        formData.append("description", MenuDescriptionRef.current.value.trim())
        formData.append("category", MenuCategoryRef.current.value.trim())
        formData.append("price", MenuPriceRef.current.value.trim())

        await axios.post(`${BackendURL}/add_menu/`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(async (response) => {
                if (response.data["detail"] === "image upload failed") {
                    SetLoading(false);
                    SetMenuAdditionFailed(true);
                }
                else if (response.data["detail"] === "menu addition failed somehow") {
                    SetLoading(false);
                    SetMenuAdditionFailed(true);
                }
                else {
                    if (response.data["detail"]) {
                        await wait(500);
                        GetMenuData();
                        SetLoading(false);
                        SetThisShown(false);
                    }
                }
            })
            .catch((error) => {
                SetLoading(false);
                SetMenuAdditionFailed(true);
                console.log(error, 'error');
            });
    }  

    // submit button pressed
    const handleSubmit = (event) => {
        // prevent default and reset states
        event.preventDefault();
        SetMenuAdditionFailed(false);
        SetMenuPictureInvalid(false);
        SetMenuNameInvalid(false);
        SetMenuDescriptionInvalid(false);
        SetMenuCategoryInvalid(false);
        SetMenuPriceInvalid(false);

        // prepare initial value for value checking
        let menuPictureValid = true;
        let menuNameValid = true;
        let menuDescriptionValid = true;
        let menuCategoryValid = true;
        let menuPriceValid = true;

        if (menu_picture === "null") {
            SetMenuPictureInvalid(true);
            menuPictureValid = false;
        }

        if (MenuNameRef.current.value.trim() === "") {
            SetMenuNameInvalid(true);
            menuNameValid = false;
        }

        if (MenuDescriptionRef.current.value.trim() === "") {
            SetMenuDescriptionInvalid(true);
            menuDescriptionValid = false;
        }

        if (MenuCategoryRef.current.value.trim() === "") {
            SetMenuCategoryInvalid(true);
            menuCategoryValid = false;
        }

        if (MenuPriceRef.current.value.trim() === "" || !(MenuPriceRef.current.value.trim() - MenuPriceRef.current.value.trim() === 0 && MenuPriceRef.current.value.trim().toString(32).indexOf('.') !== -1)) {
            SetMenuPriceInvalid(true);
            menuPriceValid = false;
        }

        if (menuPictureValid && menuNameValid && menuCategoryValid && menuDescriptionValid && menuPriceValid) {
            AddMenu();
        }
    }

    return (
        <div className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-[99998]">
            {Loading ? <LoadingOverlay/> : <div/>}

            {/* restaurant menu addition container */}
            <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded-lg p-4 space-y-2 w-[75%] sm:w-[500px] mx-auto mt-[100px]" noValidate>
                <p className="text-xl font-bold pt-2 mx-auto">ADD MENU</p>
                <p className={`mb-4 text-pink-600 ${MenuAdditionFailed ? "block": "hidden"} animate-nav-bars-menu-popup mx-auto`}>Failed to add menu due to server error, please try again</p>


                {/* Menu picture Field */}
                <div className="flex flex-col mb-5 pt-2 ">
                    <label htmlFor="picture" className="text-sm text-start text-grey-900 ml-5">Menu Picture</label>
                    <input id="picture" type="file" accept="image/png, image/jpeg" onChange={(e) => {UpdateMenuPicture(e.target.files[0])}} required={MenuPictureInvalid} className="px-5 py-4 mr-2 text-sm font-medium outline-none text-dark-gray-900 rounded-2xl peer" />
                    <p htmlFor="picture" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">no picture provided</p>
                </div>

                {/* Menu name field */}
                <div className="flex flex-col mb-5 space-y-2">
                    <label htmlFor="menu_name" className="text-sm text-start text-grey-900 ml-5">Menu Name</label>
                    <input id="menu_name" type="text" ref={MenuNameRef} required={MenuNameInvalid} placeholder="Menu Name" className="w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer" />
                    <p htmlFor="menu_name" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">no name provided</p>
                </div>

                {/* Description field */}
                <div className="flex flex-col mb-5 pt-2 space-y-2">
                    <label htmlFor="description" className="text-sm text-start text-grey-900 ml-5">Description</label>
                    <input id="description" type="text" ref={MenuDescriptionRef} required={MenuDescriptionInvalid} placeholder="Description" className="w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer" />
                    <p htmlFor="description" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">no description provided</p>
                </div>

                {/* Category field */}
                <div className="flex flex-col mb-5 pt-2 space-y-2">
                    <label htmlFor="category" className="text-sm text-start text-grey-900 ml-5">Category</label>
                    <input id="category" type="text" ref={MenuCategoryRef} required={MenuCategoryInvalid} placeholder="Category" className="w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer" />
                    <p htmlFor="category" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">no category provided</p>
                </div>

                {/* Price field */}
                <div className="flex flex-col mb-5 pt-2 space-y-2">
                    <label htmlFor="price" className="text-sm text-start text-grey-900 ml-5">Price</label>
                    <input id="price" type="text" ref={MenuPriceRef} required={MenuPriceInvalid} placeholder="Price" className="w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer" />
                    <p htmlFor="price" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">price value should be a float</p>
                </div>

                {/* Form buttons*/}
                <div className="flex flex-row space-x-10 pt-6 mx-auto">
                    <button onClick={() => {SetThisShown(false)}} type="button" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md font-bold"> CANCEL </button>
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md font-bold"> ADD </button>
                </div>

            </form>
        </div>
    )
}

export default AddMenuOverlay;