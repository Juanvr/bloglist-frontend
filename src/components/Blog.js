import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,

  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>show</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button onClick={() => likeBlog(blog)}>like!</button>
        </div>
        <button onClick={toggleVisibility}>hide</button>
        <button onClick={() => deleteBlog(blog)}>delete</button>
      </div>
    </div>
  )}

export default Blog
