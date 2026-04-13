import React from 'react'
import CARD_2 from '../../assets/images/card_2.png'
import { LuTrendingUpDown } from 'react-icons/lu'

const AuthLayout = ({ children, showProgressOverlay = false }) => {
    return (
        <div className="flex relative">
            <div className="w-screen min-h-screen md:w-[60vw] relative overflow-hidden bg-gradient-to-br from-white via-[#fcfbff] to-violet-50 px-6 md:px-12 py-8">
                <div className="absolute -top-14 -left-16 w-56 h-56 rounded-full bg-purple-100/60 blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-violet-100/80 blur-2xl" />

                <div className="relative z-10 max-w-3xl mx-auto h-full flex flex-col">
                    <h2 className="text-lg font-medium text-black">
                        Expense Tracker
                    </h2>

                    <div className="mt-8 md:mt-12 flex-1 flex items-center">
                        <div className="w-full auth-left-panel">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
                <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
                <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
                <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

                <div className="grid grid-cols-1 z-20">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income and Expense"
                        value="430,000"
                        color="bg-[#875cf5]"
                    />
                </div>

                <img
                    src={CARD_2}
                    className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-200"
                />
            </div>

            {showProgressOverlay && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-40 flex items-center justify-center">
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-md flex items-center gap-3">
                        <span className="auth-spinner" />
                        <p className="text-sm text-gray-700 font-medium">Processing request...</p>
                    </div>
                </div>
            )}
        </div>

    )
}

export default AuthLayout


const StatsInfoCard = ({ icon, label, value, color }) => {
    return <div className="flex bg-white p-4 rounded-xl shadow-md shadow-purple-400 border border-gray-200 z-10">
        <div
            className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl `} >
            {icon}
        </div>
        <div>
            <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
            <span className="text-[20px]">₹{value}</span>
        </div>
    </div >
}