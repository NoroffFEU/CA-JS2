/**
 * Checks if the user is authenticated before allowing access to a page.
 *
 * If the user is not authenticated, redirects them to the login page.
 *
 * @returns {void}
 */
export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
