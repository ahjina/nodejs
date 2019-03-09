const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
  _id: String,
  name: String,
  iconName: String,
  descriptions: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
