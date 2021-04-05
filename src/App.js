import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import UpdateBookmark from './UpdateBookmark/UpdateBookmark';
import BookmarksContext from './BookmarksContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

console.log(process.env.REMOTE_API_URL)

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmark_id => {
    const newBookmarks = this.state.bookmarks.filter(bookmark =>
      bookmark.id !== bookmark_id
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  updateBookmark = updatedBookmark => {
    this.setState({
      bookmarks: this.state.bookmarks.map(bookmark => 
        (bookmark.id !== updatedBookmark.id) ? bookmark : updatedBookmark
      )
    })
  }

  componentDidMount() {
    fetch(config.REMOTE_API_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route
              exact
              path='/update-bookmark/:id'
              component={UpdateBookmark}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
