const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
  name: String,
  image: String,
  thumbnail: String,
  shortDescription: String,
  category: String,
  salePrice: Number,
  originalPrice: Number,
  images: Array,
  thumbnails: Array
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
