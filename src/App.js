// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from "react-hot-toast";
// import { PDFViewer } from '@react-pdf/renderer';
// import 'sweetalert2/dist/sweetalert2.min.css';

// // Pages
// import Home from './pages/Home/home';
// import Login from './pages/Login';
// import Connections from './pages/Connections/connection';
// import Forms from './components/Forms';
// import Startups from './pages/startups/Startups';
// import AddStartup from './pages/startups/AddStartup';
// import Events from './pages/Events/Events';
// import MentorShip from './pages/Mentorship/MentorShip';
// import Settings from './pages/Settings/Settings';
// import CreateNewEvent from './pages/Events/CreateNewEvent';
// import AddNewMentor from './pages/Mentors/AddNewMentor';
// import Contacts from './pages/Connections/Contacts';
// import Reports from './pages/Reports/Reports';
// import RequestSpeaker from './pages/Events/RequestSpeaker';
// import UploadFile from './pages/UploadFile/UploadFile';
// import ViewComponents from './pages/UploadFile/ViewComponents';
// import Cms from './pages/cms/Cms';
// import Profile from './pages/profile/Profile';
// import FinTech from './pages/startups/FinTech/FinTech';
// import Industry from './pages/startups/Industry/Industry';
// import Sustainability from './pages/startups/Sustainability/Sustainability';
// import Healthcare from './pages/startups/Healthcare/Healthcare';
// import Mobility from './pages/startups/Mobility/Mobility';
// import IndividualStartups from './pages/startups/IndividualStartups';
// import Pdf from './pages/Reports/Pdf';
// import Bills from './Finance/Pages/Startup/Bills';
// import ScheduleMeeting from './pages/Mentors/ScheduleMeeting';
// import Startupprofile from './pages/startups/startupprofile';
// import MentorProfile from './pages/Mentors/MentorProfile';
// import Mentor from './pages/Mentors/Mentor';
// import OfficeHome from './Office/Pages/OfficeHome';

// // Customer pages
// import CustomerHome from './Customer/Pages/Home/home';
// import Resume from './Customer/Pages/Resume/Resume';
// import CustomerProfile from './Customer/Pages/Profile/Profile';
// import Resource from './Customer/Pages/Resources/Resources';
// import CustomerMentor from './Customer/Pages/Mentor/Mentor';
// import Jobs from './Customer/Pages/Job/Jobs';
// import Addjob from './Customer/Pages/Job/AddJob';
// import Profileapply from './Customer/Pages/Profile/ProfileApply';
// import RaiseRequest from './Customer/Pages/Request/RaiseRequest';
// import DisEnt from './Customer/Pages/DistEnt/DistEnt';
// import CustomerStartup from './Customer/Pages/Sartups/Startups';
// import CustomerContacts from './Customer/Pages/Contact/contact';

// // Finance
// import FinanceHome from './Finance/Pages/Home/Home';
// import FinanceUpdateFunding from './Finance/Pages/Startup/Updatefunding';

// // Utility
// import ProtectedRoutes from './utils/ProtectedRoutes';

// function App() {

//   return (
//     <div>
//       <Toaster position="top-right" reverseOrder={false} />
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/like" element={<OfficeHome />} />

//           {/* Admin Routes (Role: 2) */}
//           <Route element={<ProtectedRoutes requiredRoles={["2"]} />}>
//             <Route path="/home" element={<Home />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/startupprofile/:official_email_address" element={<Startupprofile />} />
//             <Route path="/addstartup" element={<AddStartup />} />
//             <Route path="/startups" element={<Startups />} />
//             <Route path="/connections" element={<Connections />} />
//             <Route path="/addconnections" element={<Forms />} />
//             <Route path="/mentors" element={<Mentor />} />
//             <Route path="/events" element={<Events />} />
//             <Route path="/mentorship" element={<MentorShip />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/fintechstartups" element={<FinTech />} />
//             <Route path="/industrystartups" element={<Industry />} />
//             <Route path="/Sustainability" element={<Sustainability />} />
//             <Route path="/healthcarestartups" element={<Healthcare />} />
//             <Route path="/mobilitystartups" element={<Mobility />} />
//             <Route path="/events/new" element={<CreateNewEvent />} />
//             <Route path="/contacts" element={<Contacts />} />
//             <Route path="/mentor/new" element={<AddNewMentor />} />
//             <Route path="/scheduleMeeting/:mentor_id" element={<ScheduleMeeting />} />
//             <Route path="/mentor/mentor_profile/:id" element={<MentorProfile />} />
//             <Route path="/reports" element={<Reports />} />
//             <Route path="/uploads" element={<UploadFile />} />
//             <Route path="/view/uploads" element={<ViewComponents />} />
//             <Route path="/cms" element={<Cms />} />
//             <Route path="/startup/:id" element={<IndividualStartups />} />
//             <Route path="/pdf" element={
//               <PDFViewer className="w-full h-screen">
//                 <Pdf />
//               </PDFViewer>
//             } />
//           </Route>

