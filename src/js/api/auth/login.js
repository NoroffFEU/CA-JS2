import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

/**
 * Logs in a user with the provided email and password.
 *
 * @async
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves with the login response data, or an error object if the login fails.
 * @throws {Error} If the login request fails.
 */

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = `Login failed ${response.statusText} (${response.status})`;
      alert(`Error: ${errorText}. Please try again.`);
      throw new Error(errorText);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: error.message };
  }
}
