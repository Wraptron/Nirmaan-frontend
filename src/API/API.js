import { apiClient as axios } from "../utils/apiClient";

// ==================== CONFIGURATION ====================
const isDevelopment = process.env.NODE_ENV === "development";

// API Base URLs
const API_URLS = {
  // DEVELOPMENT: "http://localhost:3003",
  PRODUCTION: "https://api.sieiitm.org",
};

// Current API Base URL based on environment
const API_BASE_URL = isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION;

// Alternative: You can also use environment variables
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || (isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION);

console.log(
  `API Base URL: ${API_BASE_URL} (${isDevelopment ? "Development" : "Production"} mode)`
);

// ==================== API HEADERS CONFIGURATION ====================
export const API_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const FILE_UPLOAD_HEADERS = {
  Accept: "application/json",
  // Don't set Content-Type for file uploads, let the browser set it
};

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: API_HEADERS,
  withCredentials: true, // Enable cookies for authentication
};

// ==================== CONNECTION APIs ====================
async function ApiAddConnections(AddConnection) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/add-connections`,
      AddConnection
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiAddConnections", error);
    throw error;
  }
}

async function ApiViewConnections() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/viewconnections`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiEstablishConnections(EstablishConnection) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/establish-connection`,
      EstablishConnection
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiEstablishConnections", error);
    throw error;
  }
}

async function ApiDeleteConnections(email_address) {
  try {
    const result = await axios.delete(
      `${API_BASE_URL}/api/v1/delete-connection?element_data=${email_address}`
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiDeleteConnections", error);
    throw error;
  }
}

// ==================== MENTOR APIs ====================
async function ApiAddNewMentor(formDataa) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/mentor/add`,
      formDataa,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiAddNewMentor", err);
    throw err;
  }
}

async function ApiFetchMentor() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/get-mentor-details`);
    return result.data;

  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiFetchMentorCount() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/mentor/count`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiDeletMentorData(id) {
  try {
    const result = await axios.delete(
      `${API_BASE_URL}/api/v1/delete-mentor/${id}`
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiDeletMentorData", err);
    throw err;
  }
}

// async function ApiUpdateMentor(mentorId, formData) {
//   try {
//     // Clean the form data - remove any undefined, null, or empty string values
//     const cleanedData = Object.fromEntries(
//       Object.entries(formData).filter(([_, value]) => {
//         // Keep only non-empty strings and other non-empty values
//         if (typeof value === "string") {
//           return value.trim() !== "";
//         }
//         return value !== undefined && value !== null;
//       })
//     );

//     // Convert year_of_passing_out to number if it exists
//     if (cleanedData.year_of_passing_out) {
//       cleanedData.year_of_passing_out = parseInt(
//         cleanedData.year_of_passing_out,
//         10
//       );
//     }

//     // Log the exact request payload
//     const requestPayload = {
//       mentorId,
//       data: cleanedData,
//     };
//     console.log(
//       "API Update Mentor - Exact Request Payload:",
//       JSON.stringify(requestPayload, null, 2)
//     );

//     // First try a GET request to verify the mentor exists
//     try {
//       const verifyResponse = await axios.get(
//         `${API_BASE_URL}/api/v1/get-mentor-details`
//       );
//       const mentorExists = verifyResponse.data?.STATUS?.rows?.some(
//         (m) => String(m.mentor_id) === String(mentorId)
//       );

//       if (!mentorExists) {
//         throw new Error("Mentor not found");
//       }
//     } catch (verifyError) {
//       console.error("Error verifying mentor:", verifyError);
//       throw new Error("Failed to verify mentor exists");
//     }

//     // Make the update request
//     const result = await axios.put(
//       `${API_BASE_URL}/api/v1/mentor/update/${mentorId}`,
//       cleanedData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         validateStatus: function (status) {
//           return status < 500; // Resolve only if the status code is less than 500
//         },
//       }
//     );

//     console.log("API Update Mentor - Full Response:", {
//       status: result.status,
//       statusText: result.statusText,
//       data: result.data,
//       headers: result.headers,
//     });

//     if (result.status !== 200) {
//       const errorMessage =
//         result.data?.error || result.data?.message || "Failed to update mentor";
//       throw new Error(errorMessage);
//     }

//     return result.data;
//   } catch (err) {
//     // Enhanced error logging
//     const errorDetails = {
//       message: err.message,
//       response: err.response?.data,
//       status: err.response?.status,
//       headers: err.response?.headers,
//       config: {
//         url: err.config?.url,
//         method: err.config?.method,
//         data: err.config?.data ? JSON.parse(err.config.data) : null,
//       },
//     };
//     console.error("API Update Mentor - Detailed Error:", errorDetails);

//     // Throw a more descriptive error
//     if (err.response?.status === 500) {
//       throw new Error(
//         `Server error: ${err.response.data?.error || "Unknown server error"}`
//       );
//     } else if (err.message === "Mentor not found") {
//       throw new Error("Mentor not found in the system");
//     } else {
//       throw err;
//     }
//   }
// }

async function ApiUpdateMentor(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/mentor/update`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.error("Error in ApiUpdateMentor", error);
    throw error;
  }
}   

async function ApiUpdateMentorSessionRequest(requestId, status) {
  try {
    const result = await axios.patch(
      `${API_BASE_URL}/api/v1/mentor/session-request/${requestId}`,
      { status },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiUpdateMentorSessionRequest", error);
    const data = error.response?.data;
    if (data?.message) throw new Error(data.message);
    throw error;
  }
}

async function ApiFetchNotifications(params = {}) {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/notification`, {
      withCredentials: true,
      params,
    });
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchNotifications", error);
    throw error;
  }
}

