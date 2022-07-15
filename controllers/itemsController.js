const Item = require('../models/item');
const Category = require('../models/category');

exports.getCategoryItems = async (req, res) => {
  try {
    const foundCategory = await Category.findById(req.params.categoryid);
    const items = await Item.find({ category: foundCategory._id });
    res.status(201).render('category_detail', {
      items,
      foundCategory,
      title: foundCategory.name,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    const foundCategory = await Category.findById(req.params.categoryid);
    const item = await Item.findById(req.params.itemid);
    res.status(201).render('item_detail', {
      item,
      foundCategory,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};

exports.itemCreateGet = async (req, res) => {
  const categories = await Category.find();
  res.render('item_form', {
    categories,
    title: 'add new item',
  });
};
exports.itemCreatePost = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    const foundCategory = await Category.findById(newItem.category);
    const items = await Item.find({ category: foundCategory._id });
    res.status(201).render('category_detail', {
      items,
      foundCategory,
      title: foundCategory.name,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.itemid);
    res.status(204).redirect(`/${req.params.categoryid}`);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};
