export default {
  API_ENDPOINT: `https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks`,
  LOCAL_API_URL: process.env.LOCAL_API_URL || "http://localhost:8000/api/bookmarks",
  REMOTE_API_URL: process.env.REMOTE_API_URL || "https://hidden-river-23219.herokuapp.com/api/bookmarks",
  API_KEY: process.env.REACT_APP_API_KEY,
}