

const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
});

const pollSchema = new mongoose.Schema({
  questions: [questionSchema],
});

const Poll = mongoose.model('PollVoteSchema', pollSchema);

module.exports = Poll;
