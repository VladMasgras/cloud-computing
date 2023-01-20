import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    // Fetch all posts from the server
    axios.get('http://localhost:3001/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // Send a POST request to the server to create a new post
    axios.post('http://localhost:3001/posts', { title, content })
      .then(res => {
        setTitle('');
        setContent('');
        setPosts([...posts, res.data]);
      })
      .catch(err => console.log(err));
  }

  function handleCommentSubmit(e) {
    e.preventDefault();

    // Send a POST request to the server to create a new comment
    axios.post('http://localhost:3000/comments', { postId, comment })
      .then(res => {
        setComment('');
        setComments([...comments, res.data]);
      })
      .catch(err => console.log(err));
  }

  function handleCommentFetch(postId) {
    setPostId(postId);
    // Fetch all comments for a specific post
    axios.get(`http://localhost:3000/comments?postId=${postId}`)
      .then(res => setComments(res.data))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleCommentFetch(post._id)}>Show Comments</button>
            <ul>
              {comments.map(comment => (
                <li key={comment._id}>{comment.content}</li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
              <label>
                Add Comment:
                <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
              </label>
              <button type="submit">Add Comment</button>
            </form>
          </li>
        ))}
      </ul>
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
         
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
</label>
<br />
<label>
Content:
<textarea value={content} onChange={e => setContent(e.target.value)} />
</label>
<br />
<button type="submit">Create</button>
</form>
</div>
);
}

export default App;