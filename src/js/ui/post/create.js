import { createPost } from "../../api/post/create";

/**
 * Handles the create post form submission event.
 *
 * @async
 * @param {Event} event - The create post form submission event.
 * @returns {void}
 * @throws {Error} If the post creation fails.
 */
export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const tags = form.tags.value;
  const media = form.image.value;

  if (!title || !body) {
    alert("Please enter a title and body for your post.");
    return;
  }

  try {
    await createPost({ title, body, tags, media });
  } catch (error) {
    alert("Error creating post: " + error.message);
  }
}
