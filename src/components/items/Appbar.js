import {React, useState, useEffect} from "react";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Cookies from "universal-cookie";

function IconButton ({IconImage}) {
    return (
        <div className="p-2 mx-1 hidden sm:block rounded-[12px] hover:bg-gray-300 active:bg-gray-400"> <IconImage /> </div>
    )
}

function IconButtonSmallScreen ({IconImage}) {
    return (
        <div className="p-2 mx-1 rounded-[12px] hover:bg-gray-300 active:bg-gray-400"> <IconImage /> </div>
    )
}

const icon_buttons = [[CommentOutlinedIcon], 
                      [NotificationsOutlinedIcon],
                      [SettingsOutlinedIcon]
                      ]

const cookies = new Cookies();

function Appbar() {
    const [IconButtonSmallShown, SetIconButtonSmallShown] = useState(false);
    const SmallMoreButtonCliked = () => {
        SetIconButtonSmallShown(!IconButtonSmallShown);
    }
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
      )

    // check if the screen changed from small screen to big screen
    useEffect(() => {
        window
        .matchMedia("(min-width: 640px)")
        .addEventListener('change', e => {
            setMatches( e.matches )});
        }, []);
    
        // automatically closes the small button dropdown when switching to large screen
        useEffect(() => {
            if (matches)
            {
                SetIconButtonSmallShown(false);
            }
        }, [matches])

    return (
        // main container
        <div className="bg-white flex justify-between items-center h-16 mx-auto px-4 w-full fixed shadow-md z-[10]">
            <h1 className="w-full text-2xl sm:text-3xl font-bold">Go2Food Entrepeneur</h1>

            {/* left most element (buttons and profile picture) main container */}
            <div className="flex">
                {/* buttons container */}
                <div className="flex items-center px-2">
                        <div onClick={SmallMoreButtonCliked} className="block sm:hidden p-2 rounded-[12px] hover:bg-gray-300 active:bg-gray-400"><MoreVertOutlinedIcon /></div>
                        {
                            icon_buttons.map((e, index) => {
                                return (
                                    <IconButton key={index} IconImage={e[0]} />
                                )
                            })
                        }
                </div>

                <div className="p-2">
                    <img onClick={() => {cookies.remove('jwt_auth', { path: '/' });}} className="min-h-10 min-w-10 max-w-12 max-h-12 rounded-md" src={"/images/profile_picture_default.jpg"} alt="Rounded avatar"></img>
                </div>

                {/* container of drop down menu items accessibe when screen is small */}
                <div className={`flex p-1 rounded-b-[12px] flex-col fixed mt-16 bg-white sm:hidden shadow-xl ${IconButtonSmallShown ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"} transition-all`}>
                        {
                            icon_buttons.map((e, index) => {
                                return (
                                    <IconButtonSmallScreen key={index} IconImage={e[0]} />
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default Appbar;