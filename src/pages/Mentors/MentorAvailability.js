import React from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import MentorAvailabilityCalendar from "../../components/MentorAvailabilityCalendar";

function MentorAvailability() {
  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[220px] bg-gray-100 flex-grow min-h-screen">
        <NavBar />
        <main>
          <MentorAvailabilityCalendar />
        </main>
      </div>
    </div>
  );
}

export default MentorAvailability;
