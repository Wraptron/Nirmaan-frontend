// import React, {useState, useEffect} from "react";
// import SideBar from "../../components/sidebar";
// import NavBar from "../../components/NavBar";
// import { FaGraduationCap, FaRocket } from "react-icons/fa";
// import {SkeletonLoader} from "../../components/SkeletonLoader";
// import axios from "axios";
// import Teams from "./Teams/Teams";
// import Mentor from "./Mentors/Mentor";

// function Home() {
//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const [analysedData, setAnalysedData]= useState([])
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [showw, setShoww] = useState(false);
//     useEffect(() => {
//         setShoww(true);
//     }, [])
//     const url = "http://localhost:3003/api/v1/count-startupdata";
//     const AnalysisData = async() => {
//         try
//         {
//             const result = await axios.get(url);
//             setAnalysedData(result.data);
//             setIsLoaded(true)
//         }
//         catch(err)
//         {
//             console.log(err)
//         }
//     }
//     useEffect(() => {
//         setTimeout(() => {
//             AnalysisData();
//         }, 2000)
//     }, [])

//     const handleNavbarSelection = (index) => {
//         setSelectedIndex(index);
//     };

//     return (
//         <div className={`flex`}>
//             <div className="">
//                 <SideBar />
//             </div>
//             <div className="ms-[221px] flex-grow">
//                 <div>
//                     <NavBar onSelectionChange={handleNavbarSelection} selectedIndex={selectedIndex}/>
//                 </div>
//                 <div className={`bg-gray-100`}>
//                     {selectedIndex===0 && (
//                         <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
//                             <div className="grid grid-cols-3 gap-5">
//                                 <div className="border bg-white rounded-xl col-span-2">
//                                     <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">General Dashboard</div>
//                                     <div className="py-2 px-7 text-lg ">Overview</div>
//                                     <div className="grid grid-cols-4 gap-10 px-7 py-2">
//                                         <div className="shadow-md border border-sm rounded-lg p-2">
//                                             <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
//                                             <div className="text-2xl font-semibold">
//                                                 {isLoaded ? (analysedData?.active_startups || 0) : <SkeletonLoader />}
//                                             </div>
//                                             <div className="text-sm">Active Start-ups</div>
//                                         </div>
//                                         <div className="shadow-md border border-sm rounded-lg p-2">
//                                             <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
//                                             <div className="text-2xl font-semibold">
//                                                 {isLoaded ? (analysedData?.pratham || 0) : <SkeletonLoader />}
//                                             </div>
//                                             <div className="text-sm">Pratham</div>
//                                         </div>
//                                         <div className="shadow-md border border-sm rounded-lg p-2">
//                                             <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
//                                             <div className="text-2xl font-semibold">
//                                                 {isLoaded ? (analysedData?.akshar || 0) : <SkeletonLoader />}
//                                             </div>
//                                             <div className="text-sm">Akshar</div>
//                                         </div>
//                                         <div className="shadow-md border border-sm rounded-lg p-2">
//                                             <div className="pb-1"><FaGraduationCap size={20} className="text-[#45C74D]"/></div>
//                                             <div className="text-2xl font-semibold">
//                                                 {isLoaded ? (analysedData?.graduated_startups || 0) : <SkeletonLoader />}
//                                             </div>
//                                             <div className="text-sm">Graduated</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {selectedIndex === 1 && (
//                         <Teams props={analysedData}/>
//                     )}
//                     {selectedIndex === 2 && (
//                         <Mentor />
//                     )}
//                     {selectedIndex === 3  && (
//                         <Mentor />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default Home;






















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
    const url = "http://13.127.7.121/api/v1/count-startupdata";
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
        <div className="flex">
            <div className="">
                <SideBar />
            </div>
            <div className="ms-[221px] flex-grow">
                <div>
                    <NavBar onSelectionChange={handleNavbarSelection} selectedIndex={selectedIndex}/>
                </div>
                <div className="bg-gray-100">
                    {selectedIndex===0 && (
                        <div className={`mx-10 py-5 content ${showw ? "visible" : ""}`}>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="border bg-white rounded-xl col-span-2">
                                    <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">General Dashboard</div>
                                    <div className="py-2 px-7 text-lg ">Overview</div>
                                    <div className="grid grid-cols-4 gap-10 px-7 py-2">
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? ((analysedData?.startup_total || 0) + (analysedData?.dropped_startups || 0)) : <SkeletonLoader />}
                                            </div>
                                            <div className="text-sm">Total Start-ups</div>
                                        </div>
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaRocket size={20} className="text-[#FFB866]"/></div>
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
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaGraduationCap size={20} className="text-[#C8DFFF]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? (analysedData?.dropped_startups || 0) : <SkeletonLoader />}
                                            </div>
                                            <div className="text-sm">Dropped out</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right side box */}
                                <div className="bg-white rounded-xl shadow-md flex flex-col justify-between p-8">
                                    <div className="flex items-center mb-8">
                                        <div className="bg-pink-100 rounded-full p-2 mr-4">
                                            <FaGraduationCap className="text-pink-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-500">IP's Created</div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 ml-4">100</div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center mb-8">
                                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                                            <FaRocket className="text-blue-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-500">PIA</div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 ml-4">24</div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center">
                                        <div className="bg-green-100 rounded-full p-2 mr-4">
                                            <FaGraduationCap className="text-green-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-500">IITMIC</div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 ml-4">120</div>
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