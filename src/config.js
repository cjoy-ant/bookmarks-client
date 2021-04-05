import env  from 'react-dotenv'

const REMOTE_API_URL = env.NODE_ENV === 'production' ? env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_REMOTE_API_URL || "https://hidden-river-23219.herokuapp.com/api/bookmarks"
const API_KEY = env.NODE_ENV === 'production' ? env.REACT_APP_API_KEY : process.env.REACT_APP_API_KEY

export default {
  REMOTE_API_URL,
  API_KEY
}