// This Javascript file connects to the Invisible Ink MongoDB using Mongoose.
// Mainly a driver and instantiation class.
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
<<<<<<< HEAD
mongoose.connect('mongodb://localhost/stories');
=======
mongoose.connect('mongodb://localhost:27017/stories');
>>>>>>> 0fb7a51ff6545d8b66f22e800afc1f7bc5d4541b

// Simple check to see if connection was successful.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!')
});

// Third party instantiation for auto _id increment. Only needs declared once.
autoIncrement.initialize(db);

var stories = mongoose.Schema({
  // _id: Number, This is automatically instantatied and incremented by third-party tool.
  story_title: String,
  story_author: String,
  story_body: String,
<<<<<<< HEAD
  date_created: { type: Date, default: Date.now }, // timestamp
=======
  date_created: { type: Date, default: Date.now },
>>>>>>> 0fb7a51ff6545d8b66f22e800afc1f7bc5d4541b
  tick_rate: Number,
  influence_rate: Number,
  next_event: Number,
  cycles: Number,
  likes: Number,
  views: Number
});

stories.plugin(autoIncrement.plugin, 'Story'); //LoC that increments _id field.

// Creation of model which is a class in which mongoose creates MongoDB Documents.
var Story = mongoose.model('Story', stories);
module.exports = Story;

// INSERT query for a new story. (CONSTRUCTOR)
function createStory(String title, String author, Number tickRate, Number infRate){
  var newStory = new Story({
     story_title: title,
     story_author: author,
     story_body: getBody(),
     tick_rate: tickRate,
     influence_rate: infRate,
     next_event: getNextEvent(),
     cycles: 0,
     likes: 0,
     views: 0
   };

   newStory.save(function (err) {
     console.log('Story saved successfully!');
     if (err) return handleError(err);
   });
}


// GETTERS
function getTitle(){
  Story.findOne({ 'story_title': this.stories[0] }, function (err, title) {
    if (err) return handleError(err);
    console.log('%s found!', title)
  });
};

function getAuthor(){
  Story.findOne({ 'story_author': this.stories[1] }, function (err, author) {
    if (err) return handleError(err);
    console.log('%s found!', author)
  });
};

function getBody(){
  Story.findOne({ 'story_body': this.stories[2] }, function (err, body) {
    if (err) return handleError(err);
    console.log('%s found!', body)
  });
};

function getDateCreated(){
  Story.findOne({ 'date_created': this.stories[3] }, function (err, date) {
    if (err) return handleError(err);
    console.log('%s found!', date)
  });
};

function getTickRate(){
  Story.findOne({ 'tick_rate': this.stories[4] }, function (err, tick) {
    if (err) return handleError(err);
    console.log('%s found!', tick)
  });
};

function getInfluenceRate(){
  Story.findOne({ 'influence_rate': this.stories[5] }, function (err, inf) {
    if (err) return handleError(err);
    console.log('%s found!', inf)
  });
};

function getNextEvent(){
  Story.findOne({ 'next_event': this.stories[6] }, function (err, nexte) {
    if (err) return handleError(err);
    console.log('%s found!', nexte)
  });
};

function getCycles(){
  Story.findOne({ 'cycles': this.stories[7] }, function (err, cycle) {
    if (err) return handleError(err);
    console.log('%s found!', cycle)
  });
};

function getLikes(){
  Story.findOne({ 'likes': this.stories[8] }, function (err, like) {
    if (err) return handleError(err);
    console.log('%s found!', like)
  });
};

function getViews(){
  Story.findOne({ 'views': this.stories[9] }, function (err, view) {
    if (err) return handleError(err);
    console.log('%s found!', view)
  });
};





// Unique getter that is used as a find function for the current story.
// This uses the author and title to find the current document.
function query(){
  var query = { 'story_author': author, 'story_title': title };
  // then update according to the current document setter.
}


// Find and Update Queries (SETTERS)
function setViews(Number title){
  Story.update(query(), { $set: { story_title: title}}, callback);
};

function setViews(Number author){
  Story.update(query(), { $set: { story_author: author}}, callback);
};

function setViews(Number body){
  Story.update(query(), { $set: { story_body: body}}, callback);
};

function setViews(Number dateCreated){
  Story.update(query(), { $set: { date_created: dateCreated}}, callback);
};

function setViews(Number ticks){
  Story.update(query(), { $set: { tick_rate: ticks}}, callback);
};

function setViews(Number inf_rate){
  Story.update(query(), { $set: { influence_rate: inf_rate}}, callback);
};

function setViews(Number next_e){
  Story.update(query(), { $set: { next_event: next_e}}, callback);
};

function setViews(Number cyc){
  Story.update(query(), { $set: { cycles: cyc}}, callback);
};

function setViews(Number like){
  Story.update(query(), { $set: { likes: like}}, callback);
};

function setViews(Number v){
  Story.update(query(), { $set: { views: v}}, callback);
};


// Example Find and Update query that will be used every single time a user views,
// likes, and rates degrades, body changes form degredation, etc.:
//
// Lets say for this example someone viewed the story. We need to create a small
// query with the updated views amount and then find the story it is related too
// and then update it.
//
// var viewsUpdate = { <_id of document> }; //Story.findbyId(req.params._id)
// Story.findOneAndUpdate(viewsUpdate, { views: <insert new views amount here> }, { 'new': false }, function (err, res) {} );
