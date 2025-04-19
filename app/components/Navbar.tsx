"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { FolderGit2, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { checkAndAddUser } from '../action'
import Image from 'next/image'

const Navbar = () => {
    const { user } = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname()
    

    const navLinks = [
        {
            href: "/general-projects", label: "Collaborations",
        },
        {
            href: "/", label: "Mes projets"
        }
    ]

    useEffect(() => {
         // Affichons les données de l'utilisateur
    console.log("User data:", user);
    console.log("Email:", user?.primaryEmailAddress?.emailAddress);
    console.log("Name:", user?.fullName);
    
        if (user?.primaryEmailAddress?.emailAddress || user?.fullName || "Utilisateur") {
          checkAndAddUser(user?.primaryEmailAddress?.emailAddress || "", user?.fullName || "Utilisateur")
        }
       
    }, [user])

    const isActiveLink = (href: string) =>
        pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

    const renderLinks = (classNames: string) =>
        navLinks.map(({ href, label }) => {
            return <Link key={href} href={href} className={`btn-sm ${classNames} ${isActiveLink(href) ? "btn-primary" : ""}`}>
                {label}
            </Link>
        })

    return (
        <div className='border-b boder-base-300  px-5 md:px-[10%] py-4 relative '>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='text-primary rounded-full p-2'>
                        <Image alt='' src={"/favicon.png"} width={40} height={40} />
                    </div>
                    <div className='flex flex-col ml-1'>
                    <div className=' font-bold text-3xl'>
                        Task<span className='text-primary'>Flow</span>
                    </div>
                    <p className='text-sm text-primary'>Eliminez le chaos, suivez le flux !</p>
                    </div>
                </div>

                <button className='btn w-fit btn-sm sm:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className='w-4' />
                </button>

                <div className='hidden sm:flex space-x-4 items-center '>
                    {renderLinks("btn")}
                    <UserButton />
                </div>
            </div>

            <div className={`absolute top-0 w-full h-screen flex flex-col gap-2 p-4 transition-all duration-300 sm:hidden  bg-white  z-50 ${menuOpen ? "left-0" : "-left-full"} `}>
                <div className='flex justify-between'>
                    <UserButton />
                    <button className='btn w-fit btn-sm' onClick={() => setMenuOpen(!menuOpen)}>
                        <X className='w-4' />
                    </button>
                </div>
                {renderLinks("btn")}
            </div>
        </div>
    )
}

export default Navbar