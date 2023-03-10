const express = require("express")
const router = express.Router()
const { Show } = require('../models/index')
const { check, validationResult } = require('express-validator')

// Get one show
router.get("/:id", async (req, res) => {
    try {
      const show = await Show.findByPk(req.params.id)
      res.status(200).json(show)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get show')
    }
})

// Get all shows
router.get('/', async (req, res) => {
    try {
      const shows = await Show.findAll()
      res.status(200).json(shows)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get shows')
    }
})

// GET shows of a particular genre (genre in req.params)
router.get('/genres/:genre', async (req, res) => {
    try {
      const genre = req.params.genre
      const foundGenre = await Show.findAll({ where: { genre } })
      if (foundGenre.length > 0) {
        res.status(200).json(foundGenre)
      } else {
        res.status(404).send('Genre not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get genre')
    }
})

// PUT update rating of a show that has been watched
router.put('/:id/watched', [check('rating').notEmpty().withMessage('Rating is required'),], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const foundShow = await Show.findByPk(id);
      if (foundShow) {
        const { rating } = req.body;
        await foundShow.update({ rating });
        res.status(200).send('Rating updated successfully!');
      } else {
        res.status(404).send('Show not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Cannot update rating');
    }
  }
);

// PUT update the status of a show
router.put('/:id/updates', [check('status').notEmpty().withMessage('Status is required').isLength({ min: 5, max: 25 }).withMessage('Status must be between 5 and 25 characters'), ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params.id;
      const foundShow = await Show.findByPk(id);
      if (foundShow) {
        const { status } = req.body;
        await foundShow.update({ status });
        res.status(200).send('Status updated successfully!');
      } else {
        res.status(404).send('Show not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Cannot update status');
    }
  }
);

// DELETE a show
router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundShow = await Show.findByPk(id)
      if (foundShow) {
        await foundShow.destroy()
        res.status(200).send('Show deleted successfully!')
      } else {
        res.status(404).send('Show not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot delete show')
    }
})

module.exports = {
    router
}