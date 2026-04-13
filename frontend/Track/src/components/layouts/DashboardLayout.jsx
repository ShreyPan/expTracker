import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useContext(UserContext);

    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            {user ? (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
            ) : (
                <div className="flex">
                    <div className="max-[1080px]:hidden w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
                        <div className="flex flex-col items-center gap-3 mt-3 mb-7">
                            <div className="skeleton w-20 h-20 rounded-full" />
                            <div className="skeleton w-24 h-4" />
                        </div>
                        <div className="space-y-3">
                            <div className="skeleton h-11 w-full" />
                            <div className="skeleton h-11 w-full" />
                            <div className="skeleton h-11 w-full" />
                            <div className="skeleton h-11 w-full" />
                        </div>
                    </div>

                    <div className="grow mx-5 my-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="skeleton h-24" />
                            <div className="skeleton h-24" />
                            <div className="skeleton h-24" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="skeleton h-72" />
                            <div className="skeleton h-72" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout
