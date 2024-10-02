/**
 * Retrieves the access token from local storage.
 *
 * @async
 * @returns {?string} The access token, or null if it's not found.
 */
export async function getKey() {
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    console.error("Access token not found in localStorage.");
    return null;
  }
  return accessToken;
}
