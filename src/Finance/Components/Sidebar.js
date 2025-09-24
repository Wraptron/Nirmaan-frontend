// import React, {useState} from 'react'
// import { FaDatabase, FaHome,} from 'react-icons/fa';
// import { FaMoneyBillTransfer } from 'react-icons/fa6';

// function SideBar({children}) {
//   return (
// <div className="fixed top-0 left-0 mt-14 h-screen md:w-11 sm:w-9 w-9 m-0 flex flex-col text-black border-gray-500 shadow-md">
//       <SideBarLink href="/finance/home">
//           <SideBarIcon icon={<FaHome size="24" />} tooltipText="Home" />
//       </SideBarLink>
//       <SideBarLink href="/fin/updatefunding">
//           <SideBarIcon icon={<FaMoneyBillTransfer size="24" />} tooltipText="Update bill" />
//       </SideBarLink>
//       <SideBarLink href="/bills">
//           <SideBarIcon icon={<FaDatabase  size="24"/>} tooltipText="Bills data" />
//       </SideBarLink>
// </div>
//   );
// }

// const SideBarLink = ({ href, children }) => {
//   return (
//     <a href={href} className="block">
//       {children}
//     </a>
//   );
// };

// const SideBarIcon = ({ icon, tooltipText }) => {
//   const [hoverTooltip, setHoverTooltip] = useState(false);

//   const handleMouseEnter = () => {
//     setHoverTooltip(true);
//   };

//   const handleMouseLeave = () => {
//     setHoverTooltip(false);
//   };

//   return (
//     <div
//       className="relative flex items-center justify-center h-9 w-8 lg:mt-2 mb-3 mx-auto hover:border-2 hover:border-green-400 hover:bg-green-300 text-gray-500 transition-all duration-300 cursor-pointer group active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all rounded-md"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {icon}
//       {hoverTooltip && (
//         <span className="absolute w-auto p-2 m-2 min-w-max left-8 rounded-md shadow-md text-slate-800 bg-white text-xs font-bold transition duration-1000 scale-100 border z-10 ">
//             {tooltipText}
//         </span>
//       )}
//     </div>
//   );
// };
// export default SideBar;

import React from "react";
import { FaChartPie, FaRocket, FaChalkboardTeacher } from "react-icons/fa";
import nirmaanlogo from "../../assets/images/nirmaan-iitm.14fdf833.svg";
function SideBar({ children }) {
  // const [userRole, setUserRole] = useState('customer');
  // const currentPath = window.location.pathname;
  // const ShowArrowIcon = currentPath === '/customer/Home';
  const currentPath = window.location.pathname;
  return (
    <div className="fixed top-0 left-0 h-screen md:w-[220px] sm:w-9 w-9 m-0 flex flex-col text-black border-r-0 border-gray-500 shadow-md bg-white">
      <div className="md:px-[50px] pt-4">
        <img src={nirmaanlogo} alt="Nirmaan logo" className="w-[120px;]" />
      </div>
      <div className="">
        <ul className="py-5 px-8">
          <li
            className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 mt-2 ${currentPath === "/finance/home" && "bg-[#45C74D] text-white rounded-xl"}`}
          >
            <a href="/finance/home" className="flex gap-5">
              <FaChartPie size={20} /> Dashboard
            </a>
          </li>
          <li
            className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath === "/finance/startup" && "bg-[#45C74D] text-white rounded-xl"}`}
          >
            <a href="/finance/startup" className="flex gap-5">
              <FaRocket size={20} />
              Start-ups
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SideBar;
