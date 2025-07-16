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

// // API Configuration
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://3.109.48.163:3003";
// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

// // Check if API_BASE_URL is defined
// if (!API_BASE_URL) {
//   console.error('REACT_APP_API_BASE_URL is not defined in environment variables');
// }

// // API Headers Configuration
// export const API_HEADERS = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
// };

// // API Headers for File Upload
// export const FILE_UPLOAD_HEADERS = {
//   'Accept': 'application/json',
//   // Don't set Content-Type for file uploads, let the browser set it
// };

// // Default API Configuration
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
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// async function ApiViewConnections() {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/viewconnections`
//     );
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
//     console.error("Error", error);
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
//     console.log(error);
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
//     console.log(err);
//     throw err;
//   }
// }

// async function ApiFetchMentor() {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/get-mentor-details`
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error in API", error);
//     throw error;
//   }
// }

// async function ApiFetchMentorCount() {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/mentor/count`
//     );
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
//     console.log(err);
//     throw err;
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
//         `${API_BASE_URL}/api/v1/get-mentor-details`
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
//     console.log('Save Feedback API Response:', result.data);
//     return result.data;
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     throw error;
//   }
// }

// async function ApiFetchFeedback(meetingId) {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/mentor/feedback/${meetingId}`
//     );
//     console.log('Fetch Feedback API Response:', result.data);
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
//     const res = await axios.delete(`${API_BASE_URL}/testimonial/${testimonialId}`);
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     throw error;
//   }
// };

// // ==================== STARTUP APIs ====================
// async function ApiFetchStartup() {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/fetch-startup`
//     );
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
//     const response = await axios.put(`${API_BASE_URL}/api/v1/edit-startupdata/personal-info`, dataToSend, { headers });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupAbout(payload) {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/api/v1/edit-startup/about`, payload);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// async function ApiUpdateStartupMentorDetails(payload) {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/api/v1/edit-startup/mentordetails`, payload);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating startup:", error);
//     throw new Error("Failed to update startup details");
//   }
// }

// // ==================== EVENTS APIs ====================
// async function ApiFetchEvents() {
//   try {
//     const result = await axios.get(
//       `${API_BASE_URL}/api/v1/fetchevents`
//     );
//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

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
//   ApiUpdateStartupPersonalInfo,
//   ApiUpdateStartupAbout,
//   ApiUpdateStartupMentorDetails,
  
//   // Events APIs
//   ApiFetchEvents,
// };

// // API Endpoints Configuration (from your second file)
// export const API_ENDPOINTS = {
//   // Authentication
//   LOGIN: `${API_BASE_URL}${process.env.REACT_APP_LOGIN_API}`,
//   REGISTER: `${API_BASE_URL}${process.env.REACT_APP_REGISTER_API}`,
//   FORGOT_PASSWORD: `${API_BASE_URL}${process.env.REACT_APP_FORGOT_PASSWORD_API}`,
  
//   // Base configurations
//   BASE_URL: API_BASE_URL,
//   SOCKET_URL: SOCKET_URL,
// };

// // Environment validation
// export const validateEnvironmentVariables = () => {
//   const requiredVars = [
//     'REACT_APP_API_BASE_URL',
//     'REACT_APP_SOCKET_URL'
//   ];

//   const missingVars = requiredVars.filter(varName => !process.env[varName]);

//   if (missingVars.length > 0) {
//     console.error('Missing required environment variables:', missingVars);
//     return false;
//   }

//   console.log('All required environment variables are set');
//   return true;
// };



















// import axios from "axios";

// // ==================== CONFIGURATION ====================
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://3.109.48.163:3003";
// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://3.109.48.163:5000";

// // Validate environment variables
// const validateEnvironment = () => {
//   if (!API_BASE_URL) {
//     console.error('REACT_APP_API_BASE_URL is not defined in environment variables');
//     throw new Error('API_BASE_URL is required');
//   }
  
//   if (!SOCKET_URL) {
//     console.error('REACT_APP_SOCKET_URL is not defined in environment variables');
//     throw new Error('SOCKET_URL is required');
//   }
  
//   console.log('✅ API Configuration:');
//   console.log(`📡 API Base URL: ${API_BASE_URL}`);
//   console.log(`🔌 Socket URL: ${SOCKET_URL}`);
// };

