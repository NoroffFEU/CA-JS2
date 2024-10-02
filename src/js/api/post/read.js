import { API_KEY } from "../constants";
import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../../api/headers";
import { getMyToken } from "../../utilities/getInfo.js";

const token = getMyToken();

/**
 * Makes a GET request to the provided URL with the given headers.
 *
 * @async
 * @param {string} url - The URL to send the request to.
 * @param {Headers} requestHeaders - The headers to include in the request.
 * @returns {Promise<Object|null>} The response data or null if an error occurs.
 * @throws {Error} If the request fails.
 */
async function makeGetRequest(url, requestHeaders) {
  if (token) {
    requestHeaders.append("Authorization", `Bearer ${token}`);
  }

  const fetchOptions = {
    method: "GET",
    headers: requestHeaders,
    redirect: "follow",
  };

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
}

/**
 * Fetches a single post by ID.
 *
 * @async
 * @param {number|string} id - The ID of the post to retrieve.
 * @returns {Promise<Object|null>} The post data or null if an error occurs.
 */
export async function readPost(id) {
  const requestHeaders = headers();
  requestHeaders.append("Authorization", `Bearer ${token}`);
  return makeGetRequest(`${API_SOCIAL_POSTS}/${id}`, requestHeaders);
}

/**
 * Fetches multiple posts with optional limit and pagination.
 *
 * @async
 * @param {number} [limit=12] - The maximum number of posts to retrieve.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - Optional tag to filter the posts.
 * @returns {Promise<Object|null>} The posts data or null if an error occurs.
 */
export async function readPosts(limit = 12, page = 1, tag) {
  const requestHeaders = new Headers();
  requestHeaders.append("X-Noroff-API-Key", API_KEY);
  return makeGetRequest(API_SOCIAL_POSTS, requestHeaders);
}

/**
 * Fetches posts by a specific user with optional limit, pagination, and tag filter.
 *
 * @async
 * @param {string} username - The username of the user whose posts to retrieve.
 * @param {number} [limit=12] - The maximum number of posts to retrieve.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - Optional tag to filter the posts.
 * @returns {Promise<Object|null>} The posts data or null if an error occurs.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const requestHeaders = headers();

  let url = `${API_SOCIAL_PROFILES}/${username}/posts?limit=${limit}&page=${page}&_author=true`;

  if (tag) {
    url += `&tag=${tag}`;
  }

  return makeGetRequest(url, requestHeaders);
}
