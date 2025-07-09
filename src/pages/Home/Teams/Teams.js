import React, {useEffect, useState} from 'react';
import DonutChart from "../../../components/DonutChart";
import '../../../components/styles/style.css'
import { FaBuilding, FaDownload, FaGraduationCap, FaRegAddressBook, FaRocket, FaSignOutAlt } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import gradcap from '../../../assets/images/Graduated Startups (1).svg'
import SectorWise from '../../../components/SectorWise';
function Teams(props){
    console.log(props?.props?.Funding_Distrubuted_data)
    const [show, setShow] = useState(false);
    const [time, setTime] = useState('')
    const timeEffect = () => {
        var today = new Date()
        var curHr = today.getHours()
        if (curHr < 12) {
            setTime('Good Morning')
        } else if (curHr < 17) {
            setTime('Good Afternoon');
        } else {
            setTime('Good Evening')
        }  
    }
    useEffect(() => {
        timeEffect();
        setShow(true);
    }, [])

    const [timewithsec, settimewithsec] = useState('');
    const timefunc = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
        settimewithsec(formattedTime);
    }
    useEffect(() => {
          setTimeout(() => {
            timefunc();
          }, 0)
          setInterval(() => {
            timefunc()
          }, 1000)
    }, [])
    return (
        <div className={`grid md:grid-cols-3 gap-4 grid-cols-1 content ${show ? "visible": ""}`}>
            <div className="border bg-white mx-4 my-4 col-span-2 rounded-xl">
                 <div className="flex justify-between px-5 py-3 underline underline-offset-[13px] decoration-gray-200">
                    <div className="text-xl">Start-up Dashboard</div>
                    <div className="pt-1"><FaDownload size={0}/></div>
                </div>
                <div className="bg-[#45C74D] mx-4 my-4 rounded-lg">
                        <div className="px-5 pt-5 font-semibold text-2xl text-white">{time}</div>   
                        <div className="px-5 pb-3 text-white">Have a nice day</div>  
                        <div className='text-sm mt-3 px-5 text-white pb-3'>{timewithsec}</div>
                </div>
                <div className="px-5 pt-2">Overview</div>
                    <div className="grid grid-cols-4 gap-10 px-7 py-2">
                            <div className="col-span-2">
                                    <div className="grid grid-cols-2 gap-5">
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaRegAddressBook size={20} className="text-[#45C74D]"/></div>
                                                <div className="text-2xl font-semibold">{props?.props?.startup_total || 0}</div>
                                                <div className="text-sm">Total Start-ups</div>
                                            </div>
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaRocket size={20} className="text-[#45C74D]"/></div>
                                                <div className="text-2xl font-semibold">{props?.props?.active_startups || 0}</div>
                                                <div className="text-sm">Active Start-ups</div>
                                            </div>
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaGraduationCap size={20} className="text-[#45C74D]"/></div>
                                                <div className="text-2xl font-semibold">{props?.props?.graduated_startups || 0}</div>
                                                <div className="text-sm">Graduated</div>
                                            </div>
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaSignOutAlt size={20} className="text-[#45C74D]"/></div>
                                                <div className="text-2xl font-semibold">{props?.props?.dropped_startups || 0}</div>
                                                <div className="text-sm">Dropped out</div>
                                            </div>       
                                    </div> 
                             </div>
                             <div className="col-span-2">
                                           <div className="bg-white shadow-md border border-sm rounded-lg p-2">
                                                <div className="flex justify-between px-5 py-2">
                                                    <div className="bg-[#FADADA] rounded-2xl p-1"><img src={gradcap} alt="Under Graduate FIR" size={25}/></div>
                                                    <div className="pt-1 text-sm">Under Graduate FIR</div>
                                                    <div className="rounded-lgf pt-1 text-xl font-semibold">24</div>
                                                </div>
                                                <div className="flex justify-between px-5 py-2">
                                                    <div className="bg-[#C8DFFF] rounded-2xl p-1"><img src={gradcap} alt="Post Graduate FIR" size={25}/></div>
                                                    <div className="pt-1 text-sm">Post Graduate FIR</div>
                                                    <div className="rounded-lg pt-1 text-xl font-semibold">100</div>
                                                </div>
                                                <div className="flex justify-between px-5 py-2">
                                                    <div className="bg-[#FADADA] rounded-2xl p-1"><img src={gradcap} alt="IP's Created" size={25}/></div>
                                                    <div className="pt-1 text-sm">IP's Created</div>
                                                    <div className="rounded-lg pt-1 text-xl font-semibold">76</div>
                                                </div>
                                                <div className="flex justify-between px-5 py-2">
                                                    <div className="bg-[#FADADA] rounded-2xl p-1"><img src={gradcap} alt="MS (Entrepreneurship)" size={25}/></div>
                                                    <div className="pt-1 text-sm">MS (Entrepreneurship)</div>
                                                    <div className="rounded-lg pt-1 text-xl font-semibold">50</div>
                                                </div>
                                           </div>
                             </div>    
                     </div>
                     <div className="pt-5 px-5 grid grid-cols-3 gap-5">
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaBuilding size={25} className="bg-[#D8F3D9] p-1 rounded-2xl"/></div>
                                                <div className="text-2xl font-semibold">147</div>
                                                <div className="text-sm">Internsip Offered</div>
                                            </div>
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaBuilding size={25} className="bg-[#D8F3D9] p-1 rounded-2xl"/></div>
                                                <div className="text-2xl font-semibold">25</div>
                                                <div className="text-sm">Revenue Generated</div>
                                            </div> 
                                            <div className="shadow-md border border-sm rounded-lg p-2">
                                                <div className="pb-1"><FaBuilding size={25} className="bg-[#D8F3D9] p-1 rounded-2xl"/></div>
                                                <div className="text-2xl font-semibold">72</div>
                                                <div className="text-sm">Start-up Valuation</div>
                                            </div>  
                    </div>
                    <div className="mt-10 pb-2 grid grid-cols-2 gap-5 px-5">
                        <div className="">
                            <div className="">Team Distribution</div>
                            <div className="border shadow-md rounded-lg w-[90%]">
                                         <DonutChart 
                                            props={props}
                                         />    
                            </div>
                        </div>  
                        <div className="">
                            <div className="">Sector-wise Distribution</div>
                            <div className="border shadow-md rounded-lg w-[90%]">
                                         <SectorWise props={props} />    
                            </div>
                        </div> 
                    </div>
                    <div className="px-5 flex justify-between pt-5">
                            <div>Start-ups Sectors</div>
                            <div className="flex justify-between gap-10">
                                <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]">
                                        <option>Top 5 Sectors</option>
                                        <option>Start-ups by Cohort</option>
                                </select>
                                <div className="mt-2"><FaEllipsis size={20}/></div>
                            </div>
                    </div>
            </div>
        </div>
    )
}
export default Teams;