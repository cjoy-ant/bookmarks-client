import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookmarksContext from '../BookmarksContext'
import config from '../config'
import './UpdateBookmark.css'

class UpdateBookmark extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = BookmarksContext;

  state = {
    error: null,
    id: '',
    title: '',
    url: '',
    rating: 1,
    description: ''
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleChangeUrl = e => {
    this.setState({ url: e.target.value })
  }

  handleChangeRating = e => {
    this.setState({ rating: e.target.value })
  }

  handleChangeDescription = e => {
    this.setState({ description: e.target.value })
  }

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      title: newFields.title || '',
      url: newFields.url || '', 
      description: newFields.description || '',
      rating: newFields.rating || ''
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = e => {
    e.preventDefault()
    const { bookmark_id } = this.props.match.params
    const { id, title, url, description, rating } = this.state
    const newBookmark = { id, title, url, description, rating }

    fetch(config.LOCAL_API_URL + `/${bookmark_id}`, {
      method: 'PATCH',
      body: JSON.stringify(newBookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then((data) => {
        this.resetFields(newBookmark)
        this.context.updateBookmark(newBookmark)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <section className='UpdateBookmark'>
        <h2>Update a bookmark</h2>
        <form
          className='UpdateBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='UpdateBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              onChange={this.handleChangeTitle}
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              onChange={this.handleChangeUrl}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              onChange={this.handleChangeDescription}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              min='1'
              max='5'
              onChange={this.handleChangeRating}
            />
          </div>
          <div className='UpdateBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default UpdateBookmark