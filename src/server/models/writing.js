var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;

var Writing = new Schema({
  title: String,
  text: String,
  positiveWords: [String],
  negativeWords: [String],
  positiveWordCount: Number,
  negativeWordCount: Number,
  textWordCount: Number
});

module.exports = mongoose.model('writings', Writing);

