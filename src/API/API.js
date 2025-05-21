import axios from "axios";
async function ApiAddConnections(AddConnection) {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/add-connections",
      AddConnection
    );
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}
async function ApiViewConnections() {
  try {
    const result = await axios.get(
      "http://localhost:3003/api/v1/viewconnections"
    );
    return result.data;
  } catch (error) {
    console.error("Error in APi", error);
    throw error;
  }
}

async function ApiEstablishConnections(EstablishConnection) {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/establish-connection",
      EstablishConnection
    );
    return result.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

async function ApiDeleteConnections(email_address) {
  try {
    const result = await axios.delete(
      `http://localhost:3003/api/v1/delete-connection?element_data=${email_address}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//mentor data
async function ApiAddNewMentor(formData) {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/mentor/add",
      formData,
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

async function ApiFetchMentor() {
  try {
    const result = await axios.get(
      "http://localhost:3003/api/v1/get-mentor-details"
    );
    return result.data;
  } catch (error) {
    console.error("Error in APi", error);
    throw error;
  }
}

async function ApiFetchMentorCount() {
  try {
    const result = await axios.get("http://localhost:3003/api/v1/mentor/count");
    return result.data;
  } catch (error) {
    console.error("Error in APi", error);
    throw error;
  }
}
async function ApiDeletMentorData(id) {
  try {
    const result = await axios.delete(
      `http://localhost:3003/api/v1/delete-mentor/${id}`
    );
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function ApiScheduleMeeting(payload) {
  try {
    const result = await axios.post(
      "http://localhost:3003/api/v1/schedulemeeting",
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
    const result = await axios.get(`http://localhost:3003/api/v1/fetchmeeting/${mentor_id}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function ApiTestimonials(payload){
  try{
    const result=await axios.post(
       "http://localhost:3003/api/v1/testimonial",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return result.data
  }
  catch(error){
           console.log(error)
           throw error
  }
}

async function ApiFetchTestimonials(mentor_id) {
  try {
    const result = await axios.get(`http://localhost:3003/api/v1/fetchtestimonial/${mentor_id}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
// Register for new startups

//Events

// async function ApiCreateEvent(){
//     try
//     {
//         const result = await axios.post(`http://localhost:3003/api/v1/delete-mentor`,)
//     }
//     catch(err)
//     {
//         console.log(err);
//         throw err;
//     }
// }

async function ApiFetchEvents() {
  try {
    const result = await axios.get("http://localhost:3003/api/v1/fetchevents");
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function ApiUpdateMentor(mentorId, formData) {
  try {
    // Clean the form data - remove any undefined, null, or empty string values
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => {
        // Keep only non-empty strings and other non-empty values
        if (typeof value === 'string') {
          return value.trim() !== '';
        }
        return value !== undefined && value !== null;
      })
    );

    // Convert year_of_passing_out to number if it exists
    if (cleanedData.year_of_passing_out) {
      cleanedData.year_of_passing_out = parseInt(cleanedData.year_of_passing_out, 10);
    }

    // Log the exact request payload
    const requestPayload = {
      mentorId,
      data: cleanedData
    };
    console.log('API Update Mentor - Exact Request Payload:', JSON.stringify(requestPayload, null, 2));

    // First try a GET request to verify the mentor exists
    try {
      const verifyResponse = await axios.get(`http://localhost:3003/api/v1/get-mentor-details`);
      const mentorExists = verifyResponse.data?.STATUS?.rows?.some(
        m => String(m.mentor_id) === String(mentorId)
      );
      
      if (!mentorExists) {
        throw new Error('Mentor not found');
      }
    } catch (verifyError) {
      console.error('Error verifying mentor:', verifyError);
      throw new Error('Failed to verify mentor exists');
    }

    // Make the update request
    const result = await axios.put(
      `http://localhost:3003/api/v1/mentor/update/${mentorId}`,
      cleanedData,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      }
    );

    console.log('API Update Mentor - Full Response:', {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      headers: result.headers
    });

    if (result.status !== 200) {
      const errorMessage = result.data?.error || result.data?.message || 'Failed to update mentor';
      throw new Error(errorMessage);
    }

    return result.data;
  } catch (err) {
    // Enhanced error logging
    const errorDetails = {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      headers: err.response?.headers,
      config: {
        url: err.config?.url,
        method: err.config?.method,
        data: err.config?.data ? JSON.parse(err.config.data) : null
      }
    };
    console.error('API Update Mentor - Detailed Error:', errorDetails);
    
    // Throw a more descriptive error
    if (err.response?.status === 500) {
      throw new Error(`Server error: ${err.response.data?.error || 'Unknown server error'}`);
    } else if (err.message === 'Mentor not found') {
      throw new Error('Mentor not found in the system');
    } else {
      throw err;
    }
  }
}

export {
  ApiAddConnections,
  ApiViewConnections,
  ApiEstablishConnections,
  ApiDeleteConnections,
  ApiAddNewMentor,
  ApiFetchMentor,
  ApiFetchMentorCount,
  ApiDeletMentorData,
  ApiFetchEvents,
  ApiScheduleMeeting,
  ApiFetchScheduleMeetings,
  ApiTestimonials,
  ApiFetchTestimonials,
  ApiUpdateMentor
};
