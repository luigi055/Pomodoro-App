const mongoose = require ('mongoose');

const activitySchema = new mongoose.Schema ({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  expired: {
    type: Boolean,
    defaul: false,
  },
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
});

const ActivityInventory = mongoose.model ('Activity', activitySchema);

module.exports = ActivityInventory;
