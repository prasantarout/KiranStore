import axios from "axios";
import constants from "./constants";

export async function getApi(url, header) {
  console.log("GetApi: ", `${constants.BASE_URL}/${url}`);

  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      "Content-type": header.contenttype,
      // "x-access-token": header.accesstoken,
      // Authorization: 'Bearer' + ' ' + header.accesstoken,
    },
  });

}

  // if (!response.ok) {
  //   throw new Error(`API Request Error: ${response.status} - ${response.statusText}`);
  // }

  // const data = await response.json();
  // console.log("Response Data:", data);
  // return data;


export async function getApiWithParam(url, param, header) {
  console.log("getApiWithParam: ", `${constants.BASE_URL}/${url}`);

  return await axios({
    method: "GET",
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      "Content-type": header.contenttype,
    },
  });
}

export async function postApi(url, payload, header) {
  // debugger;
  try {
    console.log("PostApi: ", `${constants.BASE_URL}/${url}`);
    const response = await fetch(`${constants.BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        Accept: header.Accept,
        // "Content-Type": header.contenttype,
      },
      body: payload, // Assuming 'payload' is a FormData object
    });

    if (!response.ok) {
      throw new Error(`API Request Error: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json(); // Parse the response JSON
    console.log("Response Data:", responseData);

    return responseData;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error; // Rethrow the error for Saga to handle
  }
}

