import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    "message": '',
    "error": true
  });
  
  const modelBlog =
  {   
    "title": "",
    "author": "",
    "url": "",
    "likes": 0
  };
  const [newBlog, setNewBlog] = useState(
    modelBlog
  );


  useEffect(() => {
    refreshBlogs(); 
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  }, [])


  const refreshBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );

    } catch (exception) {
      notify('Wrong credentials', true)
    }
  };

  const notify = (message, error) =>{
    setErrorMessage({message, error})
    setTimeout(() => {
      setErrorMessage('')
    }, 5000);
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  const loginForm = () => {
    return <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
    </form>
  };

  const showNotification = (notification) => {
    return <Notification notification={notification}/>;
  }

  const blogList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    );
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      await blogService.create(newBlog);

      refreshBlogs();
      notify('New blog ' + newBlog.title + ' created!', false);
      setNewBlog(modelBlog);



    } catch (exception) {
      notify(exception.Message, true);
    }
  };


  const blogForm = () => {


    return <form onSubmit={addBlog}>
      <div>
        title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, 'title': target.value})}
          />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => setNewBlog({ ...newBlog, 'author': target.value})}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) => setNewBlog({ ...newBlog, 'url': target.value})}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  }

  return (
    <div>
      <h2>blogs</h2>

      {errorMessage.message !== '' && showNotification(errorMessage)}

      {user === null ?
        loginForm() :
        <div>
          
          <p>
            <span>{user.name} logged-in</span>
            <button onClick = {handleLogout}>logout</button>
          </p>
          
          
          {blogList()}
          {blogForm()}
        </div>
      } 

    </div>
  );
}

export default App