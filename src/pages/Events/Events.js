import React,{useEffect, useState} from 'react'
import SideBar from "../../components/sidebar";
import NavBar from '../../components/NavBar';
import { FaBars, FaEllipsisV } from 'react-icons/fa';
import AddPastEvents from './AddPastEvents';
import CreateNewEvent from './CreateNewEvent';
import RequestSpeaker from './RequestSpeaker';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ApiFetchEvents } from '../../API/API';
import { GiConsoleController } from 'react-icons/gi';
import { FaEllipsis } from 'react-icons/fa6';
import calendersvg from '../../assets/images/Calendar.svg';
import Clocksvg from '../../assets/images/Clock.svg'
function Events() {
    const [openPopUp, setOpenpopup] = useState(false);
    const handleShow = (e) => setOpenpopup(true);

    const [openCreateNewEvent, setCreateNewEvent] = useState(false);
    const handleShow2 = (e) => setCreateNewEvent(true);

    const [reqSpeaker, setRequestSpeaker] = useState(false);
    const [eventData, setEventData] = useState([]);
    const handleShow3 = (e) => setRequestSpeaker(true);

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = eventData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(eventData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    let localStoragee = localStorage.getItem('token');
    let decodedStorage = jwtDecode(localStoragee);
//     console.log(decodedStorage.user_mail);
    const[formData, setFormData] = useState({
        event_type: 'Webinar',
        event_title: '',
        event_privacy: 'Public',
        event_description: '',
        // event_speaker: '',
        event_date: '',
        event_time: '',
        created_by: decodedStorage.user_mail
    });
    console.log(formData);
    const handleChangeEve = (e) => {
        const {name, value} = e.target;
        setFormData((prevData)=>({ 
            ...prevData,
            [name]: value,
        }))
     }
    const CreateEveData = async(e) => {
        e.preventDefault();
        try{
            const result = await axios.post('http://localhost:3003/api/v1/create-events', formData);
            console.log(result.data);
            if(result)
            {
                toast.success("Event Created");
                setCreateNewEvent(false);
            }
        }
        catch(err)
        {
             if(err.response.status===400)
             {
                toast.error('All fields are required')
             }
        }
    }
    const Events = async() => {
        try 
        {
                const result = await ApiFetchEvents();
                //console.log(result.rows);
                setEventData(result.rows);
                console.log(eventData);
        }
        catch(err)
        {
                console.log(err);
        }
    }
    
    useEffect(() => {
                Events()
    },[])
    const [requestSpeakerData, setRequestSpeakerData] = useState({
        select_speaker: 'B.Vaidyanathan',
        event_description: '',
        created_by: decodedStorage.user_mail
    });
    const handleChangeReqSpeaker = (e) => {
        const {name, value} = e.target;
        setRequestSpeakerData((prevData)=>({ 
            ...prevData,
            [name]: value,
        }))
     }
//      console.log(requestSpeakerData);
     const RequestSpeakerButton = async(e) => {
        e.preventDefault();
                try 
                {
                        const result = await axios.post('http://localhost:3003/api/v1/mentor/request-speaker', requestSpeakerData)
                        if(result)
                        {
                                toast.success('Speaker Requested') ;
                                setRequestSpeaker(false);    
                        }               
                }
                catch(err)
                {
                        console.log(err);
                        if(err)
                        {
                                if(err.response.status === 401)
                                {
                                        toast.error('Fields required')
                                }
                        }
                }
     }
    const [fetchedMentorData, setFetchedMentorData] = useState([  ]);
    const FetchMentorName = async() => {
        try
        {
                const result = await axios.get('http://localhost:3003/api/v1/get-mentor-details');
                if(result)
                {
                        setFetchedMentorData(result.data.STATUS.rows); 
                }
        }
        catch(err)
        {
                console.log(err); 
        }
    }


//     Add Past events Data 
    const [AddPastEvent, setPastEvent] = useState({
        event_type: '',
        event_title: '',
        event_privacy: 'Public', 
        event_description: '',
        select_speaker: '',
        event_date: '',
        event_time: '',
        created_by: decodedStorage.user_mail
    })
 
    const handleChangePastEvent = (e) => {
        const {name, value} = e.target;
        setPastEvent((prevData)=>({ 
            ...prevData,
            [name]: value,
        }))
     }
     console.log(AddPastEvent)

     const SubmitAddPastEvent = async(e) => {
        e.preventDefault();
        try 
        {
                const result = await axios.post('http://localhost:3003/api/v1/create-events', AddPastEvent);
                if(result)
                {
                        toast.success('Created Events');
                        setOpenpopup(false)
                }
        }
        catch(err)
        {
                if(err)
                {
                        if(err.response.status === 400)
                        {
                                toast.error("Check all fields");
                        }
                }
        }
     }
    useEffect(() => {
        FetchMentorName();
    }, [])
    const [showw, setShoww] = useState(false);
    useEffect(() => {
        setShoww(true);
    }, [])
  return (
    <div className="flex">
        <div>
                <SideBar />               
        </div>
        <div className="ms-[221px] flex-grow">
                <NavBar />
                <div className="bg-gray-100">
                        <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
                                <div className="bg-white rounded-lg shadow-sm">
                                        <div className="flex gap-2 text-sm p-3 text-[#808080]">
                                                <div>Dashboard</div>
                                                <div>{'>'}</div>
                                                <div>Events</div>
                                        </div>
                                        <div className="px-3 text-lg font-semibold pt-2">All Events</div>
                                        <div className="pt-10">
                                                <div className="grid grid-cols-2 px-3 py-3">
                                                        <div><input type="text" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/></div>
                                                        <div className="flex gap-5 justify-end">
                                                                        <button className="border border-[#45C74D] rounded-lg p-2 text-sm">Request Speaker</button>
                                                                        <button className="border bg-[#45C74D] rounded-lg p-2 text-sm text-white">Create Event</button>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="mt-2 px-3 pb-3">
                                                        <div className="grid grid-cols-3 gap-5">
                                                                <div className="shadow-lg rounded-lg border">
                                                                        <div className="grid grid-cols-2 gap-4 px-3">
                                                                                <div className="flex py-2 gap-2">
                                                                                        <div className="bg-[#FFE7CC] p-1 text-sm px-2 py-1 text-sm rounded-lg text-[#FF8800]">Webinar</div>
                                                                                        <div className="bg-[#C8DFFF] px-2 py-1 text-sm rounded-lg text-[#005FE4]">Public</div>
                                                                                </div>
                                                                                <div id="3dots">
                                                                                        <div className="flex justify-end items-end py-3">
                                                                                                        <FaEllipsis />
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        {/* <div className="pt-2 px-3">
                                                                                <img src="../../assets/images/296fe121-5dfa-43f4-98b5-db50019738a7.jpg" />
                                                                        </div> */}
                                                                        <div className="px-3 pb-2 pt-2">
                                                                                        <div className="font-semibold text-lg">Nirmaan-DemoDay</div>
                                                                                        <div className="flex gap-4 pt-2">
                                                                                                <div className="flex gap-1">
                                                                                                        <div><img src={calendersvg} width={'15px'}/></div>
                                                                                                       <div className="text-sm">MM/DD/YY</div>
                                                                                                </div>
                                                                                                <div className="flex gap-1">
                                                                                                        <div><img src={Clocksvg} width={'15px'}/></div>
                                                                                                       <div className="text-sm">HH:MM</div>
                                                                                                </div>
                                                                                                
                                                                                        </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                        </div>
                                </div>
                        </div>
                </div>
                
        </div>
        <AddPastEvents isVisible={openPopUp} onClose={()=>setOpenpopup(false)}>
                <h1 className="font-semibold">Add Past Events</h1>
                <form onSubmit={SubmitAddPastEvent}>
                <div className="grid grid-cols-2 gap-4 mt-10">
                        <div class="relative">
                                <select id="countries" name="event_type" className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChangePastEvent}>
                                        <option value="Webinar">Webinar</option>
                                        <option value="Conference">Conference</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Masterclass">Masterclass</option>
                                </select>
                                <label for="countries" id="floatig_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5">Event type</label>
                        </div>
                        <div className="relative">
                                <input onChange={handleChangePastEvent} type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="event_title"/>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event title</label>
                        </div>
                        <div className="relative">
                                <input onChange={handleChangePastEvent} type="date" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="event_date"/>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event date</label>
                        </div>
                        <div className="relative">
                                <input onChange={handleChangePastEvent} type="time" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="event_time"/>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event time</label>
                        </div>                                                
                </div>
                <div className="grid grid-cols-1 gap-4 mt-2">
                     <textarea onChange={handleChangePastEvent} className="border rounded-md resize-none" name="event_description"></textarea>
                     <div class="relative">
                                <select id="countries" className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="select_speaker" onChange={handleChangePastEvent}>
                                        <option disabled selected>Select Speaker</option>
                                        {Array.isArray(fetchedMentorData) && fetchedMentorData.length > 0 ? (
                                                fetchedMentorData.map((dataObj, key) => (
                                                        <option key={key} value={dataObj.mentor_name}>
                                                                {dataObj.mentor_name}
                                                        </option>    
                                                ))
                                        ) : null}
                                </select>
                                <label for="countries" id="floatig_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5">Select Speaker</label>
                    </div>
                </div>
                <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md flex items-center justify-center"  style={{backgroundColor: '#afcdde'}}>Submit</button>                
        </form>
        </AddPastEvents>
        <CreateNewEvent isVisible={openCreateNewEvent} onClose={()=>setCreateNewEvent(false)}>
                <form onSubmit={CreateEveData}>
                <h1 className="text-gray-500 font-semibold">Create Event</h1>
                <div className="grid grid-cols-3 gap-4 mt-10">
                        <div class="relative">
                                <select id="countries" name="event_type" onChange={handleChangeEve} className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option>Hello</option>
                                </select>
                                <label for="countries" id="floatig_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5">Event type</label>
                        </div>
                        <div className="relative">
                                <input type="text" id="floating_outlined" onChange={handleChangeEve} name="event_title" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event Title</label>
                        </div> 
                        <div class="relative">
                                <select id="countries" name="event_privacy" onChange={handleChangeEve} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                </select>
                                <label for="countries" id="floatig_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5">Event Privacy</label>
                        </div>                                              
                </div>
                <div className="grid grid-cols-1 mt-5">
                        <div className="relative">
                                <textarea name="event_description" onChange={handleChangeEve} className="resize-none rounded-md w-full" placeholder=""></textarea>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event description</label>
                        </div>
                </div>
                <div class="relative mt-2 ">
                                <select id="countries" className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="select_speaker" onChange={handleChangeEve}>
                                        {Array.isArray(fetchedMentorData) && fetchedMentorData.length > 0 ? (
                                                fetchedMentorData.map((dataObj, key) => (
                                                        <option key={key} value={dataObj.mentor_name}>
                                                                {dataObj.mentor_name}
                                                        </option>    
                                                ))
                                        ) : null}
                                </select>
                                <label for="countries" id="floatig_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5">Select Speaker</label>
                </div>
                <div className="grid grid-cols-2 mt-3 gap-4">
                        <div className="relative">
                                <input type="date" onChange={handleChangeEve} name="event_date" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event date</label>
                        </div> 
                        <div className="relative">
                                <input type="time" name="event_time" onChange={handleChangeEve} id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                                <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event time</label>
                        </div>
                </div>
                <div className="flex justify-center mt-3">
                    <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md" style={{backgroundColor: '#afdade'}}>Create Event</button>                                                    
                </div>
                </form>
        </CreateNewEvent>
        <RequestSpeaker isVisible={reqSpeaker} onClose={()=>setRequestSpeaker(false)}>
                <form onSubmit={RequestSpeakerButton}>
                        <div className="font-semibold">Request Speaker</div> 
                        <div class="relative mt-5">
                                        <select id="countries" onChange={handleChangeReqSpeaker} name="select_speaker" className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {Array.isArray(fetchedMentorData) && fetchedMentorData.length > 0 ? (
                                                fetchedMentorData.map((dataObj, key) => (
                                                        <option key={key} value={dataObj.mentor_name}>
                                                                {dataObj.mentor_name}
                                                        </option>    
                                                ))
                                        ) : null}
                                        </select>
                                        <label for="countries" id="floatig_outlined"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5">Select Speaker</label>
                        </div>
                        <div className="relative mt-5">
                                        <textarea className="resize-none rounded-md w-full" placeholder="" name="event_description" onChange={handleChangeReqSpeaker}></textarea>
                                        <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event description</label>
                        </div> 
                        <div className="flex justify-center mt-3">
                                        <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md" style={{backgroundColor: '#afdade'}}>Create Event</button>                                                    
                        </div>                
                </form>
        </RequestSpeaker>
    </div>
  )
}

export default Events;