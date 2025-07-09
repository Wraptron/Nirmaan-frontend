import React, {useState, useEffect} from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import { FaGraduationCap, FaRocket } from "react-icons/fa";
import {SkeletonLoader} from "../../components/SkeletonLoader";
import axios from "axios";
import Teams from "./Teams/Teams";
import Mentor from "./Mentors/Mentor";

function Home() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [analysedData, setAnalysedData]= useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [showw, setShoww] = useState(false);
    useEffect(() => {
        setShoww(true);
    }, [])
    const url =  'http://localhost:3003/api/v1/count-startupdata';
    const AnalysisData = async() => {
        try
        {
            const result = await axios.get(url);
            setAnalysedData(result.data);
            setIsLoaded(true)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            AnalysisData();
        }, 2000)
    }, [])

    const handleNavbarSelection = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={`flex`}>
            <div className="">
                <SideBar />
            </div>
            <div className="ms-[221px] flex-grow">
                <div>
                    <NavBar onSelectionChange={handleNavbarSelection} selectedIndex={selectedIndex}/>
                </div>
                <div className={`bg-gray-100`}>
                    {selectedIndex===0 && (
                        <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="border bg-white rounded-xl col-span-2">
                                    <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">General Dashboard</div>
                                    <div className="py-2 px-7 text-lg ">Overview</div>
                                    <div className="grid grid-cols-4 gap-10 px-7 py-2">
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? (analysedData?.active_startups || 0) : <SkeletonLoader />}
                                            </div>
                                            <div className="text-sm">Active Start-ups</div>
                                        </div>
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? (analysedData?.pratham || 0) : <SkeletonLoader />}
                                            </div>
                                            <div className="text-sm">Pratham</div>
                                        </div>
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? (analysedData?.akshar || 0) : <SkeletonLoader />}
                                            </div>
                                            <div className="text-sm">Akshar</div>
                                        </div>
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaGraduationCap size={20} className="text-[#45C74D]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? (analysedData?.graduated_startups || 0) : <SkeletonLoader />}
                                            </div>
                                            <div className="text-sm">Graduated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedIndex === 1 && (
                        <Teams props={analysedData}/>
                    )}
                    {selectedIndex === 2 && (
                        <Mentor />
                    )}
                    {selectedIndex === 3  && (
                        <Mentor />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Home;