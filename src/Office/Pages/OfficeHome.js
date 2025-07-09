import React from 'react'
import NavBar from '../../components/NavBar';
import SideBar from '../../components/sidebar';

function OfficeHome() {
  return (
    <div className="h-screen flex">
            <section id="SideBar" className="fixed h-full">
                 <SideBar />
            </section>
            <section id="" className="flex-grow">
                <div className="fixed w-full">
                      <NavBar />
                </div>
                <div className="p-[90px;] h-full">
                      <div className="grid grid-cols-3 gap-5">
                            <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}>
                                <div className="p-4 text-md text-gray-600">Total Startups</div>
                                <div className="p-3 text-5xl font-semibold pb-4 justify-end items-end flex text-gray-500">N</div>
                            </div>
                            <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}>
                                <div className="p-4 text-md text-gray-600">Total Startups</div>
                                <div className="p-3 text-5xl font-semibold pb-4 justify-end items-end flex text-gray-500">N</div>
                            </div>
                            <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}>
                                <div className="p-4 text-md text-gray-600">Total Startups</div>
                                <div className="p-3 text-5xl font-semibold pb-4 justify-end items-end flex text-gray-500">N</div>
                            </div>    
                      </div>
                </div>
            </section>
    </div>
  )
}

export default OfficeHome;
