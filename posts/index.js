const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/posts', { useNewUrlParser: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Post = mongoose.model('Post', postSchema);

const app = express();
app.use(express.json());
app.use(cors());

// Create a new post
app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  console.log(post)
  await post.save();
  res.status(201).send(post);
});

// Get all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// Get a specific post
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.send(post);
});

// Update a post
app.put('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).send('Post not found');
  res.send(post);
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.send(post);
});

app.listen(3001, () => {
  console.log('Listening on port 3001...');
});
