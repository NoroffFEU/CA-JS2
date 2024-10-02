/**
 * Handles the edit post page functionality, including authentication,
 * form population with existing post data, form submission, and redirection.
 *
 * @async
 * @returns {void}
 * @throws {Error} If there is an issue fetching post data or submitting the form.
 */

import { submitEditForm } from "../../api/post/update";
import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";
import { getMyName } from "../../utilities/getInfo";

authGuard();

/**
 * Attaches the submit event listener to the edit form.
 */
const form = document.forms.editPost;
form.addEventListener("submit", submitEditForm);

/**
 * Redirects the user to their profile page when the cancel button is clicked.
 *
 * @param {Event} event - The cancel button click event.
 * @returns {void}
 */
const cancelButton = document.getElementById("cancel-edit");
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = `/profile/?author=${getMyName()}`;
});
