import React from "react";
import {useState, useEffect} from "react";
import { Link, useLocation} from "react-router-dom";
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import TryOutlinedIcon from '@mui/icons-material/TryOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function NavButton({IconImage, text, path, current, func}) {
    return (
        <Link onClick={func} to={path} className={`rounded-[10px] py-4 text-center ${path === current ? "bg-green-700 text-white hover:bg-green-800 active:bg-green-900" : "hover:bg-gray-300 w-full active:bg-green-700 active:text-white"}`}>
            < IconImage/>
            {text}
        </Link>
    )
}

function Banner() {
    return (
        <div className="rounded-[12px] w-[90%] my-4 p-4 m-auto flex flex-col bg-green-700 shadow-md">
            <p className="py-4 px-2 text-white font-bold text-[18px]/[26px]">
                Upgrade your account to Get Free Voucher
            </p>
            <button className="py-2 px-4 flex items-start w-fit mt-4 bg-white rounded-md hover:bg-gray-300 active:bg-gray-600 active:text-white drop-shadow-md">
                Upgrade
            </button>
        </div>
    )
}

function NavSideBar() {
    const [NavSideBarShown, SetNavSideBarShown] = useState(false);
    const navSideBar = document.getElementById('navSideBar');
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1650px)").matches
      )

    const location = useLocation();

    const navSideBarBurgerButtonCliked = () => {
        SetNavSideBarShown(!NavSideBarShown);
    }

    const LinkButtonClicked = () => {
        SetNavSideBarShown(false);
    }

    const list_buttons = [[RestaurantOutlinedIcon, "Dashboard", "/", location.pathname], 
                         [DeliveryDiningOutlinedIcon, "Food Order", "/orders", location.pathname],
                         [TryOutlinedIcon, "Favorite", "/favorites", location.pathname],
                         [ChatOutlinedIcon, "Message", "/messages", location.pathname],
                         [HistoryOutlinedIcon, "Order History", "/history", location.pathname],
                         [ReceiptLongOutlinedIcon, "Bills", "/bills", location.pathname],
                         [SettingsOutlinedIcon, "Settings", "/settings", location.pathname]]

    useEffect(() => {
        if (NavSideBarShown)
        {
            try 
            {
                navSideBar.classList.remove("hidden");
                navSideBar.classList.remove("xl-block");
                navSideBar.classList.replace("w-[250px]", "w-[50%]");
                navSideBar.classList.add("left-[50%]");
                navSideBar.classList.add("-translate-x-[50%]")
                navSideBar.classList.replace("rounded-br-[20px]", "rounded-[20px]")
            }   
            catch (e)
            {

            }
        }
        else 
        {
            try 
            {
                navSideBar.classList.add("hidden");
                navSideBar.classList.add("min-[1650px]:block");
                navSideBar.classList.replace("w-[50%]", "w-[250px]");
                navSideBar.classList.remove("left-[50%]");
                navSideBar.classList.remove("-translate-x-[50%]")
                navSideBar.classList.replace("rounded-[20px]", "rounded-br-[20px]")
            }
            catch (e)
            {

            }
        }
    }, [NavSideBarShown]);
    
    // check if the screen changed from small screen to big screen
    useEffect(() => {
    window
    .matchMedia("(min-width: 1650px)")
    .addEventListener('change', e => {
        setMatches( e.matches )});
    }, []);

    // automatically closes the navsidebar when switching to large screen
    useEffect(() => {
        if (matches)
        {
            SetNavSideBarShown(false);
        }
    }, [matches])

    
    
    return (
        <div className="z-[9]">
            <div id="navSideBarBurgerButton" onClick={navSideBarBurgerButtonCliked} className="bg-slate-50 ml-2 p-2 fixed mt-[72px] block min-[1650px]:hidden rounded-[12px] hover:bg-gray-300 active:bg-gray-400 shadow-xl">
                <MenuOutlinedIcon />
            </div>

            <div id="navSideBar" className=" bg-gray-100 fixed mt-16 w-[250px] rounded-br-[20px] hidden min-[1650px]:block shadow-xl z-[7] animate-nav-bars-menu-popup">

                {/* nav bar buttons div container */}
                <div className="flex flex-col p-4">
                    {
                        list_buttons.map((e, index) => {
                            return (
                                <NavButton key={index} func={LinkButtonClicked} IconImage={e[0]} text={e[1]} path={e[2]} current={e[3]}/>
                            )
                        })
                    }
                </div>

               
            </div>
        </div>
    )
}

export default NavSideBar;