// // Initialize validation
// validateEnvironment();

// // ==================== AXIOS CONFIGURATION ====================
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   }
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.status} ${response.config.url}`);
//     return response;
//   },
//   (error) => {
//     console.error('❌ Response Error:', {
//       status: error.response?.status,
//       url: error.config?.url,
//       message: error.message,
//       data: error.response?.data
//     });
    
//     // Handle specific error cases
//     if (error.response?.status === 404) {
//       console.error('API endpoint not found');
//     } else if (error.response?.status === 500) {
//       console.error('Server error occurred');
//     } else if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout');
//     }
    
//     return Promise.reject(error);
//   }
// );

// // ==================== UTILITY FUNCTIONS ====================
// const handleApiError = (error, context = 'API call') => {
//   console.error(`Error in ${context}:`, error);
  
//   if (error.response) {
//     // Server responded with error status
//     throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
//   } else if (error.request) {
//     // Network error
//     throw new Error('Network error: Unable to connect to server');
//   } else {
//     // Other error
//     throw new Error(error.message || 'Unknown error occurred');
//   }
// };

// const createFormData = (data) => {
//   const formData = new FormData();
  
//   Object.entries(data).forEach(([key, value]) => {
//     if (value !== undefined && value !== null) {
//       if (value instanceof File) {
//         formData.append(key, value);
//       } else {
//         formData.append(key, String(value));
//       }
//     }
//   });
  
//   return formData;
// };

// // ==================== CONNECTION APIs ====================
// export const ApiAddConnections = async (connectionData) => {
//   try {
//     const response = await apiClient.post('/api/v1/add-connections', connectionData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiAddConnections');
//   }
// };

// export const ApiViewConnections = async () => {
//   try {
//     const response = await apiClient.get('/api/v1/viewconnections');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiViewConnections');
//   }
// };

// export const ApiEstablishConnections = async (connectionData) => {
//   try {
//     const response = await apiClient.post('/api/v1/establish-connection', connectionData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiEstablishConnections');
//   }
// };

// export const ApiDeleteConnections = async (emailAddress) => {
//   try {
//     const response = await apiClient.delete(`/api/v1/delete-connection?element_data=${emailAddress}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiDeleteConnections');
//   }
// };

// // ==================== MENTOR APIs ====================
// export const ApiAddNewMentor = async (mentorData) => {
//   try {
//     const formData = createFormData(mentorData);
    
//     const response = await apiClient.post('/api/v1/mentor/add', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });
    
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiAddNewMentor');
//   }
// };

// export const ApiFetchMentor = async () => {
//   try {
//     const response = await apiClient.get('/api/v1/get-mentor-details');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchMentor');
//   }
// };

// export const ApiFetchMentorCount = async () => {
//   try {
//     const response = await apiClient.get('/api/v1/mentor/count');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchMentorCount');
//   }
// };

// export const ApiDeletMentorData = async (mentorId) => {
//   try {
//     const response = await apiClient.delete(`/api/v1/delete-mentor/${mentorId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiDeletMentorData');
//   }
// };

// export const ApiUpdateMentor = async (mentorId, updateData) => {
//   try {
//     // Clean the data
//     const cleanedData = Object.fromEntries(
//       Object.entries(updateData).filter(([_, value]) => {
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

//     console.log('Updating mentor:', { mentorId, cleanedData });

//     const response = await apiClient.put(`/api/v1/mentor/update/${mentorId}`, cleanedData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiUpdateMentor');
//   }
// };

// // ==================== MEETING & FEEDBACK APIs ====================
// export const ApiScheduleMeeting = async (meetingData) => {
//   try {
//     const response = await apiClient.post('/api/v1/schedulemeeting', meetingData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiScheduleMeeting');
//   }
// };

// export const ApiFetchScheduleMeetings = async (mentorId) => {
//   try {
//     const response = await apiClient.get(`/api/v1/fetchmeeting/${mentorId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchScheduleMeetings');
//   }
// };

// export const ApiSaveFeedback = async (meetingId, feedback) => {
//   try {
//     const feedbackData = {
//       meeting_id: meetingId,
//       feedback_text: feedback,
//       created_at: new Date().toISOString(),
//     };
    
