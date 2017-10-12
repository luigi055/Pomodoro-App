const Activity = require ('./../models/ActivityInventory');
const {ObjectID} = require ('mongodb');

async function newActivity (req, res) {
  const {body} = req;
  body._creator = req.user._id;
  try {
    const newActivity = new Activity (body);
    const activity = await newActivity.save ();
    res.send (activity);
  } catch (err) {
    res.status (400).send (err);
  }
}

async function bringActivity (req, res) {
  const {id} = req.params;

  if (!ObjectID.isValid (id)) {
    return res.status (406).send ({
      error: 'incorrect id.',
    });
  }
  try {
    const activity = await Activity.findOne ({
      _id: id,
      _creator: req.user._id,
    });

    if (!activity) {
      return res.status (404).send ({
        error: 'Activity not found',
      });
    }
    res.send (activity);
  } catch (err) {
    res.status (400).send ();
  }
}

async function bringAllActivities (req, res) {
  const {_id} = req.user;

  try {
    const allActivities = await Activity.find ({
      _creator: _id,
    });

    res.send (allActivities);
  } catch (err) {
    res.status (400).send ();
  }
}

async function removeActivity (req, res) {
  const {id} = req.params;

  if (!ObjectID.isValid (id)) {
    return res.status (406).send ({
      error: 'incorrect id.',
    });
  }

  try {
    const deletedActivity = await Activity.findOneAndRemove ({
      _id: id,
      _creator: req.user._id,
    });

    if (!deletedActivity) {
      return res.status (404).send ({
        error: 'activity not found',
      });
    }

    res.send (deletedActivity);
  } catch (err) {
    res.status (400).send ();
  }
}

async function updateActivity (req, res) {
  const {params: {id}, body, user} = req;

  if (!ObjectID.isValid (id)) {
    return res.status (406).send ({
      error: 'incorrect id.',
    });
  }

  try {
    const activity = await Activity.findOneAndUpdate (
      {
        _id: id,
        _creator: user._id,
      },
      {
        $set: body,
      },
      {
        $new: true,
      }
    );
    if (!activity) {
      return res.status (404).send ({
        error: 'activity not found',
      });
    }
    res.send (activity);
  } catch (err) {
    res.status (400).send ();
  }
}

module.exports = {
  newActivity,
  bringActivity,
  bringAllActivities,
  removeActivity,
  updateActivity,
};
