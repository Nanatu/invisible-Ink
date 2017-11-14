// This Javascript file connects to the Invisible Ink MongoDB using Mongoose.
//
// db name: stories
// collection: story
//
// Schema defined below

// Global constants for mongoose.
// npm install mongoose
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

//third-party mongoose library for easier auto incremental '_id'.
// npm install mongoose-auto-increment
const autoIncrement = require('mongoose-auto-increment');

// Connection URI for MongoDB connection.
mongoose.connect('mongodb://localhost:27017/stories');

// Simple check to see if connection was successful.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!')
});

// Third party instantiation for auto _id increment. Only needs declared once.
autoIncrement.initialize(db);

// Schema declaration for stories db.
//
//   _id: Number
//          - unique incremental id that will be automatically given by mongoose-auto-increment.
//            *doesn't need declared in schema.*
//   story_title: String
//   story_author: String
//   story_body: String (up to 16MB)
//   data_created: Date
//   tick_rate: Number
//   influence_rate: Number
//   next_event: Number (references the _id)
//   cycles: Number
//   likes: Number
//   views: Number


var storiesSchema = mongoose.Schema({
  // _id: Number, This is automatically instantatied and incremented by third-party tool.
  story_title: String,
  story_author: String,
  story_body: String,
  date_created: { type: Date, default: Date.now },
  tick_rate: Number,
  minor_tick_rate: Number,
  influence_rate: Number,
  next_event: Number,
  cycles: Number,
  likes: Number,
  views: Number
});

storiesSchema.plugin(autoIncrement.plugin, 'Story'); //LoC that increments _id field.

// Creation of model which is a class in which mongoose creates MongoDB Documents.
var Story = mongoose.model('Story', storiesSchema);
module.exports = Story;

// At this point we can start adding and pulling to and from the DB.



// Example Query For Entire Schema:
//
// var newStory = new Story({
//   story_title: <Insert Title Here>,
//   story_author: <Insert Author Here>,
//   story_body: <Insert Body Here>,
//   tick_rate: <Insert tick rate Here>,
//   influence_rate: <Insert influence rate Here>,
//   next_event: <Insert next event _id number Here>,
//   cycles: <Insert cycles Here>,
//   likes: <Insert likes Here>,
//   views: 0       // will be 0 on creation
// };
//
// Story..save(function(err) {
//   console.log('User saved successfully!');
//   if (err) throw err;
// });


// Example Find and Update query that will be used every single time a user views,
// likes, and rates degrades, body changes form degredation, etc.:
//
// Lets say for this example someone viewed the story. We need to create a small
// query with the updated views amount and then find the story it is related too
// and then update it.
//
// var viewsUpdate = { <_id of document> }; //Story.findbyId(req.params._id)
// Story.findOneAndUpdate(viewsUpdate, { views: <insert new views amount here> }, { 'new': false }, function (err, res) {} );
