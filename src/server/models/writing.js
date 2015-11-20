var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;

var Writing = new Schema({
  text: String,
  positiveWords: [String],
  negativeWords: [String],
  positiveWordCount: Number,
  negativeWordCount: Number,
  textWordCount: Number
});

module.exports = mongoose.model('writings', Writing);

