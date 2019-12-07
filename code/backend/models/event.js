const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ad_id: {
    type: String,
    required: true
  },
  user_fingerprint: {
    type: String,
    required: true
  },
  event_name : {
    type : String,
    require : true
  },
  timestamp : {
    type: Date,
    default: Date.now
  }
  // status: {
  //   type: [{
  //     type: String,
  //     enum: ['pending', 'ongoing', 'completed']
  //   }],
  //   default: ['pending']
  // }
});

module.exports = mongoose.model('Events', eventSchema);