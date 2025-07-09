import React, {useState} from 'react'
import { FaUser, FaPuzzlePiece, FaUsers, FaLayerGroup, FaPhone, FaBusinessTime, FaFile, FaFilePdf } from 'react-icons/fa';

function SideBar() {
  return (
    <div className="fixed top-0 left-0 mt-14 h-screen md:w-11 sm:w-9 w-9 m-0 flex flex-col text-black border-r-0 border-gray-500 shadow-md">
      <SideBarLink href="/customer/Profile">
          <SideBarIcon icon={<FaUser size="16"/>} tooltipText="Profile" />
      </SideBarLink>
      <SideBarLink href="/customer/DE">
          <SideBarIcon icon={<FaPuzzlePiece size="16"/>} tooltipText="DisEnt" />
      </SideBarLink>
      <SideBarLink href="/customer/Mentor">
          <SideBarIcon icon={<FaUsers size="16"/>} tooltipText="Mentor" />
      </SideBarLink>
      <SideBarLink href="/customer/Startups">
          <SideBarIcon icon={<FaLayerGroup size="16"/>} tooltipText="Startups" />
      </SideBarLink>
      <SideBarLink href="/customer/Contacts">
          <SideBarIcon icon={<FaPhone size="16"/>} tooltipText="Contacts" />
      </SideBarLink>
      <SideBarLink href="/customer/Jobs">
          <SideBarIcon icon={<FaBusinessTime  size="16"/>} tooltipText="Jobs" />
      </SideBarLink>
      <SideBarLink href="/customer/Resources">
          <SideBarIcon icon={<FaFile  size="16"/>} tooltipText="Resources" />
      </SideBarLink>
      <SideBarLink href="/customer/resume">
          <SideBarIcon icon={<FaFilePdf size="16" />} tooltipText="Resume" />
      </SideBarLink>
    </div>
  );
}

const SideBarLink = ({ href, children }) => {
  return (
    <a href={href} className="block">
      {children}
    </a>
  );
};

const SideBarIcon = ({ icon, tooltipText }) => {
  const [hoverTooltip, setHoverTooltip] = useState(false);

  const handleMouseEnter = () => {
    setHoverTooltip(true);
  };

  const handleMouseLeave = () => {
    setHoverTooltip(false);
  };

  return (
    <div
      className="relative flex items-center justify-center h-9 w-8 lg:mt-2 mb-3 mx-auto hover:border-2 hover:border-green-400 hover:bg-green-300 text-gray-500 transition-all duration-300 cursor-pointer group active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all rounded-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      {hoverTooltip && (
        <span className="absolute w-auto p-2 m-2 min-w-max left-8 rounded-md shadow-md text-slate-800 bg-white text-xs font-bold transition duration-1000 scale-100 border z-10">
            {tooltipText}
        </span>
      )}
    </div>
  );
};
export default SideBar;