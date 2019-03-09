// TODO: This is a blank template for our REST API implementation
const Product = require('../models/Product');
const collection = 'products';

/* eslint no-unused-vars:off */
module.exports = router => {
  // GET (get all)
  router.get(`/${collection}`, (req, res) => {
    const { query } = req.query;
    Product.find({})
      .exec()
      .then(result => {
        res.render('admin/products', {
          title: 'Products',
          products: result,
          query: query,
          layout: '/admin/layout'
        });
      })
      .catch(error => console.log(error));
  });

  // POST (create)
  router.post(`/${collection}`, (req, res) => {
    // create one document
  });

  // GET (get one)
  router.get(`/${collection}/:id`, (req, res) => {
    // get one document from :id
    const id = req.params.id;
    Product.findOne({ _id: id })
      .exec()
      .then(result => {
        res.render('admin/product-detail', {
          title: 'Product',
          product: result,
          layout: '/admin/layout'
        });
      })
      .catch(error => console.log(error));
  });

  // PATCH (update one)
  router.patch(`/${collection}/:id`, (req, res) => {
    // update one document
  });

  // DELETE (delete one)
  router.delete(`/${collection}/:id`, (req, res) => {
    // delete one document
  });
};
