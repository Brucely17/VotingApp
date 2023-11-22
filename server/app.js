
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Vote = require('./database/models/Vote');
// const db = require('./db');

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// db.getDatabase();

// // Create a new vote
// app.post('/api/vote', async (req, res) => {
//   try {
//     const { question, options } = req.body;
//     const newVote = new Vote({ question, options });
//     await newVote.save();
//     res.status(201).json({ success: true, voteId: newVote._id });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Get vote details by ID
// app.get('/api/vote/:id', async (req, res) => {
//   try {
//     const vote = await Vote.findById(req.params.id);
//     res.status(200).json({ success: true, vote });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
// app.post('/api/vote/:id/vote', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { option } = req.body;
//     console.log("from server:",id,option);

//     const vote = await Vote.findById(id);
//     if (!vote) {
//       return res.status(404).json({ success: false, error: 'Vote not found' });
//     }

//     const selectedOption = vote.options.find((opt) => opt.option === option);
//     if (!selectedOption) {
//       return res.status(400).json({ success: false, error: 'Invalid option' });
//     }

//     selectedOption.count += 1;
//     await vote.save();

//     res.json({ success: true, vote });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Server listening port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Poll = require('./database/models/Poll'); // Update the import
const db=require('./db');
// Initialize Express app
const app = express();
db.getDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a new poll
app.post('/api/poll', async (req, res) => {
  try {
    const { questions } = req.body;
    const newPoll = new Poll({ questions });
    await newPoll.save();
    res.status(201).json({ success: true, pollId: newPoll._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get poll details by ID
app.get('/api/poll/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    res.status(200).json({ success: true, poll });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Vote for a specific option in a poll
app.post('/api/poll/:pollId/question/:questionId/vote', async (req, res) => {
  try {
    const { pollId, questionId } = req.params;
    const { option } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ success: false, error: 'Poll not found' });
    }

    const question = poll.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }

    const selectedOption = question.options.find((opt) => opt.option === option);
    if (!selectedOption) {
      return res.status(400).json({ success: false, error: 'Invalid option' });
    }

    selectedOption.count += 1;
    await poll.save();

    res.json({ success: true, poll });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
