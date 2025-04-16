import { FolderGit2 } from 'lucide-react';
import React from 'react'
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
type WrapperProps = {
    children: React.ReactNode;
}


function Wrapper({ children }: WrapperProps) {
    return (
        <div>
            <Navbar/>
            <div className='px-5 md:px-[10%] mt-8 mb-10'>
            <ToastContainer position='top-right'
            autoClose = {6000}
            hideProgressBar = {false}
            newestOnTop = {false} 
            closeOnClick
            pauseOnHover
            draggable/>
                {children}
            </div>
        </div>
    )
}

export default Wrapper