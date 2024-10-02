/**
 * Fetches post data from the API and populates the edit form with the post information.
 *
 * @async
 * @param {string} postId - The ID of the post to update.
 * @returns {Promise<void>} - A promise that resolves when the post data is successfully fetched and the form is populated.
 * @throws {Error} If the request to fetch post data fails.
 */

import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants";
import { headers } from "../../api/headers";
import { getIDFromURL, getMyToken } from "../../utilities/getInfo";

const targetId = getIDFromURL();
const endpoint = `${API_SOCIAL_POSTS}/${targetId}`;

/**
 * Fetches post data from the API and populates the form.
 *
 * @async
 * @param {string} postId - The ID of the post to update.
 * @returns {Promise<void>} - A promise that resolves when the post data is fetched.
 * @throws {Error} If the request to fetch post data fails.
 */
export async function onUpdatePost(postId) {
  const token = getMyToken();

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
        ...headers(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }

    const postData = await response.json();
    populateForm(postData.data);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

/**
 * Populates the form with the fetched post data.
 *
 * @param {Object} post - The post data object containing title, body, tags, and media information.
 * @returns {void}
 */
function populateForm(post) {
  document.getElementById("title").value = post.title;
  document.getElementById("body").value = post.body;
  document.getElementById("tags").value = post.tags.join(", ");
  document.getElementById("image").value = post.media?.url || "";
  document.getElementById("imageAlt").value = post.media?.alt || "";
}

/**
 * Fetches and displays the post data by calling onUpdatePost.
 *
 * @async
 * @returns {Promise<void>} - A promise that resolves when the post data is fetched and displayed.
 */
export async function fetchPostData() {
  const postId = getIDFromURL();
  await onUpdatePost(postId);
}

// Call this when the page loads to fetch and display the post data
fetchPostData();
