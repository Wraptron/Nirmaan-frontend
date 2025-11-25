import React from "react";
import SideBar from '../../components/SideBar';
import NavBar from '../../../components/NavBar';
const CustomerHome = () => {
    
    return(
        <div className="flex h-screen">
                <section id="SideBar" className="fixed h-full">
                        <SideBar />
                </section>
                <section id="" className="flex-grow">
                        <div className="fixed w-full">
                            <NavBar />
                        </div>
                </section>
        </div>
    )
}
export default CustomerHome;