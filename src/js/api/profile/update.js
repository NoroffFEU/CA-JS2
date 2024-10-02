import { getKey } from "../auth/key";
import { getMyName } from "../../utilities/getInfo.js";
import { API_KEY } from "../../api/constants";
import { API_SOCIAL_PROFILES } from "../constants";

/**
 * Updates the user profile with the provided bio, avatar, and banner information.
 *
 * @param {string} bio - The user's bio to be updated.
 * @param {Object} param1 - An object containing avatar and banner URLs.
 * @param {string} param1.avatar - The URL of the user's avatar.
 * @param {string} param1.banner - The URL of the user's banner.
 * @returns {Promise<Object>} - The updated profile data.
 * @throws {Error} - Throws an error if the update fails.
 */
export async function updateProfile(bio, { avatar, banner }) {
  const myHeaders = new Headers();
  myHeaders.append("X-Noroff-API-Key", API_KEY);

  const token = await getKey();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const oldData = {
    bio: bio,
    banner: {
      url: banner,
      alt: "banner alt",
    },
    avatar: {
      url: avatar,
      alt: "avatar alt",
    },
  };

  const infoOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(oldData),
    redirect: "follow",
  };

  const username = getMyName();
  const url = `${API_SOCIAL_PROFILES}/${username}`;

  try {
    const response = await fetch(url, infoOptions);
    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
