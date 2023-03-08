const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const getCatagories = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(getCatagories);
} catch(err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCatagory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if(!oneCatagory) {
      res.status(404).json({ message: "No catagory by that id is found."});
      return;
    }

    res.status(200).json(oneCatagory);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCatagory = await Category.create(req.body);
    res.status(200).json(createCatagory);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatagory = await Category.update(req.body, {
      where: { id: req.params.id, }
    });
    if(!updateCatagory) {
      res.status(404).json({ message:  "No catagory by that id found."  });
      return;
    };
    res.status(200).json(updateCatagory);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCatagory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!deleteCatagory) {
      res.status(404).json({ messag: 'No catagory by that id found.'});
      return;
    }
    res.status(200).json(deleteCatagory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
