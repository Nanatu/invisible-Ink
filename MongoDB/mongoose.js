var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var.db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


//Schema declaration for invisible ink.
// Story ID - automatically instantiated uniquely by MongoDB. -> ObjectID() <-
// Story
//   title
//   author
//   body
//   date
// Likes
// Comments

var InvInkSchema = mongoose.Schema({
    title: String,
    author: String,
    body: String, //LFS
    comments: [{ author: String, body: String, date: Date }],
    date: { type: Date, default: Date.now }
});


//stores the body in GridFS
fileSchema.plugin(mongooseFS, {keys: ['body'], mongoose: mongoose});
var File = mongoose.model('File', fileSchema);


//Loading a document.
File.findById(id, function (err, file) {
  if(err) {
    return done(err);
  }
  file.retrieveBlobs(function (err) {
    if(err) {
      return done(err);
    }
    // Now everything is ready !
  });
});
