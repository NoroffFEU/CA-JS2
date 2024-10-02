import { onLogout } from "../auth/logout";
/**
 * Sets up the logout button event listener.
 *
 * @returns {void}
 */
export function setLogoutListener() {
  const logoutButton = document.getElementById("logout-btn");
  logoutButton.addEventListener("click", onLogout);
}
