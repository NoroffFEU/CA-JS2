//Retrieve userID from local storage
export function getMyName() {
  return localStorage.getItem("userID");
}

//Retrieve Token from local storage
export function getMyToken() {
  return localStorage.getItem("token");
}

//Retrieve name of author from URL
export function getNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("author");
}

//Retrieve post from ID from URL
export function getIDFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Change to 'id' if your URL is using 'id'
}
