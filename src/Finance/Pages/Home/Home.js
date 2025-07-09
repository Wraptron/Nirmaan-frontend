import React, {useState, useEffect} from 'react'
import SideBar from '../../../Finance/Components/Sidebar'
import NavBar from '../../../components/NavBar'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import FundingAksharPieChart from '../../../components/FundingAkshar'
import FundingPrathamPieChart from '../../../components/FundingPratham'
import FundingUtilized from '../../../components/FundingUtilized'
import FundsRemaining from '../../../components/FundsRemaining'
import axios from 'axios'
const FinanceHome = () => {
  //console.log(props)
  const [data, setData] = useState([]);
  const Api = async() => {
    try
    {
      const result = await axios.get('http://localhost:3003/api/v1/count-startupdata');
      //console.log(result.rows);
      // if(result)
      console.log(result)
      setData(result.data)
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(() => {
      Api()
      console.log('hello')
  }, [])
  return (
              <div className="h-screen flex">
                    <section className="fixed h-full">
                          <SideBar />
                    </section>
                    <section className="flex-grow">
                            <div className="fixed w-full">
                                  <NavBar />
                            </div>
                            <div className="p-[90px;] h-full">
                                    <div className="grid md:grid-cols-4 gap-4 mt-2 grid-cols-1">
                                          <div className="col-span-3 gap-3">
                                                  <div className="grid md:grid-cols-4 gap-2">
                                                      <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}>
                                                              <div className="p-4 text-md text-gray-600">Pratham (in Total)</div>
                                                              <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-500"><span><FaIndianRupeeSign /></span>{data?.Funding_Distrubuted_data?.Pratham?.Total_funding_pratham || "NA"}</div>
                                                      </div>
                                                      <div className="shadow-md rounded-lg w-[100%;]" style={{backgroundColor: '#afd5de'}}>
                                                          <div className="p-4 text-md font-semibold text-gray-600">Akshar (in Total)</div>
                                                          <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-500"><span><FaIndianRupeeSign /></span>{data?.Funding_Distrubuted_data?.Akshar?.Total_funding_Akshar}</div>
                                                      </div>
                                                      <div className="shadow-md rounded-lg w-[100%;]" style={{backgroundColor: '#afcdde'}}>
                                                              <div className="p-4 text-md font-semibold text-gray-600">Total funds distributed</div>
                                                              <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-500"><span><FaIndianRupeeSign /></span>{data?.Funding_Distrubuted_data?.Total_funding_used?.Total_funding_distributed || "NA"}</div>
                                                      </div>
                                                      <div className="shadow-md rounded-lg w-[100%;]" style={{backgroundColor: '#7da1ad'}}>
                                                              <div className="p-4 text-md font-semibold text-gray-600">Total funds utilized</div>
                                                              <div className="p-3 pt-3 text-3xl font-semibold pb-4 justify-end items-end flex text-gray-600"><span><FaIndianRupeeSign /></span>{data?.Funding_Distrubuted_data?.Total_funding_used?.Total_funds_utilized || "NA"}</div>
                                                      </div>
                                                  </div>
                                                  <div className="grid md:grid-cols-2 gap-6 mt-10 mb-2">
                                                      <div className="shadow-md rounded-lg w-[100%;] border md:h-[435px;]">
                                                              <div className="p-2 md:text-md text-gray-600 font-semibold">Funding Distributed across Sectors(Akshar)</div>
                                                              <div className="justify-center items-center"><FundingAksharPieChart props={data} /></div>
                                                      </div>
                                                      <div className="shadow-md rounded-lg w-[100%;] border">
                                                          <div className="p-3 pt-2 md:text-md text-gray-600 font-semibold">Funding Distributed across Sectors(Pratham)</div>
                                                          <div className="justify-center items-center"><FundingPrathamPieChart props={data} /></div>
                                                      </div>
                                                  </div>
                                          </div>
                                          <div className="col-span-1  gap-3">
                                                  <div className="grid grid-cols-1 gap-3 mb-2">
                                                      <div className="shadow-md font-semibold rounded-lg w-full md:h-[300px;] border">
                                                          <div className="p-2 pt-1 text-xs text-gray-600 font-semibold">Funding Utilized across sectors</div>
                                                          <div className="flex justify-center items-center mb-1">
                                                              <div className="w-50 h-50 overflow-hidden">
                                                                      <FundingUtilized props={data}/>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="grid grid-cols-1 gap-3">
                                                      <div className="shadow-md font-semibold rounded-lg w-full md:h-[300px;] border">
                                                          <div className="p-2 pt-1 text-sm text-gray-600 font-semibold">Total Funds remaining</div>
                                                          <div className="flex justify-center items-center mb-1">
                                                              <div className="w-50 h-50 overflow-hidden">
                                                                  <FundsRemaining props={data}/>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                          </div>
                                    </div> 
                            </div>
                    </section>
              </div>
  )
}

export default FinanceHome;