//     const response = await apiClient.post('/api/v1/mentor/feedback/save', feedbackData);
//     console.log('Save Feedback API Response:', response.data);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiSaveFeedback');
//   }
// };

// export const ApiFetchFeedback = async (meetingId) => {
//   try {
//     const response = await apiClient.get(`/api/v1/mentor/feedback/${meetingId}`);
//     console.log('Fetch Feedback API Response:', response.data);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchFeedback');
//   }
// };

// // ==================== TESTIMONIAL APIs ====================
// export const ApiTestimonials = async (testimonialData) => {
//   try {
//     const response = await apiClient.post('/api/v1/testimonial', testimonialData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiTestimonials');
//   }
// };

// export const ApiFetchTestimonials = async (mentorId) => {
//   try {
//     const response = await apiClient.get(`/api/v1/fetchtestimonial/${mentorId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchTestimonials');
//   }
// };

// export const ApiDeleteTestimonial = async (testimonialId) => {
//   try {
//     const response = await apiClient.delete(`/testimonial/${testimonialId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiDeleteTestimonial');
//   }
// };

// // ==================== STARTUP APIs ====================
// export const ApiFetchStartup = async () => {
//   try {
//     const response = await apiClient.get('/api/v1/fetch-startup');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchStartup');
//   }
// };

// export const ApiDeletStartupData = async (email) => {
//   try {
//     const response = await apiClient.delete(`/api/v1/delete-startup/${email}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiDeletStartupData');
//   }
// };

// export const ApiUpdateStartupPersonalInfo = async (startupData) => {
//   try {
//     let formData;
    
//     if (startupData instanceof FormData) {
//       formData = startupData;
//       // Rename 'profile_image' to 'logo_image' if present
//       if (formData.has('profile_image')) {
//         const file = formData.get('profile_image');
//         formData.delete('profile_image');
//         formData.append('logo_image', file);
//       }
//     } else {
//       formData = new FormData();
//       Object.entries(startupData).forEach(([key, value]) => {
//         if (key === 'profile_image' && value) {
//           formData.append('logo_image', value);
//         } else if (value !== undefined && value !== null) {
//           formData.append(key, value);
//         }
//       });
//     }

//     const response = await apiClient.put('/api/v1/edit-startupdata/personal-info', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });
    
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiUpdateStartupPersonalInfo');
//   }
// };

// export const ApiUpdateStartupAbout = async (aboutData) => {
//   try {
//     const response = await apiClient.put('/api/v1/edit-startup/about', aboutData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiUpdateStartupAbout');
//   }
// };

// export const ApiUpdateStartupMentorDetails = async (mentorDetailsData) => {
//   try {
//     const response = await apiClient.put('/api/v1/edit-startup/mentordetails', mentorDetailsData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiUpdateStartupMentorDetails');
//   }
// };

// // ==================== EVENTS APIs ====================
// export const ApiFetchEvents = async () => {
//   try {
//     const response = await apiClient.get('/api/v1/fetchevents');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiFetchEvents');
//   }
// };

// // ==================== AUTHENTICATION APIs ====================
// export const ApiLogin = async (loginData) => {
//   try {
//     const response = await apiClient.post(process.env.REACT_APP_LOGIN_API || '/api/v1/login', loginData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiLogin');
//   }
// };

// export const ApiRegister = async (registerData) => {
//   try {
//     const response = await apiClient.post(process.env.REACT_APP_REGISTER_API || '/api/v1/register', registerData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiRegister');
//   }
// };

// export const ApiForgotPassword = async (forgotPasswordData) => {
//   try {
//     const response = await apiClient.post(process.env.REACT_APP_FORGOT_PASSWORD_API || '/api/v1/forgot-password', forgotPasswordData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiForgotPassword');
//   }
// };

// // ==================== HEALTH CHECK APIs ====================
// export const ApiHealthCheck = async () => {
//   try {
//     const response = await apiClient.get('/health');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiHealthCheck');
//   }
// };

// export const ApiTestCors = async () => {
//   try {
//     const response = await apiClient.get('/test-cors');
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'ApiTestCors');
//   }
// };

