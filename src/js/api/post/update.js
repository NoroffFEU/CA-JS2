import { getIDFromURL } from "../../utilities/getInfo";
import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants";
import { getMyToken } from "../../utilities/getInfo";
import { headers } from "../../api/headers";
import { getMyName } from "../../utilities/getInfo";

const postId = getIDFromURL();

/**
 * Handles form submission and sends updated post data to the API.
 * After a successful update, redirects the user to their profile page.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the form is successfully submitted and the user is redirected.
 * @throws {Error} - Throws an error if the update request fails.
 */
export async function submitEditForm(event) {
  event.preventDefault();

  const token = await getMyToken();

  const updatedPostData = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
    tags: document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim()),
    media: {
      url: document.getElementById("image").value,
      alt: document.getElementById("imageAlt").value,
    },
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(updatedPostData),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    await response.json();
    window.location.replace(`/profile/?author=${getMyName()}`);
  } catch (error) {
    throw new Error("Error updating post: " + error.message);
  }
}
