import React,{useState, useEffect} from 'react'
import SideBar from '../../components/sidebar'
import NavBar from '../../components/NavBar'
import filtersvg from '../../assets/images/Filter up and down.svg'

function Reports() {
  const[showw, setShoww] = useState(false);
      useEffect(() => {
          setShoww(true);
      }, [])
  return (
    <div className="flex">
        <div>
            <SideBar />
        </div>
        <div id="" className="ms-[221px] flex-grow">
            <NavBar />
            <div className="bg-gray-100">
                <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
                           <div className="bg-white rounded-lg shadow-sm p-3">
                                        <div className="text-sm text-[#808080]">Dashboard {'>'} Reports</div>
                                        <div className="mt-3 font-semibold text-lg">Generate Start-ups Reports</div>
                                        <div className="border border-l-0 border-b-0 border-r-0 mt-4">
                                                <center>
                                                        <div className="grid grid-cols-3 mx-10 mt-10">
                                                                    <div className=""><span className="bg-[#45C74D] px-2 rounded-2xl text-white">1</span></div>
                                                                    <div><span className="bg-[#45C74D] px-2 rounded-2xl text-white">2</span></div>
                                                                    <div><span className="bg-[#45C74D] px-2 rounded-2xl text-white">3</span></div>
                                                        </div>
                                                </center>
                                        </div>
                                        <div className="flex gap-2 mt-5">
                                                <div><img src={filtersvg} alt="" /></div>
                                                <div>Filter by</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                                <div className="p-2">
                                                    <div className='font-semibold text-sm'>Status</div>
                                                    <div className="flex justify-between mt-5">
                                                            <div className="gap-3 flex">
                                                                    <input type="radio" className="mt-1"/>
                                                                    <label>Active</label>
                                                            </div>
                                                            <div className="gap-3 flex">
                                                                    <input type="radio" className="mt-1 focus:ring-[#45C74D] focus:border-[#45C74D] focus:bg-[#45C74D]"/>
                                                                    <label>Graduated</label>
                                                            </div>
                                                            <div className="gap-3 flex">
                                                                    <input type="radio" className="mt-1"/>
                                                                    <label>Dropped out</label>
                                                            </div>
                                                    </div>
                                                    <div className="mt-7">
                                                            <div>Sector</div>
                                                            <div className="mt-2"><input type="text" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" /></div>
                                                    </div>
                                                    <div className="mt-7">
                                                            <div>Stage</div>
                                                            <div className="mt-2"><input type="text" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" /></div>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <div className="font-semibold text-sm ">Program</div>
                                                    <div className="mt-2"><input type="text" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" /></div>
                                                    <div className="mt-7">
                                                        <div>Cohort</div>
                                                        <div className="mt-2"><input type="text" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" /></div>
                                                    </div>
                                                    <div className="mt-7">
                                                        <div>Mentors Associated</div>
                                                        <div className="mt-2"><input type="text" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" /></div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="grid grid-cols-2 mt-5">
                                                <div className="underline text-sm text-[#45C74D]">Clear Filter</div>
                                                <div><button className="px-2 bg-[#45C74D] rounded-lg text-white py-1 flex justify-center item-center text-sm">Next</button></div>
                                        </div>
                           </div>   
                </div>  
            </div>
        </div>
    </div>
  )
}
export default Reports