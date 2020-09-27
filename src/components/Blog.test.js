import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    'author': 'Autor Prueba',
    'id': '5f5c976e491f2f2cacc97024',
    'likes': 1,
    'title': 'Blog de Prueba',
    'url': 'Url de prueba',
    'user': '5f533dafcbfa8819985e4e86'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Blog de Prueba'
  )
})

test('clicking the button shows url', () => {
  const blog = {
    'author': 'Autor Prueba',
    'id': '5f5c976e491f2f2cacc97024',
    'likes': 1,
    'title': 'Blog de Prueba',
    'url': 'Url de prueba',
    'user': '5f533dafcbfa8819985e4e86'
  }

  //   const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )


  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Url de prueba'
  )
})

test('clicking twice calls event handler twice', () => {
  const blog = {
    'author': 'Autor Prueba',
    'id': '5f5c976e491f2f2cacc97024',
    'likes': 1,
    'title': 'Blog de Prueba',
    'url': 'Url de prueba',
    'user': '5f533dafcbfa8819985e4e86'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog}  likeBlog={mockHandler} />
  )


  const button = component.getByText('like!')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})