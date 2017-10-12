const auth = require ('./../middlewares/auth');
const {
  newActivity,
  bringActivity,
  bringAllActivities,
  removeActivity,
  updateActivity,
} = require ('./../controllers/activityController');

module.exports = app => {
  app.post ('/api/activities', auth, newActivity);
  app.get ('/api/activities/:id', auth, bringActivity);
  app.get ('/api/activities', auth, bringAllActivities);
  app.delete ('/api/activities/:id', auth, removeActivity);
  app.patch ('/api/activities/:id', auth, updateActivity);
};
