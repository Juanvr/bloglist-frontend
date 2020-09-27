import React from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ addBlog, newBlog, setNewBlog }) => {
  return <form onSubmit={addBlog}>
    <div>
      title
      <input
        id = "title"
        type="text"
        value={newBlog.title}
        name="Title"
        onChange={({ target }) => setNewBlog({ ...newBlog, 'title': target.value })}
      />
    </div>
    <div>
      author
      <input
        id = "author"
        type="text"
        value={newBlog.author}
        name="Author"
        onChange={({ target }) => setNewBlog({ ...newBlog, 'author': target.value })}
      />
    </div>
    <div>
      url
      <input
        id = "url"
        type="text"
        value={newBlog.url}
        name="Url"
        onChange={({ target }) => setNewBlog({ ...newBlog, 'url': target.value })}
      />
    </div>
    <button id= "save" type="submit">save</button>
  </form>
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setNewBlog: PropTypes.func.isRequired,
  newBlog: PropTypes.object.isRequired,
}

export default BlogForm