async function ApiMarkNotificationsRead() {
  try {
    const result = await axios.patch(
      `${API_BASE_URL}/api/v1/notification/read`,
      {},
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiMarkNotificationsRead", error);
    throw error;
  }
}

async function ApiFetchStartupMyMeetings() {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/startup/my-meetings`,
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchStartupMyMeetings", error);
    throw error;
  }
}

async function ApiRequestMentor(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/mentor/session-request`,
       payload
      ,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiRequestMentor", error);
    const data = error.response?.data;
    if (typeof data === "string") throw new Error(data);
    if (data?.message) throw new Error(data.message);
    if (data?.error) throw new Error(data.error);
    throw error;
  }
}

// ==================== MEETING & FEEDBACK APIs ====================
async function ApiScheduleMeeting(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/mentor/meeting`,
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function ApiFetchScheduleMeetings(mentor_id) {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/mentor/fetch-meeting/${mentor_id}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function ApiFetchMentorAvailability(mentor_id, { forBooking = false } = {}) {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/availability/${mentor_id}`,
      {
        withCredentials: true,
        ...(forBooking ? { params: { forBooking: "true" } } : {}),
      }
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiFetchMentorAvailability", err);
    throw err;
  }
}

async function ApiSaveMentorAvailability(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/availability/save`,
      payload,
      { withCredentials: true }
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiSaveMentorAvailability", err);
    throw err;
  }
}
async function ApiFetchScheduleMeetingsDetailsWithMentor() {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/mentor/fetch-mentor_meeting`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function ApiSaveFeedback(feedback) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/mentor/feedback`,feedback,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiSaveFeedback", error);
    throw error;
  }
}

async function ApiUpdateFeedback(feedback) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/mentor/update-feedback`,
      feedback
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateFeedback", error);
    throw new Error("Failed to update feedback details");
  }
}   

