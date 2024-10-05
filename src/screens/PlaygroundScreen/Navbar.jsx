import React from 'react';
import logo from "../../assests/logo .png"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isFullScreen }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`${isFullScreen ? 'h-0' : 'h-10'
                } bg-gray-800 flex items-center justify-center`}
        >
            <button
                onClick={() => {
                    navigate('/');
                }}
                className="bg-transparent border-0 flex items-center gap-4 cursor-pointer"
            >
                <div className='flex items-center gap-1'>
                    <img src={logo} alt="Logo" className="w-15 h-7" />
                    <h1 className="text-2xl font-normal text-white">
                        Code Sphere
                    </h1>
                </div>
            </button>
        </div>
    );
};

export default Navbar;
