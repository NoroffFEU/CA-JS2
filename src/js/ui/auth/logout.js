/**
 * Handles the logout functionality.
 *
 * @returns {void}
 */
export function onLogout() {
  localStorage.clear();

  window.location.href = "/auth/login/";
}