// // ==================== CONFIGURATION EXPORTS ====================
// export const API_CONFIG = {
//   BASE_URL: API_BASE_URL,
//   SOCKET_URL: SOCKET_URL,
//   TIMEOUT: 30000,
//   ENDPOINTS: {
//     LOGIN: process.env.REACT_APP_LOGIN_API || '/api/v1/login',
//     REGISTER: process.env.REACT_APP_REGISTER_API || '/api/v1/register',
//     FORGOT_PASSWORD: process.env.REACT_APP_FORGOT_PASSWORD_API || '/api/v1/forgot-password',
//   }
// };

// // ==================== SOCKET.IO CONFIGURATION ====================
// export const getSocketConfig = () => ({
//   url: SOCKET_URL,
//   options: {
//     withCredentials: true,
//     transports: ['websocket', 'polling'],
//     reconnection: true,
//     reconnectionDelay: 1000,
//     reconnectionAttempts: 5,
//     timeout: 20000,
//   }
// });

// // ==================== ENVIRONMENT VALIDATION ====================
// export const validateEnvironmentVariables = () => {
//   const requiredVars = [
//     'REACT_APP_API_BASE_URL',
//     'REACT_APP_SOCKET_URL'
//   ];

//   const missingVars = requiredVars.filter(varName => !process.env[varName]);

//   if (missingVars.length > 0) {
//     console.error('❌ Missing required environment variables:', missingVars);
//     return false;
//   }

//   console.log('✅ All required environment variables are set');
//   return true;
// };

// // ==================== CONNECTION TEST UTILITY ====================
// export const testConnection = async () => {
//   try {
//     console.log('🔄 Testing backend connection...');
    
//     // Test API endpoint
//     const healthResponse = await ApiHealthCheck();
//     console.log('✅ API Health Check:', healthResponse);
    
//     // Test CORS
//     const corsResponse = await ApiTestCors();
//     console.log('✅ CORS Test:', corsResponse);
    
//     return {
//       api: true,
//       cors: true,
//       message: 'Backend connection successful'
//     };
//   } catch (error) {
//     console.error('❌ Backend connection failed:', error);
//     return {
//       api: false,
//       cors: false,
//       message: `Connection failed: ${error.message}`
//     };
//   }
// };

// // ==================== DEFAULT EXPORT ====================
// export default {
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
//   ApiDeleteTestimonial,
  
//   // Startup APIs
//   ApiFetchStartup,
//   ApiDeletStartupData,
//   ApiUpdateStartupPersonalInfo,
//   ApiUpdateStartupAbout,
//   ApiUpdateStartupMentorDetails,
  
//   // Events APIs
//   ApiFetchEvents,
  
//   // Authentication APIs
//   ApiLogin,
//   ApiRegister,
//   ApiForgotPassword,
  
//   // Health Check APIs
//   ApiHealthCheck,
//   ApiTestCors,
  
//   // Utilities
//   testConnection,
//   validateEnvironmentVariables,
//   getSocketConfig,
//   API_CONFIG
// };















// import axios from "axios";

// // ==================== CONFIGURATION ====================
// const isDevelopment = process.env.NODE_ENV === "development";

// // API Base URLs
// const API_URLS = {
//   DEVELOPMENT: "http://localhost:3003",
//   PRODUCTION: "http://3.110.173.141:3003",
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
//     console.error("Error in API", error);
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
//     console.error("Error", error);
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
//     console.log(error);
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
//     console.log(err);
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
//     console.log(err);
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
//     console.error("Error saving feedback:", error);
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
//     console.error("Error updating startup:", error);
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
//     console.error("Error updating startup:", error);
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
//     console.error("Error updating startup:", error);
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

// API Base URLs - CORRECTED IP ADDRESS
const API_URLS = {
  DEVELOPMENT: "http://localhost:3003",
  PRODUCTION: "https://3.110.173.141", // Corrected IP address and HTTPS
};

// Alternative configuration with environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (isDevelopment ? API_URLS.DEVELOPMENT : API_URLS.PRODUCTION);

console.log(
  `API Base URL: ${API_BASE_URL} (${isDevelopment ? "Development" : "Production"} mode)`
);

// ==================== AXIOS INSTANCE WITH BETTER ERROR HANDLING ====================
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
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

// ==================== CONNECTION APIs ====================
async function ApiAddConnections(AddConnection) {
  try {
    const result = await apiClient.post('/api/v1/add-connections', AddConnection);
    return result.data;
  } catch (error) {
    console.error("Error in ApiAddConnections", error);
    throw error;
  }
}

