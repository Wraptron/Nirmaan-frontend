import React, {useState} from "react";
import FundingPrathamPieChart from "../../../components/FundingPratham";
import { FaIndianRupeeSign } from "react-icons/fa6";
import FundingAksharPieChart from "../../../components/FundingAkshar";
import FundingUtilized from "../../../components/FundingUtilizedFinance";
import FundsRemaining from "../../../components/FundsRemaining";
import TopFundingDistributed from "../../../components/TopFundingDistributed";
import FundingByCohort from "../../../components/FundingByCohort";
import numberWithCommas from "../../../components/CommaSeperation";
function HomeFinance(props){
    console.log(props.props)
    const [selectedTopSectors, setSelectedTopSectors] = useState(1);
    const handleSectorChange = (event) => {
        setSelectedTopSectors(Number(event.target.value));
    };
    return(
    
                <div className="grid md:grid-cols-4 gap-4 mt-2 grid-cols-1">
                        <div className="col-span-3 gap-3">
                                <div className="grid md:grid-cols-4 gap-2">
                                    <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}>
                                            <div className="p-4 text-md text-gray-600">Pratham (in Total)</div>
                                            <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-500"><span><FaIndianRupeeSign /></span>{numberWithCommas(props?.props?.Funding_Distrubuted_data?.Pratham?.Total_funding_pratham) || "NA"}</div>
                                    </div>
                                    <div className="shadow-md rounded-lg w-[100%;]" style={{backgroundColor: '#afd5de'}}>
                                        <div className="p-4 text-md font-semibold text-gray-600">Akshar (in Total)</div>
                                        <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-500"><span><FaIndianRupeeSign /></span>{numberWithCommas(props?.props?.Funding_Distrubuted_data?.Akshar?.Total_funding_Akshar)}</div>
                                    </div>
                                    <div className="shadow-md rounded-lg w-[100%;]" style={{backgroundColor: '#afcdde'}}>
                                            <div className="p-4 text-md font-semibold text-gray-600">Total funds distributed</div>
                                            <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-500"><span><FaIndianRupeeSign /></span>{numberWithCommas(props?.props?.Funding_Distrubuted_data?.Total_funding_used?.Total_funding_distributed) || "NA"}</div>
                                    </div>
                                    <div className="shadow-md rounded-lg w-[100%;]" style={{backgroundColor: '#7da1ad'}}>
                                            <div className="p-4 text-md font-semibold text-gray-600">Total funds utilized</div>
                                            <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-600"><span><FaIndianRupeeSign /></span>{numberWithCommas(props?.props?.Funding_Distrubuted_data?.Total_funding_used?.Total_funds_utilized)  || "NA"}</div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 mt-10 mb-2">
                                    <div className="shadow-md rounded-lg w-[100%;] border md:h-[435px;]">
                                            <div className="p-2 md:text-md text-gray-600 font-semibold">Funding Distributed across Sectors(Akshar)</div>
                                            <div className="justify-center items-center"><FundingAksharPieChart props={props} /></div>
                                    </div>
                                    <div className="shadow-md rounded-lg w-[100%;] border">
                                        <div className="p-3 pt-2 md:text-md text-gray-600 font-semibold">Funding Distributed across Sectors(Pratham)</div>
                                        <div className="justify-center items-center"><FundingPrathamPieChart props={props} /></div>
                                    </div>
                                </div>
                        </div>
                        <div className="col-span-1  gap-3">
                                <div className="grid grid-cols-1 gap-3 mb-2">
                                    <div className="shadow-md font-semibold rounded-lg w-full md:h-[300px;] border">
                                        <div className="p-2 pt-1 text-xs text-gray-600 font-semibold">Funding Utilized across sectors</div>
                                        <div className="flex justify-center items-center mb-1">
                                            <div className="w-50 h-50 overflow-hidden">
                                                    <FundingUtilized props={props}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="shadow-md font-semibold rounded-lg w-full md:h-[300px;] border">
                                        <div className="p-2 pt-1 text-sm text-gray-600 font-semibold">Total Funds remaining</div>
                                        <div className="flex justify-center items-center mb-1">
                                            <div className="w-50 h-50 overflow-hidden">
                                                <FundsRemaining props={props}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="col-span-4 gap-4">
                                <div className="shadow-md font-semibold rounded-lg w-full md:h-[370px] border mt-2">
                                    <div className="flex justify-between">
                                        <div className="p-2">Most funded startup</div>
                                        <select className="border border-gray-300 rounded-lg px-6 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 ring:none m-2" onChange={handleSectorChange}>
                                                <option value="1">Top 2 sectors</option>
                                                <option value="2">Top 3 sectors</option>
                                                <option value="3">Top 5 sectors</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center items-center mb-1">
                                            <div className="w-50 h-50 overflow-hidden">
                                                <TopFundingDistributed selectedTopSectors={selectedTopSectors}/>
                                            </div>
                                    </div>
                                </div>
                        </div>
                        <div className="col-span-4 gap-4">  
                                <div className="shadow-md font-semibold rounded-lg w-full md:h-[370px] border mt-2">
                                    <div className="flex justify-between">
                                        <div className="p-2">Top 10 funded startups</div>
                                        <select className="border border-gray-300 rounded-lg px-6 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 ring:none m-2" onChange={handleSectorChange}>
                                                <option value="1">Top 2 sectors</option>
                                                <option value="2">Top 3 sectors</option>
                                                <option value="3">Top 5 sectors</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-center items-center mb-1">
                                            <FundingByCohort selectedTopSectors={selectedTopSectors}/>
                                    </div>
                                </div>
                        </div>
                </div>
    )
}
export default HomeFinance;