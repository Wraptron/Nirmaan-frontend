import axios from "axios";

// Connections
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
    console.error("Error in API", error);
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

// Mentors
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
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiFetchMentorCount() {
  try {
    const result = await axios.get("http://localhost:3003/api/v1/mentor/count");
    return result.data;
  } catch (error) {
    console.error("Error in API", error);
    throw error;
  }
}

async function ApiDeletMentorData(id) {
  try {
    const res = await axios.delete(
      `http://localhost:3003/api/v1/delete-mentor/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "DeleteMentor API error: ",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Events
async function ApiFetchEvents() {
  try {
    const result = await axios.get("http://localhost:3003/api/v1/fetchevents");
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
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
};
