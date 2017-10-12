const Todo = require ('./../models/Todo');
const {ObjectID} = require ('mongodb');

async function newTodo (req, res) {
  const {body} = req;
  body._creator = req.user._id;
  try {
    const newTodo = new Todo (body);
    const todo = await newTodo.save ();
    res.send (todo);
  } catch (err) {
    res.status (400).send (err);
  }
}

async function bringTodo (req, res) {
  const {id} = req.params;

  if (!ObjectID.isValid (id)) {
    return res.status (406).send ({
      error: 'incorrect id.',
    });
  }
  try {
    const todo = await Todo.findOne ({
      _id: id,
      _creator: req.user._id,
    });

    if (!todo) {
      return res.status (404).send ({
        error: 'todo not found',
      });
    }
    res.send (todo);
  } catch (err) {
    res.status (400).send ();
  }
}

async function bringAllTodo (req, res) {
  const {_id} = req.user;

  try {
    const allTodos = await Todo.find ({
      _creator: _id,
    });

    res.send (allTodos);
  } catch (err) {
    res.status (400).send ();
  }
}

async function removeTodo (req, res) {
  const {id} = req.params;

  if (!ObjectID.isValid (id)) {
    return res.status (406).send ({
      error: 'incorrect id.',
    });
  }

  try {
    const deletedTodo = await Todo.findOneAndRemove ({
      _id: id,
      _creator: req.user._id,
    });

    if (!deletedTodo) {
      return res.status (404).send ({
        error: 'todo not found',
      });
    }

    res.send (deletedTodo);
  } catch (err) {
    res.status (400).send ();
  }
}

async function updateTodo (req, res) {
  const {params: {id}, body} = req;

  if (!ObjectID.isValid (id)) {
    return res.status (406).send ({
      error: 'incorrect id.',
    });
  }

  try {
    const todo = await Todo.findOneAndUpdate (
      {
        _id: id,
        _creator: req.user._id,
      },
      {
        $set: body,
      },
      {
        $new: true,
      }
    );
    if (!todo) {
      return res.status (404).send ({
        error: 'todo not found',
      });
    }
    res.send (todo);
  } catch (err) {
    res.status (400).send ();
  }
}

module.exports = {
  newTodo,
  bringTodo,
  bringAllTodo,
  removeTodo,
  updateTodo,
};
