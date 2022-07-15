const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categories_list', {
      title: 'Browse product categories',
      categories_list: categories,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};

exports.categoryCreateGet = async (req, res) => {
  res.render('category_form', { title: 'Create a new category' });
};

exports.categoryCreatePost = async (req, res) => {
  try {
    await Category.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).redirect('/');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryid);
    res.redirect('/');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};

exports.categoryUpdateGet = async (req, res) => {
  try {
    const foundCategory = await Category.findById(req.params.categoryid);
    res.render('category_form', {
      foundCategory,
      title: `Edit "${foundCategory.name}"`,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};
exports.categoryUpdatePost = async (req, res) => {
  try {
    const category = new Category({
      _id: req.params.categoryid,
      name: req.body.name,
      description: req.body.description,
    });
    await Category.findByIdAndUpdate(req.params.categoryid, category);
    res.redirect(category.url);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: { ...err, errmsg: err.errmsg },
    });
  }
};
