import { updateProfile } from "../../api/profile/update";

/**
 * Handles live profile updates.
 * Submits the profile form data and updates the profile section on the page.
 *
 * @param {Event} event - The form submission event.
 */
export async function onUpdateProfile(event) {
  event.preventDefault();

  const form = event.target;
  const bio = form.bio.value;
  const banner = form.banner.value;
  const avatar = form.avatar.value;

  try {
    const updatedProfile = await updateProfile(bio, { avatar, banner });
    renderProfilePage(updatedProfile, true);
    document.getElementById("update-profile-form").style.display = "none";
  } catch (error) {
    // Handle error
  }
}

/**
 * Displays the profile update form and attaches cancel button functionality.
 */
export function showUpdateForm() {
  const updateForm = document.getElementById("update-profile-form");
  updateForm.style.display = "block";

  const cancelBtn = document.getElementById("cancel-update-btn");
  cancelBtn.addEventListener("click", () => {
    updateForm.style.display = "none";
  });
}
