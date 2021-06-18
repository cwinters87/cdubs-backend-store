const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(newCategory => res.json(newCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then(updatedCategory => {
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category with this id not found' })
      return
    }
    res.json(updatedCategory)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(deletedCategory => {
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category with this id not found' })
      return;
    }
    res.json(deletedCategory)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;
