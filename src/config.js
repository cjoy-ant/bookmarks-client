const NODE_ENV = process.env.NODE_ENV || "development"
const REMOTE_API_URL = NODE_ENV === 'production' ? window.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_REMOTE_API_URL || "https://hidden-river-23219.herokuapp.com/api/bookmarks"
const API_KEY = NODE_ENV === 'production' ? window.env.REACT_APP_API_KEY : process.env.REACT_APP_API_KEY

export default {
  REMOTE_API_URL,
  API_KEY
}