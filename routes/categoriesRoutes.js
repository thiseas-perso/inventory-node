const express = require('express');

const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');
/* GET home page. */
router.route('/').get(categoriesController.getAllCategories);
router
  .route('/createcategory')
  .get(categoriesController.categoryCreateGet)
  .post(categoriesController.categoryCreatePost);
router.route('/:categoryid').get(itemsController.getCategoryItems);
router
  .route('/:categoryid/update')
  .get(categoriesController.categoryUpdateGet)
  .post(categoriesController.categoryUpdatePost);
router
  .route('/:categoryid/additem')
  .get(itemsController.itemCreateGet)
  .post(itemsController.itemCreatePost);
router.route('/:categoryid/:itemid').get(itemsController.getItem);
router.route('/:categoryid/:itemid/delete').post(itemsController.deleteItem);
router.route('/:categoryid/delete').post(categoriesController.deleteCategory);

module.exports = router;
