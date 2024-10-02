import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";
import { getKey } from "../auth/key";

/**
 * Creates a new social post on the API.
 *
 * This function takes in the post data, sets up the API request headers,
 * constructs the post data object, and sends a POST request to the API endpoint.
 * If the response is successful, it alerts the user and redirects them to the homepage.
 * If the response is not successful, it throws an error with a message indicating
 * that there was an error creating the post.
 *
 * @param {string} title - The title of the post.
 * @param {string} body - The body of the post.
 * @param {string} tags - The tags for the post.
 * @param {string} media - The media URL for the post.
 * @param {string} altMedia - The alt text for the media.
 * @returns {void}
 */

export async function createPost({ title, body, tags, media, altMedia }) {
  const apiUrl = API_SOCIAL_POSTS;
  const accessToken = await getKey();
  const apiKeyHeader = headers();

  const postHeaders = new Headers({
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  });

  const [apiKey, apiValue] = apiKeyHeader.entries().next().value;
  postHeaders.append(apiKey, apiValue);

  const postData = {
    title,
    body,
    tags: tags ? [tags] : [],
  };

  if (media) {
    postData.media = {
      url: media,
      alt: altMedia || "Image alt text",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: postHeaders,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      await response.json();
      window.alert("Post created successfully!");
      window.location.href = "/";
    } else {
      throw new Error(`Error creating post: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
}
