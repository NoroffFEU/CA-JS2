import { getMyName, getNameFromURL } from "../../utilities/getInfo";
import { readPostsByUser } from "../../api/post/read";
import { readProfile } from "../../api/profile/read";
import { updateProfile } from "../../api/profile/update";
import { deletePost } from "../../api/post/delete";

/**
 * Render the user's profile on the page.
 * @param {Object} profileData - The data of the user's profile.
 * @param {boolean} isOwner - Flag indicating if the current user owns the profile.
 */
const renderProfilePage = (profileData, isOwner) => {
  const profileSection = document.getElementById("profile-info");
  const username = getMyName() || "Guest";

  const bio =
    profileData.bio && profileData.bio !== "string" ? profileData.bio : null;
  const bannerUrl =
    profileData.banner?.url && profileData.banner.url !== "string"
      ? profileData.banner.url
      : null;
  const avatarUrl =
    profileData.avatar?.url && profileData.avatar.url !== "string"
      ? profileData.avatar.url
      : null;

  if (bannerUrl) {
    profileSection.style.backgroundImage = `url(${bannerUrl})`;
    profileSection.style.backgroundSize = "cover";
    profileSection.style.backgroundPosition = "center";
  } else {
    profileSection.style.backgroundImage = "";
  }

  profileSection.innerHTML = `  
    ${isOwner ? `<p>Welcome back</p>` : ""}    
    <h2>${profileData.name || "Unknown User"}</h2>
    ${avatarUrl ? `<img src="${avatarUrl}" alt="Avatar" class="avatar">` : ""} 
    ${bio ? `<p>${bio}</p>` : ""}
  `;
};

/**
 * Render the user's posts on the page.
 * @param {Array} postsData - An array of post data objects.
 * @param {boolean} isOwner - Flag indicating if the current user owns the posts.
 */
const renderPostsPage = (postsData, isOwner) => {
  const userPostsSection = document.getElementById("user-posts");
  userPostsSection.innerHTML = "";

  const postsHeader = document.createElement("h2");
  postsHeader.textContent = "Posts";
  userPostsSection.appendChild(postsHeader);

  const fragment = document.createDocumentFragment();

  postsData.forEach((post) => {
    const postElement = document.createElement("div");
    const avatarUrl = post.author?.avatar?.url || "";

    postElement.innerHTML = `
      <div class="each-post" id="post-${post.id}">
        <div class="avatar-name-container">
          ${
            avatarUrl
              ? `<img src="${avatarUrl}" alt="Avatar" class="post-avatar">`
              : ""
          }
          ${
            post.author
              ? `<p><a href="/profile/?author=${post.author.name}">${post.author.name}</a></p>`
              : ""
          }
        </div>
        ${
          post.media
            ? `
          <a href="/post/?id=${post.id}">
            <img src="${post.media.url}" alt="${post.media.alt}">
          </a>
        `
            : ""
        }
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        ${
          isOwner
            ? `
          <div class="button-container">
            <button class="post-btn edit-btn" data-post-id="${post.id}">Edit</button>
            <button class="post-btn delete-btn" data-post-id="${post.id}">Delete</button>
          </div>
        `
            : ""
        }
      </div>
    `;

    fragment.appendChild(postElement);
  });

  userPostsSection.appendChild(fragment);

  userPostsSection.addEventListener("click", (event) => {
    const target = event.target;
    const postId = target.getAttribute("data-post-id");

    if (target.classList.contains("delete-btn")) {
      deletePost(postId);
    }

    if (target.classList.contains("edit-btn")) {
      window.location.href = `/post/edit/?id=${postId}`;
    }
  });
};

/**
 * Toggle the visibility of the profile update form and pre-fill it with the current profile data.
 * @param {Object} profileData - The data of the user's profile.
 */
const showUpdateForm = (profileData) => {
  const updateForm = document.getElementById("update-profile-form");

  if (updateForm.style.display === "block") {
    updateForm.style.display = "none";
  } else {
    document.getElementById("avatar-url").value = profileData.avatar?.url || "";
    document.getElementById("banner-url").value = profileData.banner?.url || "";
    document.getElementById("bio").value = profileData.bio || "";

    updateForm.style.display = "block";
  }

  const cancelBtn = document.getElementById("cancel-update-btn");
  cancelBtn.addEventListener("click", () => {
    updateForm.style.display = "none";
  });
};

/**
 * Handle the profile update form submission, update the profile on the server, and reload the page.
 * @param {Event} event - The form submission event.
 */
const handleProfileUpdate = async (event) => {
  event.preventDefault();

  const bio = document.getElementById("bio").value;
  const avatar = document.getElementById("avatar-url").value;
  const banner = document.getElementById("banner-url").value;

  try {
    await updateProfile(bio, { avatar, banner });
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      location.reload();
    }, 500);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

/**
 * Render the buttons for the profile owner (Create Post and Update Profile).
 * @param {boolean} isOwner - Flag indicating if the current user owns the profile.
 * @param {Object} profileData - The data of the user's profile.
 */
const renderOwnerButtons = (isOwner, profileData) => {
  const actionsSection = document.getElementById("actions-section");

  if (isOwner) {
    const createPostButton = document.createElement("button");
    createPostButton.id = "create-post-btn";
    createPostButton.textContent = "Create Post";
    createPostButton.addEventListener("click", () => {
      window.location.href = "/post/create/";
    });
    actionsSection.appendChild(createPostButton);

    const updateProfileButton = document.createElement("button");
    updateProfileButton.id = "update-profile-btn";
    updateProfileButton.textContent = "Update Profile";
    updateProfileButton.addEventListener("click", () => {
      showUpdateForm(profileData);
    });
    actionsSection.appendChild(updateProfileButton);

    document
      .getElementById("profile-update-form")
      .addEventListener("submit", handleProfileUpdate);
  }
};

/**
 * Handle the profile page logic, including fetching profile and posts, and rendering the UI.
 */
const handleProfilePage = async () => {
  try {
    const currentUser = getNameFromURL();
    const loggedInUser = getMyName();
    const isOwner = currentUser === loggedInUser;

    const [profileData, postsData] = await Promise.all([
      readProfile(currentUser),
      readPostsByUser(currentUser),
    ]);

    renderProfilePage(profileData, isOwner);
    renderPostsPage(postsData, isOwner);
    renderOwnerButtons(isOwner, profileData);
  } catch (error) {
    console.error("Error handling profile page:", error);
  }
};

handleProfilePage();
