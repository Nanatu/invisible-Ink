// This Javascript file connects to the Invisible Ink MongoDB using Mongoose.
// Mainly a driver and instantiation class.
//
// db name: stories
// collection: story
//
// Schema defined below

// Global constants for mongoose.
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

//third-party mongoose library for easier auto incremental '_id'.
const autoIncrement = require('mongoose-auto-increment');

// Connection URI for MongoDB connection.
mongoose.connect('mongodb://localhost/stories');

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
  story_type: String,
  date_created: { type: Date, default: Date.now }, // timestamp
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
function createStory(){
  var newStory = new Story({
     story_title: "",
     story_author: "",
     story_body: "",
	   story_type: "",
     tick_rate: 0,
     influence_rate: 0,
     next_event: 0,
     cycles: 0,
     likes: 0,
     views: 0
   });

   newStory.save(function (err) {
     console.log('Story saved successfully!');
     if (err) return handleError(err);
   });
}


// GETTERS FOR GROUPS
function getStories(type){
	if(type == "all") {
		return Story.find({}, function (err, id) {
			if (err) return handleError(err);
			return id;
		});
	}
	else {
		Story.find({story_type: type}, function (err, id) {
			if (err) return handleError(err);
			return id;
		});
	}
};


// GETTERS FOR INDIVIDUAL STORIES
function getID(id){
	Story.findById(id, function (err, id) {
    if (err) return handleError(err);
    return id;
  });
};

//function getTitle(){
  //Story.findOne({ 'story_title': this.stories[0] }, function (err, title) {
    //if (err) return handleError(err);
    //console.log('%s found!', title)
  //});
//};

function getTitle(id){
  Story.findById(id, function (err, title) {
    if (err) return handleError(err);
    return Story.story_title
  });
};

function getAuthor(id){
  Story.findById(id, function (err, author) {
    if (err) return handleError(err);
    return Story.story_author;
  });
};

function getBody(id){
  Story.findById(id, function (err, body) {
    if (err) return handleError(err);
    return Story.story_body;
  });
};

function getType(id){
  Story.findById(id, function (err, type) {
    if (err) return handleError(err);
    return Story.story_type;
  });
};

function getDateCreated(id){
  Story.findById(id, function (err, date) {
    if (err) return handleError(err);
    return Story.date_created;
  });
};

function getTickRate(id){
  Story.findById(id, function (err, tick) {
    if (err) return handleError(err);
    return Story.tick_rate;
  });
};

function getInfluenceRate(id){
  Story.findById(id, function (err, inf) {
    if (err) return handleError(err);
    return Story.influence_rate;
  });
};

function getNextEvent(id){
  Story.findById(id, function (err, nexte) {
    if (err) return handleError(err);
    return Story.next_event;
  });
};

function getCycles(id){
  Story.findById(id, function (err, cycle) {
    if (err) return handleError(err);
    return Story.cycles;
  });
};

function getLikes(id){
  Story.findById(id, function (err, like) {
    if (err) return handleError(err);
    return Story.likes;
  });
};

function getViews(id){
  Story.findById(id, function (err, view) {
    if (err) return handleError(err);
    return Story.views;
  });
};


// Unique getter that is used as a find function for the current story.
// This uses the author and title to find the current document.
function query(id){
  var query = { '_id': id };
  // then update according to the current document setter.
}


// Find and Update Queries (SETTERS)
function setTitle(id, title){
  Story.update(query(id), { $set: { story_title: title}}, callback);
};

function setAuthor(id, author){
  Story.update(query(id), { $set: { story_author: author}}, callback);
};

function setBody(id, body){
  Story.update(query(id), { $set: { story_body: body}}, callback);
};

function setType(id, type){
  Story.update(query(id), { $set: { story_type: type}}, callback);
};

function setDateCreated(id, dateCreated){
  Story.update(query(id), { $set: { date_created: dateCreated}}, callback);
};

function setTicks(id, ticks){
  Story.update(query(id), { $set: { tick_rate: ticks}}, callback);
};

function setInfRate(id, inf_rate){
  Story.update(query(id), { $set: { influence_rate: inf_rate}}, callback);
};

function setNextEvent(id, next_e){
  Story.update(query(id), { $set: { next_event: next_e}}, callback);
};

function setCycles(id, cyc){
  Story.update(query(id), { $set: { cycles: cyc}}, callback);
};

function setLikes(id, like){
  Story.update(query(id), { $set: { likes: like}}, callback);
};

function setViews(id, v){
  Story.update(query(id), { $set: { views: v}}, callback);
};
