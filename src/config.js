const REMOTE_API_URL = process.env.VERCEL_ENV === 'production' ? process.env.REMOTE_API_URL : process.env.REACT_APP_REMOTE_API_URL || "https://hidden-river-23219.herokuapp.com/api/bookmarks"
const API_KEY = process.env.VERCEL_ENV === 'production' ? process.env.API_KEY : process.env.REACT_APP_API_KEY

export default {
  REMOTE_API_URL,
  API_KEY
}