const mongoose = require('mongoose');

const ItemInstanceSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
});

ItemInstanceSchema.virtual('url').get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);
