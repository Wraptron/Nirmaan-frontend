import React, {useEffect, useState} from "react";
import '../../../components/styles/style.css'
import { ApiFetchMentorCount } from "../../../API/API";
import { FaDownload, FaEllipsisV } from "react-icons/fa";
import mentorhour from '../../../assets/images/all startups.svg';
import Startupsvg from '../../../assets/images/Startups.svg';
import Graduated from '../../../assets/images/Graduated Startups.svg'
function Mentor(props){
    // console.log(props)
    const [show, setShow] = useState(false);
    const getData = async() => {
        try
        {
            await ApiFetchMentorCount();
            // console.log(result.rows[0].count);
            // setData(result.rows);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
        setShow(true);
    }, [])
    return (
        <div className={`grid md:grid-cols-3 gap-4 grid-cols-1 content ${show ? "visible": ""}`}>
                    <div className="border bg-white mx-4 my-4 col-span-2 rounded-lg">
                            <div className="flex justify-between px-5 py-3 underline underline-offset-[13px] decoration-gray-200">
                                    <div className="text-xl">Mentor Dashboard</div>
                                    <div className="pt-1"><FaDownload size={0}/></div>
                            </div>
                            <div className="px-5 py-3 font-semibold">Overview</div>
                            <div className="grid grid-cols-3 gap-5 px-5 pb-4">
                                    <div className="shadow-md border border-sm rounded-lg p-2">
                                        <div className="pb-1"><img src={mentorhour} alt="Mentor hour icon" className="bg-[#D8F3D9] p-2 rounded-xl "/></div>
                                        <div className="text-2xl font-semibold">14hr 30min</div>
                                        <div className="text-sm">Total Mentoring Hours</div>
                                    </div>

                                    <div className="shadow-md border border-sm rounded-lg p-2">
                                        <div className="pb-1"><img src={Startupsvg} alt="Startup icon" className="bg-[#FFE7CC] p-2 rounded-xl "/></div>
                                        <div className="text-2xl font-semibold">14hr 30min</div>
                                        <div className="text-sm">Mentoring Sessions</div>
                                    </div>

                                    <div className="shadow-md border border-sm rounded-lg p-2">
                                        <div className="pb-1"><img src={Graduated} alt="Graduated icon" className="bg-[#D8F3D9] p-2 rounded-xl "/></div>
                                        <div className="text-2xl font-semibold">14hr 30min</div>
                                        <div className="text-sm">Total Mentors</div>
                                    </div>
                            </div>
                            <div className="flex justify-between px-5">
                                    <div className="">Mentoring Hours</div>
                                    <div><button><FaEllipsisV /></button></div>
                            </div>
                            <div className="flex justify-between px-5 pt-6 pb-4">
                                            <div>Most Represented Specializations</div>
                                            <div className="flex justify-between gap-10">
                                                <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]">
                                                        <option>Top 5</option>
                                                        <option>Top 10</option>
                                                </select>
                                                <div className="mt-2"><FaEllipsisV /></div>
                                            </div>
                            </div>
                    </div>
        </div>
    )
}
export default Mentor;