// TODO: This is a blank template for our REST API implementation
const Category = require('../models/Category');
const collection = 'categories';

/* eslint no-unused-vars:off */
module.exports = router => {
  // GET (get all)
  router.get(`/${collection}`, (req, res) => {
    Category.find({})
      .exec()
      .then(result => {
        res.render('admin/categories', {
          title: 'Categories',
          categories: result,
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
