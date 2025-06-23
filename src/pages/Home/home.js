import React, {useState, useEffect} from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import { FaBook, FaBookOpen, FaCheck, FaCreditCard, FaGraduationCap, FaMoneyBillAlt, FaRegAddressBook, FaRegBuilding, FaRocket, FaSignOutAlt } from "react-icons/fa";
import PieChart from "../../components/Graph";
import DonutChart from "../../components/DonutChart";
import '../../components/styles/style.css'
import LineChart from "../../components/LineChart";
import Investor from "./Investor/Investor";
import HomeFinance from "./Finance/Finance";
import Teams from "./Teams/Teams";
import {SkeletonLoader, SkeletonChartLoader, SkeletonChartLoader2} from "../../components/SkeletonLoader";
import axios from "axios";
import Mentor from "./Mentors/Mentor";
import FundingAksharPieChart from "../../components/FundingAkshar";
import FundingDistributedProgram from "../../components/FundingDistributed";
import FundingUtilized from "../../components/FundingUtilized";
import { Sidebar } from "flowbite-react";
import { FaEllipsis, FaWallet } from "react-icons/fa6";
import tired from '../../assets/images/Nandhinimamtraktor.png';
import numberWithCommas from '../../components/CommaSeperation';
import ImageSvg from '../../assets/images/image.svg';
function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [color, setColor] = useState(['#afdade', '#afd5de', '#afcdde', '#99b6bf', '#6d858c']);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [screenSize, setScreenSize] = useState('sm:')
    const darkColor = '#0b5f66';
    const toggleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const[analysis, setAnalysis] = useState('home');

    const handleButtonClick = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
        if (selectedIndex === index) {
            setSelectedIndex(null);
            setAnalysis('home');
        } else {
            setSelectedIndex(index);
            const analysisOptions = ['home', 'teams', 'mentors', 'finance', 'investor'];
            setAnalysis(analysisOptions[index]);
        }
    };
    const [userList, setUserList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, [])
    const[analysedData, setAnalysedData]= useState([])
    const isRemote = true;
    const url =  'http://localhost:3003/api/v1/count-startupdata';
    const AnalysisData = async() => {
        try
        {
            const result = await axios.get(url);
            // console.log(result)
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
    //console.log(analysedData);

    //const [selectedIndex, setSelectedIndex] = useState(0); // Manage state in Parent

  const handleNavbarSelection = (index) => {
    setSelectedIndex(index); // Update state when child triggers
  };
  console.log(selectedIndex);
  const [showw, setShoww] = useState(false);
    useEffect(() => {
        setShoww(true);
    }, [])
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
                                                                    {/* <div className="px-7 text-lg">Status</div>
                                                                    <div className="flex justify-between px-7 gap-5 border-l-2 border-r-2 overflow-x-auto scrollbar-hidden w-full h-auto">
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-full" width={100} height={100}/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg} className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                        <div className="border rounded-3xl p-[25px] border-2 border-[#45C74D]"><img src={ImageSvg}  className="w-100"/></div>
                                                                    </div> */}
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
                                                                                    {isLoaded ? (analysedData?.active_pratham || 0) : <SkeletonLoader />}
                                                                                </div>
                                                                                <div className="text-sm">Pratham</div>
                                                                            </div>

                                                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                                                <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                                                                <div className="text-2xl font-semibold">
                                                                                    {isLoaded ? (analysedData?.Energy_sector_startups || 0) : <SkeletonLoader />}
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
                                                                    {/* <div className="pt-7 px-7 text-lg flex justify-between">
                                                                        <div className="text-lg">Funding</div>
                                                                            <button className="bg-[#45C74D] text-white block py-2 px-2 rounded-lg ms-3 text-sm font-semibold">View</button>
                                                                    </div> */}
                                                                    {/* <div className="grid grid-cols-3 gap-10 px-7 py-2">
                                                                            <div className="shadow-lg border rounded-lg">
                                                                                            <div className="p-3 text-sm">Funding Disbursed</div>
                                                                                            <div className="px-3 flex justify-between">
                                                                                                    <div className="text-xl"><span>Rs.</span><span>{analysedData?.Funding_Distrubuted_data?.Total_funding_used?.Total_funding_distributed || 0}</span></div>
                                                                                                    <div className="bg-[#45C74D] mb-1 rounded-xl p-2 text-white"><FaMoneyBillAlt size={20}/></div>
                                                                                            </div>
                                                                            </div>
                                                                            <div className="shadow-lg border rounded-lg">
                                                                                            <div className="p-3 text-sm">Funding Utilized</div>
                                                                                            <div className="px-3 flex justify-between">
                                                                                                    <div className="text-xl"><span>Rs.</span><span>{analysedData?.Funding_Distrubuted_data?.Total_funding_used?.Total_funds_utilized || 0}</span></div>
                                                                                                    <div className="bg-[#FFE7DD] mb-1 rounded-xl p-2 text-white"><FaCreditCard size={20}/></div>
                                                                                            </div>
                                                                            </div>
                                                                            <div className="shadow-lg border rounded-lg">
                                                                                            <div className="p-3 text-sm">External Funding</div>
                                                                                            <div className="px-3 flex justify-between">
                                                                                                    <div className="text-xl"><span>Rs.</span><span>{analysedData?.Funding_Distrubuted_data?.Total_funding_used?.Total_funding_remaining || 0}</span></div>
                                                                                                    <div className="bg-[#E54545] mb-1 rounded-xl p-2 text-white"><FaWallet size={20}/></div>
                                                                                            </div>
                                                                            </div>
                                                                    </div> */}
                                                                    {/* <div className="pt-7 px-7 text-lg flex justify-between">
                                                                            <div className="text-lg">Start-ups</div>
                                                                            <button className="bg-[#45C74D] text-white block py-2 px-2 rounded-lg ms-3 text-sm font-semibold">View</button>
                                                                    </div> */}
                                                        </div>
                                                        {/* <div className="border bg-white rounded-xl">
                                                            <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">Recent Activities</div>
                                                                <div className="overflow-y-auto scrollbar-hidden">
                                                                            <div className="px-4 pt-5 flex">
                                                                                    <div><img src="" abt="" /></div>
                                                                                    <span>Lorem Ispum Ispum Ispum Ispum Ispum </span>
                                                                            </div>
                                                                            <div className="px-4 pt-2 flex">
                                                                                    <div><img src="" abt="" /></div>
                                                                                    <span>Lorem Ispum Ispum Ispum Ispum Ispum </span>
                                                                            </div>
                                                                            <div className="px-4 pt-2 flex">
                                                                                    <div><img src="" abt="" /></div>
                                                                                    <span>Lorem Ispum Ispum Ispum Ispum Ispum Ispum </span>
                                                                            </div>
                                                                            <div className="px-4 pt-2 flex">
                                                                                    <div><img src="" abt="" /></div>
                                                                                    <span>Lorem Ispum Ispum Ispum Ispum Ispum Ispum </span>
                                                                            </div>
                                                                            <div className="px-4 pt-2 flex">
                                                                                    <div><img src="" abt="" /></div>
                                                                                    <span>Lorem Ispum Ispum Ispum Ispum Ispum Ispum </span>
                                                                            </div>
                                                                            <div className="px-4 pt-2 flex">
                                                                                    <div><img src="" abt="" /></div>
                                                                                    <span>Lorem Ispum Ispum Ispum Ispum Ispum Ispum </span>
                                                                            </div>
                                                                </div>
                                                            </div> */}
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