async function ApiFetchMeetingFeedback(mentor_id,startup_id) {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/mentor/fetch-feedback/${mentor_id}/${startup_id}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function ApiDeleteMeeting(id) {
  try {
    const result = await axios.delete(
      `${API_BASE_URL}/api/v1/mentor/delete-meeting/${id}`,
    );
    return result.data;
  } catch (err) {
    throw err;
  }
}

async function ApiCancelMeeting(id, reason) {
  try {
    const result = await axios.patch(
      `${API_BASE_URL}/api/v1/mentor/cancel-meeting/${id}`,
      { reason },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (err) {
    const data = err.response?.data;
    if (typeof data === "string") throw new Error(data);
    if (data?.message) throw new Error(data.message);
    throw err;
  }
}

// ==================== TESTIMONIAL APIs ====================
async function ApiTestimonials(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/mentor/add-testimonial`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ApiFetchTestimonials() {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/mentor/fetch-testimonial`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
async function ApiUpdateTestimonial(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/mentor/update-testimonial`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdatetestimonial", error);
    throw new Error("Failed to update testimonial details");
  }
}   

const ApiDeleteTestimonial = async (id) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/v1/mentor/delete-testimonial/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};

// ==================== STARTUP APIs ====================
async function ApiAddStartup(formdata) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/add-startup`,
      formdata,
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function ApiFetchStartup({ page, limit, fetchAll = false } = {}) {
  try {
    if (fetchAll) {
      const pageSize = Math.min(Math.max(limit || 100, 1), 100);
      let allRows = [];
      let currentPage = 1;
      let total = Infinity;

      while (allRows.length < total) {
        const result = await axios.get(`${API_BASE_URL}/api/v1/fetch-startup`, {
          params: { page: currentPage, limit: pageSize },
        });
        const data = result.data || {};
        const rows = Array.isArray(data.rows) ? data.rows : [];
        total = typeof data.total === "number" ? data.total : rows.length;
        allRows = allRows.concat(rows);
        if (rows.length === 0 || allRows.length >= total) break;
        currentPage += 1;
      }

      return {
        rows: allRows,
        rowCount: allRows.length,
        total: allRows.length,
      };
    }

    const params = {};
    if (page != null) params.page = page;
    if (limit != null) params.limit = limit;

    const result = await axios.get(`${API_BASE_URL}/api/v1/fetch-startup`, {
      params,
    });
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiFetchStartupById(id) {
  try {
    console.log("[API] ApiFetchStartupById request", {
      id,
      url: `${API_BASE_URL}/api/v1/startup/${id}`,
    });
    const result = await axios.get(`${API_BASE_URL}/api/v1/startup/${id}`, {
      withCredentials: true,
    });
    console.log("[API] ApiFetchStartupById success", {
      status: result?.status,
      dataKeys: Object.keys(result?.data || {}),
    });
    return result.data;
  } catch (error) {
    console.error("[API] ApiFetchStartupById error", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
      url: error?.config?.url,
    });
    throw error;
  }
}
async function ApiFetchStartupCount() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/count-startupdata`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiFetchDashboardOverviewSummary() {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/api/v1/dashboard/overview-summary`
    );
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchDashboardOverviewSummary", error);
    throw error;
  }
}

async function ApiFetchDashboardSummary() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/dashboard/summary`);
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchDashboardSummary", error);
    throw error;
  }
}

async function ApiDeletStartupData(id) {
  try {
    const result = await axios.delete(
      `${API_BASE_URL}/api/v1/delete-startup/${id}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function ApiUpdateStartupPersonalInfo(payload) {
  try {
    let dataToSend = payload;

    if (!(payload instanceof FormData)) {
      dataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          dataToSend.append(key, value);
        }
      });
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/v1/edit-startupdata/personal-info`,
      dataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupPersonalInfo", error);
    throw new Error("Failed to update startup details");
  }
}

async function ApiUpdateStartupAbout(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/edit-startup/about`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupAbout", error);
    throw new Error("Failed to update startup details");
  }
}

async function ApiUpdateStartupMentorDetails(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/edit-startup/mentordetails`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupMentorDetails", error);
    throw new Error("Failed to update startup details");
  }
}
async function ApiIPDetails(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/ipdetails`,
      payload
    );
    return response.data;
  } catch (error) {
    // console.error("Error in ApiIPDetails", error);
    throw new Error("Failed to IP details");
  }
}


