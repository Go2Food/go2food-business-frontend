import React from 'react';
import { useNavigate } from 'react-router-dom'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';

function Settings () {
    const navigate = useNavigate()
    const navigateMe = (e) => {
        e.preventDefault()
        navigate("/")
    }

    return (
        <div className='flex flex-col items-center justify-center overflow-auto bg-white h-screen w-screen space-y-10'>
            <div className='text-center space-y-2'>
                <h3 className='text-4xl'>
                    This page is not ready yet: <strong>Settings</strong>
                </h3>
                <p className='text-lg'>
                    Take me back to the home page
                </p>
            </div>
            <div className=''>
            <button className='text-lg text-green-700 take_me_home opacity-50 border-b border-b-transparent hover:opacity-100 hover:border-b-current transition-all disabled:opacity-20' onClick={navigateMe}>
                <div className='flex flex-row'>
                    <div className='px-2'>
                        <RestaurantRoundedIcon />
                    </div>
                    Back 2 Food
                </div>
            </button>
            </div>
        </div>
    )
}

export default Settings;