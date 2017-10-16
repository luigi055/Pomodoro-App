const mongoose = require ('mongoose');

const todoSchema = new mongoose.Schema ({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  stimate: Number,
  real: Number,
  newStimate: Number,
  description: {
    type: String,
    trim: true,
    require: true,
  },
  type: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Number,
    default: new Date ().getTime (),
  },
  interrupted: Number,
});

const Todo = mongoose.model ('Todo', todoSchema);

module.exports = Todo;
