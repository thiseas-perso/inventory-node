const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 20, unique: true },
  description: { type: String, required: true, maxLength: 200 },
});

CategorySchema.virtual('url').get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