//           {/* Startup Profile (Role: 5) */}
//           <Route element={<ProtectedRoutes requiredRoles={["5"]} />}>
//             <Route path="/startupprofile/:official_email_address" element={<Startupprofile />} />
//             <Route path="/events/request-speaker" element={<RequestSpeaker />} />
//             <Route path="/customer/Home" element={<CustomerHome />} />
//             <Route path="/customer/resume" element={<Resume />} />
//             <Route path="/customer/resources" element={<Resource />} />
//             <Route path="/customer/Mentor" element={<CustomerMentor />} />
//             <Route path="/customer/jobs" element={<Jobs />} />
//             <Route path="/customer/profile" element={<CustomerProfile />} />
//             <Route path="/jobs/new" element={<Addjob />} />
//             <Route path="/Profile/addprofile" element={<Profileapply />} />
//             <Route path="/customer/DE" element={<DisEnt />} />
//             <Route path="/customer/home/request" element={<RaiseRequest />} />
//             <Route path="/customer/Startups" element={<CustomerStartup />} />
//             <Route path="/customer/contacts" element={<CustomerContacts />} />
//           </Route>

//           {/* Finance Routes (Role: 3) */}
//           <Route element={<ProtectedRoutes requiredRoles={["3"]} />}>
//             <Route path="/finance/home" element={<FinanceHome />} />
//             <Route path="/fin/updatefunding" element={<FinanceUpdateFunding />} />
//             <Route path="/bills" element={<Bills />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PDFViewer } from "@react-pdf/renderer";
import "sweetalert2/dist/sweetalert2.min.css";

// Pages
import Home from "./pages/Home/home";
import Login from "./pages/Login";
import Connections from "./pages/Connections/connection";
import AddConnections from "./pages/Connections/addConnection";
import Forms from "./components/Forms";
import Startups from "./pages/startups/Startups";
import AddStartup from "./pages/startups/AddStartup";
import Events from "./pages/Events/Events";
import MentorShip from "./pages/Mentorship/MentorShip";
import Settings from "./pages/Settings/Settings";
import CreateNewEvent from "./pages/Events/CreateNewEvent";
import AddNewMentor from "./pages/Mentors/AddNewMentor";
import Contacts from "./pages/Connections/Contacts";
import Reports from "./pages/Reports/Reports";
import RequestSpeaker from "./pages/Events/RequestSpeaker";
import UploadFile from "./pages/UploadFile/UploadFile";
import ViewComponents from "./pages/UploadFile/ViewComponents";
import Cms from "./pages/cms/Cms";
import Profile from "./pages/profile/Profile";
import FinTech from "./pages/startups/FinTech/FinTech";
import Industry from "./pages/startups/Industry/Industry";
import Sustainability from "./pages/startups/Sustainability/Sustainability";
import Healthcare from "./pages/startups/Healthcare/Healthcare";
import Mobility from "./pages/startups/Mobility/Mobility";
import IndividualStartups from "./pages/startups/IndividualStartups";
import Pdf from "./pages/Reports/Pdf";
import Bills from "./Finance/Pages/Startup/Bills";
import ScheduleMeeting from "./pages/Mentors/ScheduleMeeting";
import Startupprofile from "./pages/startups/startupprofile";
import MentorProfile from "./pages/Mentors/MentorProfile";
import Mentor from "./pages/Mentors/Mentor";
import OfficeHome from "./Office/Pages/OfficeHome";

// Customer pages
import CustomerHome from "./Customer/Pages/Home/home";
import Resume from "./Customer/Pages/Resume/Resume";
import CustomerProfile from "./Customer/Pages/Profile/Profile";
import Resource from "./Customer/Pages/Resources/Resources";
import CustomerMentor from "./Customer/Pages/Mentor/Mentor";
import Jobs from "./Customer/Pages/Job/Jobs";
import Addjob from "./Customer/Pages/Job/AddJob";
import Profileapply from "./Customer/Pages/Profile/ProfileApply";
import RaiseRequest from "./Customer/Pages/Request/RaiseRequest";
import DisEnt from "./Customer/Pages/DistEnt/DistEnt";
import CustomerStartup from "./Customer/Pages/Sartups/Startups";
import CustomerContacts from "./Customer/Pages/Contact/contact";

// Finance
import FinanceHome from "./Finance/Pages/Home/Home";
import FinanceUpdateFunding from "./Finance/Pages/Startup/Updatefunding";
import FinanceStartupdetails from "./Finance/Pages/Startup/Finstartup";

