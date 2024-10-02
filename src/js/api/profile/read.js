import { API_SOCIAL_PROFILES } from "../constants";
import { getMyToken } from "../../utilities/getInfo.js";
import { getNameFromURL } from "../../utilities/getInfo.js";
import { headers } from "../../api/headers";

const token = await getMyToken();

/**
 * Creates fetch options including method and headers.
 *
 * @param {Headers} requestHeaders - The request headers.
 * @returns {Object} The fetch options object.
 */
const createFetchOptions = (requestHeaders) => {
  return {
    method: "GET",
    headers: requestHeaders,
    redirect: "follow",
  };
};

/**
 * Makes a GET request to the provided URL with given options.
 *
 * @async
 * @param {string} url - The URL to send the request to.
 * @param {Object} fetchOptions - The options for the fetch request.
 * @returns {Promise<Object|null>} The response data or null if an error occurs.
 * @throws {Error} If the request fails.
 */
const makeGetRequest = async (url, fetchOptions) => {
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    return null;
  }
};

/**
 * Fetches the profile data for the currently visited user.
 *
 * @async
 * @returns {Promise<Object|null>} The profile data or null if an error occurs.
 */
export async function readProfile() {
  const username = getNameFromURL();
  const requestHeaders = headers();
  requestHeaders.append("Authorization", `Bearer ${token}`);
  const fetchOptions = createFetchOptions(requestHeaders);
  const fetchUrl = `${API_SOCIAL_PROFILES}/${username}`;

  const response = await makeGetRequest(fetchUrl, fetchOptions);
  if (!response) {
    return null;
  }
  return response;
}