async function ApiViewConnections() {
  try {
    const result = await apiClient.get('/api/v1/viewconnections');
    return result.data;
  } catch (error) {
    console.error("Error in ApiViewConnections", error);
    throw error;
  }
}

async function ApiEstablishConnections(EstablishConnection) {
  try {
    const result = await apiClient.post('/api/v1/establish-connection', EstablishConnection);
    return result.data;
  } catch (error) {
    console.error("Error in ApiEstablishConnections", error);
    throw error;
  }
}

async function ApiDeleteConnections(email_address) {
  try {
    const result = await apiClient.delete(`/api/v1/delete-connection?element_data=${email_address}`);
    return result.data;
  } catch (error) {
    console.error("Error in ApiDeleteConnections", error);
    throw error;
  }
}

// ==================== MENTOR APIs ====================
async function ApiAddNewMentor(formDataa) {
  try {
    const result = await apiClient.post('/api/v1/mentor/add', formDataa, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error in ApiAddNewMentor", err);
    throw err;
  }
}

async function ApiFetchMentor() {
  try {
    const result = await apiClient.get('/api/v1/get-mentor-details');
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchMentor", error);
    throw error;
  }
}

async function ApiFetchMentorCount() {
  try {
    const result = await apiClient.get('/api/v1/mentor/count');
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchMentorCount", error);
    throw error;
  }
}

async function ApiDeletMentorData(id) {
  try {
    const result = await apiClient.delete(`/api/v1/delete-mentor/${id}`);
    return result.data;
  } catch (err) {
    console.error("Error in ApiDeletMentorData", err);
    throw err;
  }
}

async function ApiUpdateMentor(mentorId, formData) {
  try {
    // Clean the form data - remove any undefined, null, or empty string values
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => {
        if (typeof value === "string") {
          return value.trim() !== "";
        }
        return value !== undefined && value !== null;
      })
    );

    // Convert year_of_passing_out to number if it exists
    if (cleanedData.year_of_passing_out) {
      cleanedData.year_of_passing_out = parseInt(cleanedData.year_of_passing_out, 10);
    }

    console.log("API Update Mentor - Request Payload:", { mentorId, data: cleanedData });

    // Verify mentor exists
    const verifyResponse = await apiClient.get('/api/v1/get-mentor-details');
    const mentorExists = verifyResponse.data?.STATUS?.rows?.some(
      (m) => String(m.mentor_id) === String(mentorId)
    );

    if (!mentorExists) {
      throw new Error("Mentor not found");
    }

    // Make the update request
    const result = await apiClient.put(`/api/v1/mentor/update/${mentorId}`, cleanedData);
    return result.data;
  } catch (err) {
    console.error("Error in ApiUpdateMentor", err);
    throw err;
  }
}

// ==================== MEETING & FEEDBACK APIs ====================
async function ApiScheduleMeeting(payload) {
  try {
    const result = await apiClient.post('/api/v1/schedulemeeting', payload);
    return result.data;
  } catch (err) {
    console.error("Error in ApiScheduleMeeting", err);
    throw err;
  }
}

async function ApiFetchScheduleMeetings(mentor_id) {
  try {
    const result = await apiClient.get(`/api/v1/fetchmeeting/${mentor_id}`);
    return result.data;
  } catch (err) {
    console.error("Error in ApiFetchScheduleMeetings", err);
    throw err;
  }
}

async function ApiSaveFeedback(meetingId, feedback) {
  try {
    const result = await apiClient.post('/api/v1/mentor/feedback/save', {
      meeting_id: meetingId,
      feedback_text: feedback,
      created_at: new Date().toISOString(),
    });
    console.log("Save Feedback API Response:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error in ApiSaveFeedback", error);
    throw error;
  }
}

async function ApiFetchFeedback(meetingId) {
  try {
    const result = await apiClient.get(`/api/v1/mentor/feedback/${meetingId}`);
    console.log("Fetch Feedback API Response:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchFeedback", error);
    throw error;
  }
}

// ==================== TESTIMONIAL APIs ====================
async function ApiTestimonials(payload) {
  try {
    const result = await apiClient.post('/api/v1/testimonial', payload);
    return result.data;
  } catch (error) {
    console.error("Error in ApiTestimonials", error);
    throw error;
  }
}

