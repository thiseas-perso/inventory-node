const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: { type: Number, required: true },
  sizes: { type: [] },
  description: { type: String, maxLength: 600 },
});

ItemSchema.virtual('url').get(function () {
  return `/${this._id}`;
});

// ItemSchema.virtual('instock').get(function () {});

module.exports = mongoose.model('Item', ItemSchema);
