import React, {useState, useEffect} from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import { FaGraduationCap, FaRocket } from "react-icons/fa";
import {SkeletonLoader} from "../../components/SkeletonLoader";
import axios from "axios";
import Teams from "./Teams/Teams";
import Mentor from "./Mentors/Mentor";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

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

    // Sample data for charts
    const fundingDisbursedData = [
        { value: 20 }, { value: 45 }, { value: 30 }, { value: 60 }, { value: 40 }, { value: 80 }, { value: 55 }, { value: 70 }
    ];
    
    const fundingUtilizedData = [
        { value: 30 }, { value: 60 }, { value: 40 }, { value: 75 }, { value: 50 }, { value: 85 }, { value: 65 }, { value: 45 }
    ];
    
    const externalFundingData = [
        { value: 60 }, { value: 40 }, { value: 70 }, { value: 30 }, { value: 55 }, { value: 25 }, { value: 45 }, { value: 35 }
    ];

    const startupData = [
        { month: 'Jun 24', value: 85 },
        { month: 'Jul 24', value: 20 },
        { month: 'Aug 24', value: 15 },
        { month: 'Sept 24', value: 70 },
        { month: 'Oct 24', value: 45 },
        { month: 'Nov 24', value: 90 },
        { month: 'Dec 24', value: 25 },
        { month: 'Jan 25', value: 35 }
    ];

    const mentoringData = [
        { name: 'STINGA', date: 'Feb 25', time: '2 hr', color: '#FFB866', avatars: ['👤', '👤', '👤'] },
        { name: 'FITQUEST', date: 'May 25', time: '5 hr', color: '#4CAF50', avatars: ['👤', '👤', '👤'] },
        { name: 'AIKHART', date: 'Apr 25', time: '4 hr', color: '#FF6B6B', avatars: ['👤', '👤', '👤'] },
        { name: 'NEXGEN', date: 'Jun 25', time: '6 hr', color: '#2196F3', avatars: ['👤', '👤', '👤'] }
    ];

    const FundingCard = ({ title, amount, icon, color, bgColor, data }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    {icon}
                </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-4">{amount}</div>
            <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.3}/>
                                <stop offset="100%" stopColor={color} stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={color} 
                            fill={`url(#gradient-${title})`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

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
                            {/* Your existing dashboard section remains unchanged */}
                            <div className="grid grid-cols-3 gap-5 mb-8">
                                <div className="border bg-white rounded-xl col-span-2">
                                    <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">General Dashboard</div>
                                    <div className="py-2 px-7 text-lg ">Overview</div>
                                    <div className="grid grid-cols-4 gap-10 px-7 py-2">
                                        <div className="shadow-md border border-sm rounded-lg p-2">
                                            <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                            <div className="text-2xl font-semibold">
                                                {isLoaded ? (analysedData?.startup_total || 0)  : <SkeletonLoader />}
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
                                        <div className="text-2xl font-bold text-gray-800 ml-4">0</div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center mb-8">
                                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                                            <FaRocket className="text-blue-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-500">PIA</div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 ml-4">{analysedData.PIA}</div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex items-center">
                                        <div className="bg-green-100 rounded-full p-2 mr-4">
                                            <FaGraduationCap className="text-green-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-500">IITMIC</div>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800 ml-4">{analysedData.IITMIC}</div>
                                    </div>
                                </div>
                            </div>

                            {/* New Funding Section */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900">Funding</h2>
                                    <div className="p-2 border rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <FundingCard 
                                        title="Funding Disbursed"
                                        amount="Rs. 7,130,400"
                                        icon={<div className="w-4 h-4 bg-green-500 rounded-full"></div>}
                                        color="#4CAF50"
                                        bgColor="bg-green-50"
                                        data={fundingDisbursedData}
                                    />
                                    <FundingCard 
                                        title="Funding Utilized"
                                        amount="Rs. 2,873,778"
                                        icon={<div className="w-4 h-4 bg-orange-500 rounded-full"></div>}
                                        color="#FF9800"
                                        bgColor="bg-orange-50"
                                        data={fundingUtilizedData}
                                    />
                                    <FundingCard 
                                        title="External Funding"
                                        amount="Rs. 10,070,000"
                                        icon={<div className="w-4 h-4 bg-red-500 rounded-full"></div>}
                                        color="#F44336"
                                        bgColor="bg-red-50"
                                        data={externalFundingData}
                                    />
                                </div>
                            </div>

                            {/* New Start-ups Chart Section */}
                            <div className="mb-8">
                                <div className="bg-white rounded-xl p-6 shadow-sm border">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900">Start-ups</h3>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                            View
                                        </button>
                                    </div>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={startupData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                                <XAxis 
                                                    dataKey="month" 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#666' }}
                                                    interval={0}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={60}
                                                />
                                                <YAxis hide />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="value" 
                                                    stroke="#4CAF50" 
                                                    strokeWidth={3}
                                                    dot={{ r: 6, fill: '#4CAF50', strokeWidth: 2, stroke: '#fff' }}
                                                    activeDot={{ r: 8, fill: '#4CAF50' }}
                                                />
                                                {/* Custom label for Aug 24 */}
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="value" 
                                                    stroke="transparent" 
                                                    dot={(props) => {
                                                        if (props.payload?.month === 'Aug 24') {
                                                            return (
                                                                <g>
                                                                    <circle cx={props.cx} cy={props.cy} r={6} fill="#4CAF50" strokeWidth={2} stroke="#fff"/>
                                                                    <text x={props.cx} y={props.cy - 15} textAnchor="middle" fontSize={10} fill="#666">
                                                                        Aug 24
                                                                    </text>
                                                                    <text x={props.cx} y={props.cy - 5} textAnchor="middle" fontSize={10} fill="#666">
                                                                        15
                                                                    </text>
                                                                </g>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
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