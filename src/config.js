export default {
  API_ENDPOINT: `https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks`,
  API_KEY: process.env.REACT_APP_API_KEY,
  DB_URL:
  process.env.DB_URL || "postgresql://dunder_mifflin@localhost/bookmarks",
}
