const mongoose = require('mongoose');
const Events = require('../../models/event');

exports.list_all_events = function(req, res, next) {
  Events.find({}, function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.create_a_event = function(req, res, next) {
  req.body['_id']= new mongoose.Types.ObjectId();
  let new_event = new Events(req.body);
  new_event.save().then(result => {
    res.status(200).json({
      message: "Success"
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.errmsg
    })
  });
};


exports.read_a_event = function(req, res, next) {
  Events.findById(req.params.eventId, function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.update_a_event = function(req, res, next) {
  Events.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}, function(err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.delete_a_event = function(req, res) {
  Events.remove({
    _id: req.params.eventId
  }, function(err, event) {
    if (err)
      res.send(err);
    res.json({ message: 'Event successfully deleted' });
  });
};
