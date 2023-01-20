const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/comments', { useNewUrlParser: true });

const commentSchema = new mongoose.Schema({
  postId: String,
  content: String
});
const Comment = mongoose.model('Comment', commentSchema);

const app = express();
app.use(express.json());
app.use(cors());

// Create a new comment
app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).send(comment);
});

// Get all comments for a specific post
app.get('/comments', async(req, res) => {
    const comments = await Comment.find({ postId: req.query.postId });
    res.send(comments);
    });
    
// Get a specific comment
app.get('/comments/:id', async (req, res) => {
const comment = await Comment.findById(req.params.id);
if (!comment) return res.status(404).send('Comment not found');
res.send(comment);
});

// Update a comment
app.put('/comments/:id', async (req, res) => {
const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!comment) return res.status(404).send('Comment not found');
res.send(comment);
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
const comment = await Comment.findByIdAndDelete(req.params.id);
if (!comment) return res.status(404).send('Comment not found');
res.send(comment);
});

app.listen(3000, () => {
console.log('Listening on port 3000...');
});
