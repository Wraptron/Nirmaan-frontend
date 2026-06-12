import React, { useEffect, useState, useCallback } from "react";
import img from "../assets/images/nirmaan-iitm.14fdf833.svg";
import axios from "axios";
import { clearAuthSession, getSessionUser, isAuthenticated } from "../utils/authSession";
import ProfileModal from "./ProfileModal";
import "alertifyjs/build/css/alertify.css";
import Notification, {
  consolidateMentorshipNotifications,
  mapNotificationToDisplayItem,
} from "./Notification";
import { ScheduleMeetingPopup } from "../pages/Mentorship/ScheduleMeetingForm";
import {
  ApiUpdateMentorSessionRequest,
  ApiFetchNotifications,
  ApiMarkNotificationsRead,
} from "../API/API";
import toast from "react-hot-toast";
import ActionsModel from "../components/ActionsModel";
import Startupsvg from "../assets/images/Startups.svg";
import Mentorsvg from "../assets/images/Mentor.svg";
import ChatMessage from "../assets/images/message.svg";
import Mentorshipsvg from "../assets/images/Mentorships.svg";
import Eventsvg from "../assets/images/Event.svg";
import Bellsvg from "../assets/images/Component 14.svg";
import Usersvg from "../assets/images/User profile.svg";
import moresvg from "../assets/images/more.svg";
import More from "./More";
import startupsvg from "../assets/images/Startups.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import APP_URL from "../Config";
import MentorTag from "./MentorTag";

const NOTIFICATION_RETENTION_DAYS = 90;
const NOTIFICATION_PAGE_SIZE = 8;
const UNREAD_POLL_INTERVAL_MS = 60000;

