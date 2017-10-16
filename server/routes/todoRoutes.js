const auth = require ('./../middlewares/auth');
const {
  newTodo,
  bringTodo,
  bringAllTodo,
  removeTodo,
  updateTodo,
} = require ('./../controllers/todoController');

module.exports = app => {
  app.post ('/api/todos', auth, newTodo);
  app.get ('/api/todos/:id', auth, bringTodo);
  app.get ('/api/todos', auth, bringAllTodo);
  app.delete ('/api/todos/:id', auth, removeTodo);
  app.patch ('/api/todos/:id', auth, updateTodo);
};
