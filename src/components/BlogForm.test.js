import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('form calls the event handler it received as props with the right details', () => {
  const modelBlog =
  {
    'title': '',
    'author': '',
    'url': '',
    'likes': 0
  }

  const mockHandler = jest.fn()


  const component = render(
    <BlogForm newBlog= {modelBlog} addBlog={mockHandler} setNewBlog={() => {}}/>
  )

  const form = component.container.querySelector('form')
  fireEvent.submit(form)
  // form.simulate('submit', { preventDefault: () => {} })

  expect(mockHandler.mock.calls).toHaveLength(1)

  // expect(mockHandler.mock.calls[0][0]).to
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  expect(author.value).toBe(modelBlog.author)
  expect(title.value).toBe(modelBlog.title)
  expect(url.value).toBe(modelBlog.url)
})
