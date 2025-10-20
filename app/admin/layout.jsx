"use client"

import { assets } from "@/assests/assets"
import Image from "next/image"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import SideBar from "@/components/AdminComponents/Sidebar"

export default function AdminLayout({ children }) {
   
    return (
        <div>
            <div className="flex">
                <ToastContainer theme="dark"/>
                <SideBar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                        <h3 className="font-semibold text-xl">Admin Panel</h3>
                        <div className="flex items-center gap-4">
                            <Image src={assets.profile_icon} width={40} alt="profile" />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}