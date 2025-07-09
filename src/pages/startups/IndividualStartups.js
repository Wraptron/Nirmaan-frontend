import React from 'react'
import SideBar from '../../components/sidebar';
import NavBar from '../../components/NavBar';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import editsvg from '../../assets/images/Frame (13).svg';
function IndividualStartups() {
 const {id} = useParams();
 const [data, getData] = useState(null);
const GetData = async() => {
try {
    const result = await axios.get(`http://localhost:3003/api/v1/startup/${id}`);
    getData(result.data);
    //console.log(result.data);
}
catch(err)
{
    console.log(err);
} 
}
 useEffect(() => {
    GetData();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[id])
 if (!data) return <div>Loading...</div>;
 //console.log(data?.FundingDistributes)
  return (
    <div className="flex">
                   <div>
                        <SideBar />
                    </div>
                    <div className="ms-[221px] flex-grow">
                        <div className="">
                            <NavBar />
                        </div>
                        <div className="bg-gray-100">
                                <div className="p-3">
                                        <div className="text-sm text-[#808080]">Dashboard {'>'} Start-ups {'>'} Profile</div>
                                        <div className="flex mt-4">
                                                <div></div>
                                                <div className="font-semibold text-lg">Start-up profile</div>
                                        </div>
                                        <div className="grid grid-cols-4 mt-3 gap-3">
                                            <div className="col-span-1">
                                                 <div className="bg-white rounded-md">
                                                            ushd
                                                 </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="bg-white rounded-md border p-3 px-4">
                                                            <div className="font-semibold text-lg flex justify-between">
                                                                <div>About Us</div>
                                                                <div><button><img src={editsvg} alt="edit" /></button></div>
                                                            </div>
                                                            <div className="pt-2 text-sm">Our Seat oF Joy manufacturers a child safety seat for Motorcycles that protects a child during accidents. Our Seat along with protecting the child, also slidable foldable and convertible into a storage box.</div>
                                                            <div className="flex justify-between pt-5">
                                                                    <div>
                                                                                <div className="font-semibold">Start-up Type</div>
                                                                                <div className="text-sm">Hardware</div>
                                                                    </div>
                                                                    <div>
                                                                                <div className="font-semibold">Sector</div>
                                                                                <div className="text-sm">Automotive</div>
                                                                    </div>
                                                                    <div>
                                                                                <div className="font-semibold">Program</div>
                                                                                <div className="text-sm">Nirmaan</div>
                                                                    </div>
                                                            </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-md mt-1 p-3">
                                              <div className="grid grid-cols-3">
                                                        <div className="">
                                                           <div className="font-semibold flex justify-center text-sm"> Mentor</div>
                                                           <div className="flex justify-center text-sm">Not Associated</div>
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold flex justify-center text-sm">Role of Faculty</div>
                                                            <div className="flex justify-center text-sm">Name</div>
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold flex justify-center text-sm">Cohort(Name  & Year)</div>
                                                            <div className="flex justify-center text-sm">2023</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">CIN/ Registration Number</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">Industry</div>
                                                            <div className="flex justify-center text-sm">Automobiles & Self-Driving Assistances</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">Technology</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">Year of Graduation</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">Graduated To </div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">DPIIT Number</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">Current Funding State</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">Officially Registered as</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <div className="font-semibold flex justify-center text-sm">PIA</div>
                                                            <div className="flex justify-center text-sm">-</div>
                                                        </div>
                                              </div>
                                        </div>

                                        <div className="bg-white mt-3 rounded-md">
                                                <div className="flex gap-6 text-sm p-3">
                                                        <div className="block py-2 px-3 text-black md:p-0 text-[#45C74D] hover:underline hover:underline-offset-[12px] hover:decoration-4 hover:decoration-[#45C74D]">Founder</div>
                                                        <div className="block py-2 px-3 text-black md:p-0 text-[#45C74D] hover:underline hover:underline-offset-[12px] hover:decoration-4 hover:decoration-[#45C74D]">Team Members</div>
                                                </div>
                                                <div className="flex justify-between">
                                                        <div>
                                                            
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                    </div>
    </div>
  )
} 

export default IndividualStartups