async function ApiFetchFunding() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/finance/funding`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}
async function ApiFetchFundingDetain() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/funding`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiAddFundingProject(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/finance/funding-project`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ApiFetchFundingProject() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/finance/fetch-funding-project`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}
async function ApiUpdateFunding(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/funding/edit`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error
  }
}
async function ApiFetchFundingProjectData() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/fetch-funding-project`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiUpdateFundingProject(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/update-funding-project`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error
  }
}


// ==================== AWARD APIs ====================
async function ApiAddAward(formdata) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/addstartup/award`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function ApiFetchAward() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/fetchaward`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiUpdateAward(formdata) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/updateaward`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateAward", error);
    throw new Error("Failed to update award details");
  }
}   
async function ApiDeleteAward(id) {
  try {
    const result = await axios.delete(
      `${API_BASE_URL}/api/v1/delete-award/${id}`
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiDeleteAward", err);
    throw err;
  }
}


async function ApiAddFounder(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/addfounder`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ApiFetchFounder(id) {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/fetchfounder/${id}`,
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}  
async function ApiUpdateStartupFounder(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/edit-startup/founder`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupAbout", error);
    throw new Error("Failed to update startup details");
  }
}

async function ApiDeleteFounder(founderid) {
  try {
    const result = await axios.put(
      `${API_BASE_URL}/api/v1/deletefounder/${founderid}`
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiDeleteFounder", err);
    throw err;
  }
}

// ==================== EVENTS APIs ====================

async function ApiAddEvents(eventdata) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/create-events`,
      eventdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function ApiFetchEvents() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/fetchevents`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function ApiUpdateEvent(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1//edit-event`,
      payload,
       {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update event details");
  }
}   

async function ApiDeleteEvent(id) {
  try {
    const result = await axios.delete(
      `${API_BASE_URL}/api/v1/delete-event/${id}`,
    );
    return result.data;
  } catch (err) {
    console.error("Error in ApiDeleteEvent", err);
    throw err;
  }
}

async function ApiAddFunding(formPayload) {
  try {
    const result = await axios.post(
     `${API_BASE_URL}/api/v1/finance/addfunding`,
      formPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function ApiFetchFundingAmount() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/finance/funding_amount`,
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function ApiFetchStartupData() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1//finance/startup-data`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}




// ==================== UTILITY FUNCTIONS ====================
// Function to manually switch environments (useful for testing)
export const switchEnvironment = (environment) => {
  if (environment === "development") {
    return API_URLS.DEVELOPMENT;
  } else if (environment === "production") {
    return API_URLS.PRODUCTION;
  }
  return API_BASE_URL;
};

// Function to get current environment info
export const getEnvironmentInfo = () => {
  return {
    isDevelopment,
    currentBaseUrl: API_BASE_URL,
    availableUrls: API_URLS,
    nodeEnv: process.env.NODE_ENV,
  };
};

// ==================== EXPORTS ====================
export {
  // Connection APIs
  ApiAddConnections,
  ApiViewConnections,
  ApiEstablishConnections,
  ApiDeleteConnections,

  // Mentor APIs
  ApiAddNewMentor,
  ApiFetchMentor,
  ApiFetchMentorCount,
  ApiDeletMentorData,
  ApiUpdateMentor,

  // Meeting & Feedback APIs
  ApiRequestMentor,
  ApiUpdateMentorSessionRequest,
  ApiFetchNotifications,
  ApiMarkNotificationsRead,
  ApiFetchStartupMyMeetings,
  ApiScheduleMeeting,
  ApiFetchScheduleMeetings,
  ApiFetchMentorAvailability,
  ApiSaveMentorAvailability,
  ApiFetchScheduleMeetingsDetailsWithMentor,
  ApiDeleteMeeting,
  ApiCancelMeeting,
  ApiSaveFeedback,
  ApiUpdateFeedback,
  ApiFetchMeetingFeedback,

  // Testimonial APIs
  ApiTestimonials,
  ApiFetchTestimonials,
  ApiUpdateTestimonial,
  ApiDeleteTestimonial,

  // Startup APIs
  ApiAddStartup,
  ApiFetchStartup,
  ApiFetchStartupById,
  ApiFetchStartupCount,
  ApiFetchDashboardOverviewSummary,
  ApiFetchDashboardSummary,
  ApiDeletStartupData,
  ApiUpdateStartupFounder,
  ApiDeleteFounder,
  ApiUpdateStartupPersonalInfo,
  ApiUpdateStartupAbout,
  ApiUpdateStartupMentorDetails,
  ApiFetchFunding,
  ApiFetchFundingDetain,
  ApiAddFundingProject,
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
ApiUpdateFundingProject,
  ApiFetchStartupData,
ApiIPDetails,
  // Award APIs
  ApiAddAward,
  ApiFetchAward,
  ApiDeleteAward,
  ApiUpdateAward,
  ApiFetchFounder,
  ApiAddFounder,
  // Events APIs
  ApiAddEvents,
  ApiFetchEvents,
  ApiUpdateEvent,
  ApiDeleteEvent,
  ApiAddFunding,
  ApiFetchFundingAmount,
  ApiUpdateFunding,
  // Configuration
  API_BASE_URL,
  API_URLS,
};