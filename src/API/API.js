// import axios from "axios";
// async function ApiAddConnections(AddConnection) {
//   try {
//     const result = await axios.post(
//       "http://3.109.48.163:3003/api/v1/add-connections",
//       AddConnection
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }
// async function ApiViewConnections() {
//   try {
//     const result = await axios.get(
//       "http://3.109.48.163:3003/api/v1/viewconnections"
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in APi", error);
//     throw error;
//   }
// }

// async function ApiEstablishConnections(EstablishConnection) {
//   try {
//     const result = await axios.post(
//       "http://3.109.48.163:3003/api/v1/establish-connection",
//       EstablishConnection
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// }

// async function ApiDeleteConnections(email_address) {
//   try {
//     const result = await axios.delete(
//       `http://3.109.48.163:3003/api/v1/delete-connection?element_data=${email_address}`
//     );
//     return result.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// //mentor data
// async function ApiAddNewMentor(formDataa) {
//   try {
//     const result = await axios.post(
//       "http://3.109.48.163:3003/api/v1/mentor/add",
//       formDataa,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function ApiFetchMentor() {
//   try {
//     const result = await axios.get(
//       "http://3.109.48.163:3003/api/v1/get-mentor-details"
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in APi", error);
//     throw error;
//   }
// }
// async function ApiFetchStartup() {
//   try {
//     const result = await axios.get(
//       "http://localhost:3003/api/v1/fetch-startup"
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in APi", error);
//     throw error;
//   }
// }


// async function ApiFetchMentorCount() {
//   try {
//     const result = await axios.get(
//       "http://3.109.48.163:3003/api/v1/mentor/count"
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in APi", error);
//     throw error;
//   }
// }
// async function ApiDeletMentorData(id) {
//   try {
//     const result = await axios.delete(
//       `http://3.109.48.163:3003/api/v1/delete-mentor/${id}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }
// export const ApiDeleteTestimonial = async (testimonialId) => {
//   try {
//     const res = await axios.delete(`/testimonial/${testimonialId}`);
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     throw error;
//   }
// };

// async function ApiScheduleMeeting(payload) {
//   try {
//     const result = await axios.post(
//       "http://3.109.48.163:3003/api/v1/schedulemeeting",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function ApiFetchScheduleMeetings(mentor_id) {
//   try {
//     const result = await axios.get(
//       `http://3.109.48.163:3003/api/v1/fetchmeeting/${mentor_id}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function ApiTestimonials(payload){
//   try{
//     const result = await axios.post(
//       "http://3.109.48.163:3003/api/v1/testimonial",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result.data
//   }
//   catch(error){
//            console.log(error)
//            throw error
//   }
// }

// async function ApiFetchTestimonials(mentor_id) {
//   try {
//     const result = await axios.get(
//       `http://3.109.48.163:3003/api/v1/fetchtestimonial/${mentor_id}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function ApiDeletStartupData(email) {
//   try {
//     const result = await axios.delete(
//       `http://localhost:3003/api/v1/delete-startup/${email}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }
// // Register for new startups

// //Events

// // async function ApiCreateEvent(){
// //     try
// //     {
// //         const result = await axios.post(`http://3.109.48.163:3003/api/v1/delete-mentor`,)
// //     }
// //     catch(err)
// //     {
// //         console.log(err);
// //         throw err;
// //     }
// // }

