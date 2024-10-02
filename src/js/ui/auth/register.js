import { API_AUTH_REGISTER } from "../../api/constants";

/**
 * Handles the user registration process.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 * @throws {Error} If the registration request fails.
 */
export async function onRegister(event) {
  event.preventDefault();
  const emailValue = document.querySelector("#email").value;
  const nameValue = document.querySelector("#name").value;
  const passwordValue = document.querySelector("#password").value;

  const registerPostData = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPostData),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();
        if (data.statusCode === 400 && data.errors && data.errors.length > 0) {
          window.alert(data.errors[0].message);
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } else {
      const data = await response.json();
      if (data?.data?.email === emailValue) {
        window.alert(`User: ${data.data.name} (${data.data.email}) created`);
      }
    }
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
}
