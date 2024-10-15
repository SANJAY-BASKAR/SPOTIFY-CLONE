// Spotify Authentication Setup

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "117e1520ab9c4d6da1d5d1a3f9065e27"; // Your Spotify app client ID
const redirectUri = "https://spotify-clone-app-sss.firebaseapp.com/"; // Your redirect URI
const scopes = [ // Scopes for the permissions you need
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

// Function to extract token from URL
export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const parts = item.split("="); // Split into key-value pair
      initial[parts[0]] = decodeURIComponent(parts[1]); // Decode and add to the object
      return initial;
    }, {}); // Start with an empty object
};

// Login URL for Spotify authorization
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20" // Use URL encoding for spaces
)}&response_type=token&show_dialog=true`;