// async function ApiFetchEvents() {
//   try {
//     const result = await axios.get(
//       "http://3.109.48.163:3003/api/v1/fetchevents"
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function ApiUpdateMentor(mentorId, formData) {
//   try {
//     // Clean the form data - remove any undefined, null, or empty string values
//     const cleanedData = Object.fromEntries(
//       Object.entries(formData).filter(([_, value]) => {
//         // Keep only non-empty strings and other non-empty values
//         if (typeof value === 'string') {
//           return value.trim() !== '';
//         }
//         return value !== undefined && value !== null;
//       })
//     );

//     // Convert year_of_passing_out to number if it exists
//     if (cleanedData.year_of_passing_out) {
//       cleanedData.year_of_passing_out = parseInt(cleanedData.year_of_passing_out, 10);
//     }

//     // Log the exact request payload
//     const requestPayload = {
//       mentorId,
//       data: cleanedData
//     };
//     console.log('API Update Mentor - Exact Request Payload:', JSON.stringify(requestPayload, null, 2));

//     // First try a GET request to verify the mentor exists
//     try {
//       const verifyResponse = await axios.get(
//         `http://3.109.48.163:3003/api/v1/get-mentor-details`
//       );
//       const mentorExists = verifyResponse.data?.STATUS?.rows?.some(
//         m => String(m.mentor_id) === String(mentorId)
//       );
      
//       if (!mentorExists) {
//         throw new Error('Mentor not found');
//       }
//     } catch (verifyError) {
//       console.error('Error verifying mentor:', verifyError);
//       throw new Error('Failed to verify mentor exists');
//     }

//     // Make the update request
//     const result = await axios.put(
//       `http://3.109.48.163:3003/api/v1/mentor/update/${mentorId}`,
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

//     console.log('API Update Mentor - Full Response:', {
//       status: result.status,
//       statusText: result.statusText,
//       data: result.data,
//       headers: result.headers
//     });

//     if (result.status !== 200) {
//       const errorMessage = result.data?.error || result.data?.message || 'Failed to update mentor';
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
//         data: err.config?.data ? JSON.parse(err.config.data) : null
//       }
//     };
//     console.error('API Update Mentor - Detailed Error:', errorDetails);
    
//     // Throw a more descriptive error
//     if (err.response?.status === 500) {
//       throw new Error(`Server error: ${err.response.data?.error || 'Unknown server error'}`);
//     } else if (err.message === 'Mentor not found') {
//       throw new Error('Mentor not found in the system');
//     } else {
//       throw err;
//     }
//   }
// }

// async function ApiSaveFeedback(meetingId, feedback) {
//   try {
//     const result = await axios.post(
//       "http://l3.109.48.163:3003/api/v1/mentor/feedback/save",
//       {
//         meeting_id: meetingId,
//         feedback_text: feedback,
//         created_at: new Date().toISOString(),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log('Save Feedback API Response:', result.data); // Debug log
//     return result.data;
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     throw error;
//   }
// }

// async function ApiFetchFeedback(meetingId) {
//   try {
//     const result = await axios.get(
//       `http://3.109.48.163:3003/api/v1/mentor/feedback/${meetingId}`
//     );
//     console.log('Fetch Feedback API Response:', result.data); // Debug log
//     return result.data;
//   } catch (error) {
//     console.error("Error fetching feedback:", error);
//     throw error;
//   }
// }

// async function ApiUpdateStartupPersonalInfo(payload) {
//   try {
//     let dataToSend = payload;
//     let headers = {};
//     // If payload is not FormData, convert it
//     if (!(payload instanceof FormData)) {
//       dataToSend = new FormData();
//       Object.entries(payload).forEach(([key, value]) => {
//         if (key === 'profile_image' && value) {
//           dataToSend.append('logo_image', value); // Use 'logo_image' for backend
//         } else if (value !== undefined && value !== null) {
//           dataToSend.append(key, value);
//         }
//       });
//     } else {
//       // If already FormData, rename 'profile_image' to 'logo_image' if present
//       if (payload.has('profile_image')) {
//         const file = payload.get('profile_image');
//         payload.delete('profile_image');
//         payload.append('logo_image', file);
//       }
//     }
//     headers['Content-Type'] = 'multipart/form-data';
//     const response = await axios.put("http://localhost:3003/api/v1/edit-startupdata/personal-info", dataToSend, { headers });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupAbout(payload) {
//  try {
//     const response = await axios.put("http://localhost:3003/api/v1/edit-startup/about", payload);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupMentorDetails(payload) {
//  try {
//     const response = await axios.put("http://localhost:3003/api/v1/edit-startup/mentordetails", payload);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// export {
//   ApiAddConnections,
//   ApiUpdateStartupPersonalInfo,
//   ApiUpdateStartupMentorDetails,
//   ApiUpdateStartupAbout,
//   ApiSaveFeedback,
//   ApiFetchFeedback,
//   ApiViewConnections,
//   ApiEstablishConnections,
//   ApiDeleteConnections,
//   ApiAddNewMentor,
//   ApiFetchMentor,
//   ApiFetchMentorCount,
//   ApiDeletMentorData,
//   ApiFetchEvents,
//   ApiScheduleMeeting,
//   ApiFetchScheduleMeetings,
//   ApiTestimonials,
//   ApiFetchTestimonials,
//   ApiUpdateMentor,
//   ApiDeletStartupData,
//   ApiFetchStartup
  
// };







// import axios from "axios";

// // ==================== CONFIGURATION ====================
// const isDevelopment = process.env.NODE_ENV === "development";

// // API Base URLs
// const API_URLS = {
//   DEVELOPMENT: "http://localhost:3003",
//   // PRODUCTION: "http://13.127.7.121",
// };

// // Current API Base URL based on environment
// const API_BASE_URL = isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION;

// // Alternative: You can also use environment variables
// // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || (isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION);

// console.log(
//   `API Base URL: ${API_BASE_URL} (${isDevelopment ? "Development" : "Production"} mode)`
// );

// // ==================== API HEADERS CONFIGURATION ====================
// export const API_HEADERS = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };

// export const FILE_UPLOAD_HEADERS = {
//   Accept: "application/json",
//   // Don't set Content-Type for file uploads, let the browser set it
// };

// export const API_CONFIG = {
//   baseURL: API_BASE_URL,
//   timeout: 30000, // 30 seconds
//   headers: API_HEADERS,
//   withCredentials: true, // Enable cookies for authentication
// };

// // ==================== CONNECTION APIs ====================
// async function ApiAddConnections(AddConnection) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/add-connections`,
//       AddConnection
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in ApiAddConnections", error);
//     throw error;
//   }
// }

// async function ApiViewConnections() {
//   try {
//     const result = await axios.get(`${API_BASE_URL}/api/v1/viewconnections`);
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// async function ApiEstablishConnections(EstablishConnection) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/establish-connection`,
//       EstablishConnection
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in ApiEstablishConnections", error);
//     throw error;
//   }
// }

// async function ApiDeleteConnections(email_address) {
//   try {
//     const result = await axios.delete(
//       `${API_BASE_URL}/api/v1/delete-connection?element_data=${email_address}`
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in ApiDeleteConnections", error);
//     throw error;
//   }
// }

// // ==================== MENTOR APIs ====================
// async function ApiAddNewMentor(formDataa) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/mentor/add`,
//       formDataa,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return result.data;
//   } catch (err) {
//     console.error("Error in ApiAddNewMentor", err);
//     throw err;
//   }
// }

// async function ApiFetchMentor() {
//   try {
//     const result = await axios.get(`${API_BASE_URL}/api/v1/get-mentor-details`);
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// async function ApiFetchMentorCount() {
//   try {
//     const result = await axios.get(`${API_BASE_URL}/api/v1/mentor/count`);
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// async function ApiDeletMentorData(id) {
//   try {
//     const result = await axios.delete(
//       `${API_BASE_URL}/api/v1/delete-mentor/${id}`
//     );
//     return result.data;
//   } catch (err) {
//     console.error("Error in ApiDeletMentorData", err);
//     throw err;
//   }
// }

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

// // ==================== MEETING & FEEDBACK APIs ====================
// async function ApiScheduleMeeting(payload) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/schedulemeeting`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function ApiFetchScheduleMeetings(mentor_id) {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/fetchmeeting/${mentor_id}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function ApiSaveFeedback(meetingId, feedback) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/mentor/feedback/save`,
//       {
//         meeting_id: meetingId,
//         feedback_text: feedback,
//         created_at: new Date().toISOString(),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("Save Feedback API Response:", result.data);
//     return result.data;
//   } catch (error) {
//     console.error("Error in ApiSaveFeedback", error);
//     throw error;
//   }
// }

// async function ApiFetchFeedback(meetingId) {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/mentor/feedback/${meetingId}`
//     );
//     console.log("Fetch Feedback API Response:", result.data);
//     return result.data;
//   } catch (error) {
//     console.error("Error fetching feedback:", error);
//     throw error;
//   }
// }

// // ==================== TESTIMONIAL APIs ====================
// async function ApiTestimonials(payload) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/testimonial`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// async function ApiFetchTestimonials(mentor_id) {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/fetchtestimonial/${mentor_id}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export const ApiDeleteTestimonial = async (testimonialId) => {
//   try {
//     const res = await axios.delete(
//       `${API_BASE_URL}/testimonial/${testimonialId}`
//     );
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     throw error;
//   }
// };

// // ==================== STARTUP APIs ====================
// async function ApiFetchStartup() {
//   try {
//     const result = await axios.get(`${API_BASE_URL}/api/v1/fetch-startup`);
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// async function ApiDeletStartupData(email) {
//   try {
//     const result = await axios.delete(
//       `${API_BASE_URL}/api/v1/delete-startup/${email}`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function ApiUpdateStartupFounder(payload) {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/api/v1/edit-startup/founder`,
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupPersonalInfo(payload) {
//   try {
//     let dataToSend = payload;
//     let headers = {};

//     // If payload is not FormData, convert it
//     if (!(payload instanceof FormData)) {
//       dataToSend = new FormData();
//       Object.entries(payload).forEach(([key, value]) => {
//         if (key === "profile_image" && value) {
//           dataToSend.append("logo_image", value); // Use 'logo_image' for backend
//         } else if (value !== undefined && value !== null) {
//           dataToSend.append(key, value);
//         }
//       });
//     } else {
//       // If already FormData, rename 'profile_image' to 'logo_image' if present
//       if (payload.has("profile_image")) {
//         const file = payload.get("profile_image");
//         payload.delete("profile_image");
//         payload.append("logo_image", file);
//       }
//     }

//     headers["Content-Type"] = "multipart/form-data";
//     const response = await axios.put(
//       `${API_BASE_URL}/api/v1/edit-startupdata/personal-info`,
//       dataToSend,
//       { headers }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error in ApiUpdateStartupPersonalInfo", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupAbout(payload) {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/api/v1/edit-startup/about`,
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error in ApiUpdateStartupAbout", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupMentorDetails(payload) {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/api/v1/edit-startup/mentordetails`,
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error in ApiUpdateStartupMentorDetails", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// // ==================== AWARD APIs ====================
// async function ApiAddAward(formdata) {
//   try {
//     const result = await axios.post(
//       `${API_BASE_URL}/api/v1/addstartup/award`,
//       formdata,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function ApiFetchAward() {
//   try {
//     const result = await axios.get(`${API_BASE_URL}/api/v1/fetchaward`);
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// // ==================== EVENTS APIs ====================
// async function ApiFetchEvents() {
//   try {
//     const result = await axios.get(`${API_BASE_URL}/api/v1/fetchevents`);
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// // ==================== UTILITY FUNCTIONS ====================
// // Function to manually switch environments (useful for testing)
// export const switchEnvironment = (environment) => {
//   if (environment === "development") {
//     return API_URLS.DEVELOPMENT;
//   } else if (environment === "production") {
//     return API_URLS.PRODUCTION;
//   }
//   return API_BASE_URL;
// };

// // Function to get current environment info
// export const getEnvironmentInfo = () => {
//   return {
//     isDevelopment,
//     currentBaseUrl: API_BASE_URL,
//     availableUrls: API_URLS,
//     nodeEnv: process.env.NODE_ENV,
//   };
// };

// // ==================== EXPORTS ====================
// export {
//   // Connection APIs
//   ApiAddConnections,
//   ApiViewConnections,
//   ApiEstablishConnections,
//   ApiDeleteConnections,

//   // Mentor APIs
//   ApiAddNewMentor,
//   ApiFetchMentor,
//   ApiFetchMentorCount,
//   ApiDeletMentorData,
//   ApiUpdateMentor,

//   // Meeting & Feedback APIs
//   ApiScheduleMeeting,
//   ApiFetchScheduleMeetings,
//   ApiSaveFeedback,
//   ApiFetchFeedback,

//   // Testimonial APIs
//   ApiTestimonials,
//   ApiFetchTestimonials,

//   // Startup APIs
//   ApiFetchStartup,
//   ApiDeletStartupData,
//   ApiUpdateStartupFounder,
//   ApiUpdateStartupPersonalInfo,
//   ApiUpdateStartupAbout,
//   ApiUpdateStartupMentorDetails,

//   // Award APIs
//   ApiAddAward,
//   ApiFetchAward,

//   // Events APIs
//   ApiFetchEvents,

//   // Configuration
//   API_BASE_URL,
//   API_URLS,
// };









import axios from "axios";

// ==================== CONFIGURATION ====================
const isDevelopment = process.env.NODE_ENV === "development";

// API Base URLs
const API_URLS = {
  // DEVELOPMENT: "http://13.127.7.121",
  PRODUCTION: "http://13.127.7.121",
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
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateMentor", error);
    throw new Error("Failed to update Mentor details");
  }
}   

// ==================== MEETING & FEEDBACK APIs ====================
async function ApiScheduleMeeting(payload) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/api/v1/mentor/meeting`,
      payload,
      {
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
async function ApiFetchStartup() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/fetch-startup`);
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
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
    let headers = {};

    // If payload is not FormData, convert it
    if (!(payload instanceof FormData)) {
      dataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "profile_image" && value) {
          dataToSend.append("logo_image", value); // Use 'logo_image' for backend
        } else if (value !== undefined && value !== null) {
          dataToSend.append(key, value);
        }
      });
    } else {
      // If already FormData, rename 'profile_image' to 'logo_image' if present
      if (payload.has("profile_image")) {
        const file = payload.get("profile_image");
        payload.delete("profile_image");
        payload.append("logo_image", file);
      }
    }

    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/edit-startupdata/personal-info`,
      dataToSend,
      { headers }
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

async function ApiUpdateAward(payload) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/updateaward`,
      payload
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

// ==================== EVENTS APIs ====================
async function ApiFetchEvents() {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/v1/fetchevents`);
    return result.data;
  } catch (err) {
    console.log(err);
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
  ApiScheduleMeeting,
  ApiFetchScheduleMeetings,
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
  ApiFetchStartupCount,
  ApiDeletStartupData,
  ApiUpdateStartupFounder,
  ApiUpdateStartupPersonalInfo,
  ApiUpdateStartupAbout,
  ApiUpdateStartupMentorDetails,
  ApiFetchFunding,
  ApiFetchFundingDetain,
  ApiAddFundingProject,
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
ApiUpdateFundingProject,
  // Award APIs
  ApiAddAward,
  ApiFetchAward,
  ApiDeleteAward,
  ApiUpdateAward,
  ApiFetchFounder,
  ApiAddFounder,
  // Events APIs
  ApiFetchEvents,
  ApiAddFunding,
  ApiFetchFundingAmount,
  ApiUpdateFunding,
  // Configuration
  API_BASE_URL,
  API_URLS,
};