async function ApiFetchTestimonials(mentor_id) {
  try {
    const result = await apiClient.get(`/api/v1/fetchtestimonial/${mentor_id}`);
    return result.data;
  } catch (err) {
    console.error("Error in ApiFetchTestimonials", err);
    throw err;
  }
}

export const ApiDeleteTestimonial = async (testimonialId) => {
  try {
    const res = await apiClient.delete(`/testimonial/${testimonialId}`);
    return res.data;
  } catch (error) {
    console.error("Error in ApiDeleteTestimonial", error);
    throw error;
  }
};

// ==================== STARTUP APIs ====================
async function ApiFetchStartup() {
  try {
    const result = await apiClient.get('/api/v1/fetch-startup');
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchStartup", error);
    throw error;
  }
}

async function ApiDeletStartupData(email) {
  try {
    const result = await apiClient.delete(`/api/v1/delete-startup/${email}`);
    return result.data;
  } catch (err) {
    console.error("Error in ApiDeletStartupData", err);
    throw err;
  }
}

async function ApiUpdateStartupFounder(payload) {
  try {
    const response = await apiClient.put('/api/v1/edit-startup/founder', payload);
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupFounder", error);
    throw new Error("Failed to update startup details");
  }
}

async function ApiUpdateStartupPersonalInfo(payload) {
  try {
    let dataToSend = payload;

    // Handle FormData conversion
    if (!(payload instanceof FormData)) {
      dataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "profile_image" && value) {
          dataToSend.append("logo_image", value);
        } else if (value !== undefined && value !== null) {
          dataToSend.append(key, value);
        }
      });
    } else {
      if (payload.has("profile_image")) {
        const file = payload.get("profile_image");
        payload.delete("profile_image");
        payload.append("logo_image", file);
      }
    }

    const response = await apiClient.put('/api/v1/edit-startupdata/personal-info', dataToSend, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupPersonalInfo", error);
    throw new Error("Failed to update startup details");
  }
}

async function ApiUpdateStartupAbout(payload) {
  try {
    const response = await apiClient.put('/api/v1/edit-startup/about', payload);
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupAbout", error);
    throw new Error("Failed to update startup details");
  }
}

async function ApiUpdateStartupMentorDetails(payload) {
  try {
    const response = await apiClient.put('/api/v1/edit-startup/mentordetails', payload);
    return response.data;
  } catch (error) {
    console.error("Error in ApiUpdateStartupMentorDetails", error);
    throw new Error("Failed to update startup details");
  }
}

// ==================== AWARD APIs ====================
async function ApiAddAward(formdata) {
  try {
    const result = await apiClient.post('/api/v1/addstartup/award', formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return result.data;
  } catch (err) {
    console.error("Error in ApiAddAward", err);
    throw err;
  }
}

async function ApiFetchAward() {
  try {
    const result = await apiClient.get('/api/v1/fetchaward');
    return result.data;
  } catch (error) {
    console.error("Error in ApiFetchAward", error);
    throw error;
  }
}

// ==================== EVENTS APIs ====================
async function ApiFetchEvents() {
  try {
    const result = await apiClient.get('/api/v1/fetchevents');
    return result.data;
  } catch (err) {
    console.error("Error in ApiFetchEvents", err);
    throw err;
  }
}

// ==================== UTILITY FUNCTIONS ====================
export const switchEnvironment = (environment) => {
  if (environment === "development") {
    return API_URLS.DEVELOPMENT;
  } else if (environment === "production") {
    return API_URLS.PRODUCTION;
  }
  return API_BASE_URL;
};

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
  ApiFetchFeedback,

  // Testimonial APIs
  ApiTestimonials,
  ApiFetchTestimonials,

  // Startup APIs
  ApiFetchStartup,
  ApiDeletStartupData,
  ApiUpdateStartupFounder,
  ApiUpdateStartupPersonalInfo,
  ApiUpdateStartupAbout,
  ApiUpdateStartupMentorDetails,

  // Award APIs
  ApiAddAward,
  ApiFetchAward,

  // Events APIs
  ApiFetchEvents,

  // Configuration
  API_BASE_URL,
  API_URLS,
  apiClient,
};