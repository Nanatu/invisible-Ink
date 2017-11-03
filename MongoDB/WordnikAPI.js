var Wordnik = require('wordnik');

var wn = new Wordnik({
    api_key: '759d17ade61006ca270010302220f9ff4718cc01d21f069be'
});

wn.definitions('pernicious', function(e, defs) {
  console.log(e, defs);
});