// Utility
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Finstartup from "./Finance/Pages/Startup/Finstartup";
import StartupFundingDetail from "./Finance/Pages/Startup/StartupfundingDetail";
import Schedule from "./pages/Mentorship/Schedule";

// Startup Logi
import StartupMentor from "./pages/startups/Mentor/MentorList";
import StartupList from "./pages/startups/Startup/StartupList"
import IpCreated from "./pages/Home/IpDetails"
import PIADetails from "./pages/Home/PIADetails";
import IITMICDetails from "./pages/Home/IITMICDetails";
function App() {
  useEffect(() => {
    localStorage.getItem("token");
  }, []);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/like" element={<OfficeHome />} />

          {/* Admin Routes (Role: 2) */}
          <Route element={<ProtectedRoutes allowedRoles={["2"]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/ipcreated" element={<IpCreated />} />
            <Route path="/home/pia" element={<PIADetails />} />
            <Route path="/home/iitmic" element={<IITMICDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/startups/addstartup" element={<AddStartup />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/addconnections" element={<AddConnections />} />
            <Route path="/mentors" element={<Mentor />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mentorship" element={<MentorShip />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/fintechstartups" element={<FinTech />} />
            <Route path="/industrystartups" element={<Industry />} />
            <Route path="/Sustainability" element={<Sustainability />} />
            <Route path="/healthcarestartups" element={<Healthcare />} />
            <Route path="/mobilitystartups" element={<Mobility />} />
            <Route path="/events/new" element={<CreateNewEvent />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/mentors/new" element={<AddNewMentor />} />
            <Route
              path="/mentors/scheduleMeeting/:mentor_id"
              element={<ScheduleMeeting />}
            />

            <Route path="/reports" element={<Reports />} />
            <Route path="/uploads" element={<UploadFile />} />
            <Route path="/view/uploads" element={<ViewComponents />} />
            <Route path="/cms" element={<Cms />} />
            <Route path="/startup/:id" element={<IndividualStartups />} />
            <Route
              path="/pdf"
              element={
                <PDFViewer className="w-full h-screen">
                  <Pdf />
                </PDFViewer>
              }
            />
            <Route path="/mentorship/scheduleMeeting" element={<Schedule />} />
          </Route>

          {/* Startup Profile Routes (Admin: 2 + Students: 5) */}
          <Route element={<ProtectedRoutes allowedRoles={["2", "5"]} />}>
            <Route
              path="/startups/startupprofile/:startup_id"
              element={<Startupprofile />}
            />
            <Route
              path="/events/request-speaker"
              element={<RequestSpeaker />}
            />
          </Route>

          {/* Mentor Profile Routes (Admin: 2 + Mentor: 6) */}
          <Route element={<ProtectedRoutes allowedRoles={["2", "6"]} />}>
            <Route
              path="/mentors/mentor_profile/:id"
              element={<MentorProfile />}
            />
            <Route
              path="/events/request-speaker"
              element={<RequestSpeaker />}
            />
          </Route>

          {/* Student Only Routes (Role: 5) */}
          <Route element={<ProtectedRoutes allowedRoles={["5"]} />}>
            <Route path="/customer/Home" element={<CustomerHome />} />
            {/* <Route path="/startupprofile/" element={<Startupprofile/>} /> */}
            <Route path="/customer/resume" element={<Resume />} />
            <Route path="/customer/resources" element={<Resource />} />
            <Route path="/customer/Mentor" element={<CustomerMentor />} />
            <Route path="/customer/jobs" element={<Jobs />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
            <Route path="/jobs/new" element={<Addjob />} />
            <Route path="/Profile/addprofile" element={<Profileapply />} />
            <Route path="/customer/DE" element={<DisEnt />} />
            <Route path="/customer/home/request" element={<RaiseRequest />} />
            <Route path="/customer/Startups" element={<CustomerStartup />} />
            <Route path="/customer/contacts" element={<CustomerContacts />} />
            <Route path="/startup/mentor" element={<StartupMentor />} />
            <Route path="/startup/startuplist" element={<StartupList />} />
          </Route>

          {/* Finance Routes (Role: 3) */}
          <Route element={<ProtectedRoutes allowedRoles={["3"]} />}>
            <Route path="/finance/home" element={<FinanceHome />} />
            <Route
              path="/fin/updatefunding"
              element={<FinanceUpdateFunding />}
            />
            <Route path="/bills" element={<Bills />} />
            <Route path="/finance/startup" element={<Finstartup />} />
            <Route
              path="/finance/startupdetail/:startup_id"
              element={<StartupFundingDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
