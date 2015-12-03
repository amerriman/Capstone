var mongoose = require('mongoose-q')(require('mongoose'));
var deepPopulate = require("mongoose-deep-populate")(mongoose);

var Schema = mongoose.Schema;

var Writing = new Schema({
  title: String,
  text: String,
  positiveWords: [String],
  negativeWords: [String],
  positiveWordCount: Number,
  negativeWordCount: Number,
  textWordCount: Number,
  comments: [String]
});

Writing.plugin(deepPopulate);

module.exports = mongoose.model('writings', Writing);