function NavBar({ onSelectionChange, selectedIndex }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationItems, setNotificationItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasMoreNotifications, setHasMoreNotifications] = useState(false);
  const [historyCursor, setHistoryCursor] = useState(null);
  const [retentionDays, setRetentionDays] = useState(NOTIFICATION_RETENTION_DAYS);
  const [loadingMoreNotifications, setLoadingMoreNotifications] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [schedulingRequest, setSchedulingRequest] = useState(null);
  const [processingRequestId, setProcessingRequestId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  // Initialize tokenData as null instead of empty string
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  // logout
  const [isOpen, setIsOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInMentorTag, setLoggedInMentorTag] = useState("");

  const handleOpenChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and Confirm Password do not match");
      return;
    }

    if (!isAuthenticated()) {
      alert("You are not logged in. Please login again.");
      return;
    }

    try {
      const response = await axios.post(
        `${APP_URL}change-password`,
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      alert(response.data?.message || "Password changed successfully");
      handleCloseChangePassword();
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        "Current password is incorrect or update failed";
      alert(message);
    }
  };
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${APP_URL}auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.log("Logout request failed:", err);
    }
    clearAuthSession();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchUnreadCount = useCallback(async () => {
    try {
      const data = await ApiFetchNotifications({
        countOnly: true,
        days: NOTIFICATION_RETENTION_DAYS,
      });
      setUnreadCount(Number(data?.unreadCount) || 0);
      if (data?.retentionDays) {
        setRetentionDays(Number(data.retentionDays));
      }
    } catch (err) {
      console.log("Error fetching unread notification count:", err);
    }
  }, []);

  const applyNotificationPage = useCallback((data, append = false) => {
    const raw = Array.isArray(data?.notifications) ? data.notifications : [];
    const mapped = consolidateMentorshipNotifications(
      raw.map(mapNotificationToDisplayItem)
    );
    setNotificationItems((prev) =>
      append
        ? [
            ...prev,
            ...mapped.filter(
              (item) =>
                !prev.some(
                  (existing) =>
                    String(existing.notificationId || existing.id) ===
                    String(item.notificationId || item.id)
                )
            ),
          ]
        : mapped
    );
    setUnreadCount(Number(data?.unreadCount) || 0);
    setHasMoreNotifications(Boolean(data?.pagination?.hasMore));
    setHistoryCursor(data?.pagination?.nextCursor || null);
    if (data?.retentionDays) {
      setRetentionDays(Number(data.retentionDays));
    }
  }, []);

  const fetchNotificationHistory = useCallback(
    async ({ append = false, before = null } = {}) => {
      if (append) {
        setLoadingMoreNotifications(true);
      } else {
        setLoading(true);
      }

      try {
        const data = await ApiFetchNotifications({
          limit: NOTIFICATION_PAGE_SIZE,
          days: NOTIFICATION_RETENTION_DAYS,
          before: before || undefined,
        });
        applyNotificationPage(data, append);
      } catch (err) {
        console.log("Error fetching notification history:", err);
      } finally {
        setLoading(false);
        setLoadingMoreNotifications(false);
      }
    },
    [applyNotificationPage]
  );

  const handleNotificationPanelClose = () => {
    setNotificationsOpen(false);
  };

  const handleOpenNotifications = () => {
    setNotificationsOpen(true);
    setIsOpen(false);
    fetchNotificationHistory();
  };

  const handleLoadMoreNotifications = () => {
    if (!hasMoreNotifications || loadingMoreNotifications || !historyCursor) {
      return;
    }
    fetchNotificationHistory({ append: true, before: historyCursor });
  };

  const handleMarkAllRead = async () => {
    setMarkingAllRead(true);
    try {
      await ApiMarkNotificationsRead();
      await fetchUnreadCount();
      if (notificationsOpen) {
        await fetchNotificationHistory();
      } else {
        setNotificationItems((items) =>
          items.map((item) => ({ ...item, isUnread: false }))
        );
      }
    } catch (err) {
      console.log("Mark notifications read:", err);
      toast.error("Failed to mark notifications as read.");
    } finally {
      setMarkingAllRead(false);
    }
  };

  const refreshNotifications = useCallback(async () => {
    await fetchUnreadCount();
    await fetchNotificationHistory();
  }, [fetchUnreadCount, fetchNotificationHistory]);

  const handleAcceptMentorRequest = (req) => {
    if (!req?.mentor_id) {
      toast.error("This request has no mentor linked.");
      return;
    }
    setNotificationsOpen(false);
    setSchedulingRequest(req);
  };

  const handleRejectMentorRequest = async (req) => {
    setProcessingRequestId(req.id);
    try {
      await ApiUpdateMentorSessionRequest(req.id, "rejected");
      toast.success("Request rejected.");
      setNotificationItems((items) =>
        consolidateMentorshipNotifications(
          items.map((item) =>
            String(item.id) === String(req.id)
              ? { ...item, status: "rejected", isUnread: false }
              : item
          )
        )
      );
      await refreshNotifications();
    } catch (err) {
      toast.error(err?.message || "Failed to reject request.");
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleScheduleMeetingSuccess = async () => {
    const processedId = schedulingRequest?.id;
    if (processedId != null) {
      setNotificationItems((items) =>
        consolidateMentorshipNotifications(
          items.map((item) =>
            String(item.id) === String(processedId)
              ? { ...item, status: "accepted", isUnread: false }
              : item
          )
        )
      );
    }
    await refreshNotifications();
  };

  const userRole = sessionStorage.getItem("role");
  const isAdmin = userRole === "2";
  const isStartup = userRole === "5";
  const isMentor = userRole === "6";
  const canSeeNotifications = isAdmin || isStartup || isMentor;
  const notificationCount = unreadCount;
  const hasNotifications = canSeeNotifications && notificationCount > 0;

  const formatRequestDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    return Number.isNaN(d.getTime())
      ? String(value)
      : d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  const tokenDecodedData = isAuthenticated() ? getSessionUser() : null;



  useEffect(() => {
    fetchUnreadCount();

    const interval = setInterval(() => {
      if (!notificationsOpen) {
        fetchUnreadCount();
      }
    }, UNREAD_POLL_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchUnreadCount();
        if (notificationsOpen) {
          fetchNotificationHistory();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchUnreadCount, fetchNotificationHistory, notificationsOpen]);

  const [color] = useState([
    "#afdade",
    "#afd5de",
    "#afcdde",
    "#99b6bf",
    "#6d858c",
  ]);
  const [actionpopup, setActionpop] = useState(false);
  const handleActionShow = () => setActionpop(true);
  const handleActionClose = () => setActionpop(false);

  const pathName = window.location.pathname;

  const [morepopup, setMorepop] = useState(false);
  const handleMoreShow = () => setMorepop(true);
  const handleMoreClose = () => setMorepop(false);

  return (
    <div className="navbar dm-sans">
      <nav className="bg-white shadow-sm relative z-50">
        <div className="flex flex-wrap items-center justify-between p-3">
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            {/* <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-10 mb-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 2 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                placeholder="Search..."
              />
            </div> */}
            {/* {tokenData?.userRole !== 2 && (
              <div className="relative hidden md:block">
                <button
                  onClick={handleActionShow}
                  className="bg-[#45C74D] text-white block py-2 px-2 rounded-lg ms-3 text-sm font-semibold"
                >
                  Action
                </button>
              </div>
            )} */}
            {/* <div className="relative md:block">
              <div className="text-black px-2 py-2 ms-3">
                <button>
                  <img src={Bellsvg} alt="Bell" />
                </button>
              </div>
            </div> */}
            {/* <div className="relative md:block">
              <div className="text-black px-2 py-2 ms-3">
                <button onClick={handleMoreShow}>
                  <img src={moresvg} alt="More" />
                </button>
              </div>
            </div> */}
            {canSeeNotifications ? (
              <div className="relative md:block" ref={notificationRef}>
                <div className="text-black px-2 py-2 ms-3">
                  <button
                    type="button"
                    onClick={() =>
                      notificationsOpen
                        ? setNotificationsOpen(false)
                        : handleOpenNotifications()
                    }
                    className={`relative p-1 rounded-lg transition-colors ${
                      notificationsOpen
                        ? "bg-gray-100 ring-1 ring-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                    aria-label="Notifications"
                    aria-expanded={notificationsOpen}
                  >
                    <img src={Bellsvg} alt="" className="w-5 h-5" />
                    {hasNotifications ? (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-red-500 rounded-full flex items-center justify-center ring-2 ring-white">
                        {notificationCount > 9 ? "9+" : notificationCount}
                      </span>
                    ) : null}
                  </button>
                </div>
                <Notification
                  isOpen={notificationsOpen}
                  onClose={handleNotificationPanelClose}
                  loading={loading && notificationItems.length === 0}
                  items={notificationItems}
                  unreadCount={unreadCount}
                  formatRequestDate={formatRequestDate}
                  onAccept={isAdmin ? handleAcceptMentorRequest : undefined}
                  onReject={isAdmin ? handleRejectMentorRequest : undefined}
                  processingId={processingRequestId}
                  viewerRole={
                    isMentor ? "mentor" : isStartup ? "startup" : "admin"
                  }
                  emptyTitle="All caught up"
                  emptySubtitle={`No notifications in the last ${retentionDays} days`}
                  hasMore={hasMoreNotifications}
                  loadingMore={loadingMoreNotifications}
                  onLoadMore={handleLoadMoreNotifications}
                  onMarkAllRead={handleMarkAllRead}
                  markingAllRead={markingAllRead}
                  retentionDays={retentionDays}
                />
              </div>
            ) : null}
            <div className="relative md:block" ref={dropdownRef}>
              <div className="text-black px-2 py-2 ms-3">
                <button onClick={toggleDropdown}>
                  <img src={Usersvg} alt="User" />
                </button>
              </div>
              {isOpen && (
  <ul className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
    
    <li className="px-4 py-2 text-sm text-gray-600 border-b">
      <div className="flex items-center gap-2 flex-wrap">
        <span>{tokenDecodedData.user_name || tokenDecodedData.user_mail}</span>
        {(String(sessionStorage.getItem("role")) === "6" ||
          tokenDecodedData?.role === 6) && (
          <MentorTag tag={loggedInMentorTag} />
        )}
      </div>
    </li>

    {/* Change Password Button */}
    <li>
  <button
    onClick={handleOpenChangePassword}
    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#45C74D] hover:text-white"
  >
    Change Password
  </button>
</li>
    {/* Logout Button */}
    <li>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:bg-[#45C74D] hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        Logout
      </button>
    </li>

  </ul>
)}
{showChangePasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-xl w-[450px] p-6 relative">

      <button
        onClick={handleCloseChangePassword}
        className="absolute top-4 right-4 text-gray-500"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Change Password
      </h2>

      <input
  type="password"
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4"
/>

<input
  type="password"
  placeholder="New Password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4"
/>

<input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full border rounded-lg p-3 mb-6"
/>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCloseChangePassword}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={handleChangePassword}
  className="px-4 py-2 bg-[#45C74D] text-white rounded-lg"
>
  Change Password
</button>
      </div>
    </div>
  </div>
)}
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </nav>
      <ProfileModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <center>
          <img src={img} className="h-[60px;]" alt="Logo" />
        </center>
        <div className="grid grid-cols-2 cols-2 gap-4">
          <input
            name="name"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Name"
            value={tokenData?.user_name || ""}
            readOnly
          />
          <input
            name="insti-type"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Institution type"
          />
          <input
            name="sector"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Sector"
            value={tokenData?.user_department || ""}
            readOnly
          />
          <input
            name="Email"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Email"
            value={tokenData?.user_mail || ""}
            readOnly
          />
          <input
            name="contact_number"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Contact Number"
          />
          <input
            name="website"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Website"
          />
          <input
            name="linkedin"
            className="w-full  border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Linked In"
          />
          <input
            name="ceo_name"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="CEO name"
            value={tokenData?.user_name || ""}
            readOnly
          />
          <input
            name="ceo_email"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="CEO email"
            value={tokenData?.personal_email || ""}
            readOnly
          />
          <input
            name="ceo_contact_number"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="CEO contact number"
            value={tokenData?.user_contact || ""}
            readOnly
          />
          <button className="text-red-400 font-bold active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all">
            Cancel
          </button>
          <button className="text-white bg-green-400 rounded-sm font-bold active p-1 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all">
            Update
          </button>
        </div>
      </ProfileModal>
      <ActionsModel
        isVisible={actionpopup}
        onClose={() => handleActionClose(false)}
      >
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3 ">
          <div className="">
            <img
              src={Startupsvg}
              className="w-[100px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Startup"
            />
          </div>
          <div className="">
            <a href="/startups/addstartup">
              <span className="text-lg">Add New Start-up</span>
              <div className="text-xs">
                Search and connect with start-ups across sectors, industry &
                experience.
              </div>
            </a>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Mentorsvg}
              className="w-[100px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Mentor"
            />
          </div>
          <div className="">
               <a href="/mentors/new">
            <span className="text-lg">Add New Mentor</span>
            <div className="text-xs">
              Search and connect with mentors across sectors, industry &
              experience.
              </div>
              </a>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={ChatMessage}
              className="w-[100px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Chat"
            />
          </div>
          <div className="">
              <span className="text-lg">Create New Contact</span>
              <div className="text-xs">
                Create & publish job roles at your startups, and notify it to
                your network
              </div>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Mentorshipsvg}
              className="w-[89px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Mentorship"
            />
          </div>
          <div className="">
            <span className="text-lg">Mentoring Session</span>
            <div className="text-xs">
              Seamlessly Schedule a Mentoring Session with the Mentors.
            </div>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Eventsvg}
              className="w-[89px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Event"
            />
          </div>
          <div className="">
            <span className="text-lg">Create New Event</span>
            <div className="text-xs">
              Effortlessly create and manage your next event with ease!
            </div>
          </div>
        </div>
      </ActionsModel>
      {/* <More isVisible={morepopup} onClose={() => handleMoreClose(false)}>
        <div className="p-2">
          <div className="text-lg">Products</div>
          <div className="flex justify-between px-10 mt-5">
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={startupsvg} alt="Startup" />
              </div>
              <div className="flex justify-center items-center mt-3">
                Website
              </div>
            </div>
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={Mentorsvg} alt="Mentor" />
              </div>
              <div className="flex justify-center items-center mt-3">Notes</div>
            </div>
          </div>
          <div className="flex justify-between px-10 mt-5 gap-3">
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={ChatMessage} alt="Chat" />
              </div>
              <div className="flex justify-center items-center mt-3">DE</div>
            </div>
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px] max-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={Mentorshipsvg} alt="Mentorship" />
              </div>
              <div className="flex justify-center items-center mt-3">
                Resources
              </div>
            </div>
          </div>
          <div className="flex justify-between px-10 mt-5">
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={Eventsvg} alt="Event" />
              </div>
              <div className="flex justify-center items-center mt-3">Drive</div>
            </div>
          </div>
        </div>
      </More> */}
      {schedulingRequest ? (
        <ScheduleMeetingPopup
          sessionRequest={schedulingRequest}
          onClose={() => setSchedulingRequest(null)}
          onSuccess={handleScheduleMeetingSuccess}
        />
      ) : null}
    </div>
  );
}
export default NavBar;
