import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/sidebar'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import mailsvg from '../../assets/images/Frame (6).svg';
import phonesvg from '../../assets/images/Frame (7).svg';
import whatsappsvg from '../../assets/images/Frame (8).svg';
import dummysvg from '../../assets/images/image (1).svg';
import linkedinsvg from '../../assets/images/Frame (9).svg';
import bgsvg from '../../assets/images/Rectangle 5.svg';
import mentorsvg from '../../assets/images/Frame (11).svg';
import editsvg from '../../assets/images/Frame (12).svg';
import Mentor from './Mentor';
import { ApiFetchMentor } from '../../API/API'; 





function MentorProfile() {
  const [data, setData] = useState([]);

  const FetchData = async () => {
    try {
      const API = await ApiFetchMentor();
      setData(API.STATUS.rows);
    } catch (err) {
      console.error(err);
    }
  } 

  useEffect(() => {
    FetchData();
  } , []);






  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100">
          <div className="p-5 text-sm text-[#808080]">
            Dashboard {">"} Mentors {">"} Profile
          </div>
          <div className="flex gap-5 px-5">
            <div className="pt-1">
              <a href={"/mentors"}>
                <img src={mentorsvg} />
              </a>
                        
            </div>
            <div className="text-lg font-semibold pt-1">Mentor Profile</div>
          </div>
          <div className="px-5 py-4">
            {data.map((mentor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border"
              >
                <div className="relative flex">
                  <img src={bgsvg} className="" />
                  <div>
                    <button>
                      <img
                        src={editsvg}
                        className="absolute top-5 left-[1040px]"
                      />
                    </button>
                  </div>
                </div>
                <div className="shadow-sm px-5 py-2">
                  <div className="grid grid-cols-4 py-2 shadow-md rounded-lg">
                    <div className="col-span-1">
                      <img src={bgsvg} />
                    </div>
                    <div className="col-span-3 px-2">
                      <div className="flex gap-2">
                        <div className="text-lg font-semibold">
                          {mentor.mentor_name}
                        </div>
                        <div className="">
                          <img src={linkedinsvg} className="w-[20px] pt-1" />
                        </div>
                      </div>
                      <div className="text-xs text-[#88080]">
                        Co-founder of Ultimate Business Advisors LLP
                      </div>
                      <div className="flex gap-4 mt-3">
                        <div>
                          <img src={mailsvg} />
                        </div>
                        <div>{mentor.email_address}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-4 mt-3">
                          <div>
                            <img src={phonesvg} />
                          </div>
                          <div>{mentor.contact_num}</div>
                        </div>
                        <div className="flex gap-5">
                          <button className="bg-[#45C74D] p-1 rounded-md">
                            <img src={whatsappsvg} />
                          </button>
                          <button className="bg-[#45C74D] p-1 rounded-md text-white">
                            Schedule Session
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-5 shadow-md border rounded-lg py-2 px-1 mt-4">
                    <div className="">
                      <div>Years Of Passing</div>
                      <div>--</div>
                    </div>
                    <div>
                      <div>Qualification</div>
                      <div>{mentor.qualification}</div>
                    </div>
                    <div>
                      <div>Institution</div>
                      <div>{mentor.institution}</div>
                    </div>
                    <div>
                      <div>Expertise</div>
                      <div>--</div>
                    </div>
                  </div>

                  <div className="rounded-lg py-2 px-1 mt-4">
                    <div className="flex text-lg">About</div>
                    <div className="text-sm">{mentor.mento_description}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white border shadow-sm px-5 py-2 mt-4 rounded-md">
              <div>Current Mentees</div>

              <div className="bg-[#FAFAFA] rounded-md ">
                <div className="flex justify-between mt-2 px-6">
                  <div className="flex gap-7">
                    <div>
                      <img src={dummysvg} className="w-12" />
                    </div>
                    <div>
                      <div>Start-up-Name</div>
                      <div className="text-sm">Current Position</div>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#45C74D] text-white p-1 mt-[3px] rounded-md text-sm">
                      Visit Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAFA] rounded-md ">
                <div className="flex justify-between mt-2 px-6">
                  <div className="flex gap-7">
                    <div>
                      <img src={dummysvg} className="w-12" />
                    </div>
                    <div>
                      <div>Start-up-Name</div>
                      <div className="text-sm">Current Position</div>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#45C74D] text-white p-1 mt-[3px] rounded-md text-sm">
                      Visit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border shadow-sm px-5 py-2 mt-4 rounded-md">
              <div className="font-semibold">Mentoring Sessions</div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Start-up
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Mentor Hours
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-3">Start-up-Name</td>
                      <td className="px-6 py-3">DD/MM/YYY</td>
                      <td className="px-6 py-3">2 hours</td>
                      <td className="px-6 py-3">
                        <button className="p-1 text-sm bg-[#45C74D] text-white rounded-md">
                          Visit Feedback
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-3">Start-up-Name</td>
                      <td className="px-6 py-3">DD/MM/YYY</td>
                      <td className="px-6 py-3">2 hours</td>
                      <td className="px-6 py-3">
                        <button className="p-1 text-sm bg-[#45C74D] text-white rounded-md">
                          Visit Feedback
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile