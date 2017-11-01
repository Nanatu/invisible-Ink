var APIKEY = '759d17ade61006ca270010302220f9ff4718cc01d21f069be';
var Wordnik = require('wordnik-bb').init(APIKEY);

var word = 'test'

var word = new Wordnik.Word({word: word, params:{includeSuggestions:true}});
word.getEverything()
 .then( function() {
    console.log("A WHOLE lot of data in a Word model: ", word);
  });

  var randomWordPromise = Wordnik.getRandomWordModel({
    includePartOfSpeech: "verb-transitive",
    minCorpusCount: 10000
  }
);
randomWordPromise.done(function(word) {
  console.log("The model for our random word: ", word);
  // We could also get more info about the random word:
  // word.getEverything()
  //   .then( function() {
  //      console.log("And now we've populated the model with all the available data: ", word);
  //   }
});
