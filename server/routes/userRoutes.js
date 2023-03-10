const express = require("express")
const router = express.Router()
const { User } = require('../models/index')
const { Show } = require('../models/index')

// GET one user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get user')
    }
})

// GET all users
router.get('/', async (req, res) => {
    try {
      const allUsers = await User.findAll()
      res.status(200).json(allUsers)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get users')
    }
})

// GET all shows watched by a user (user id in req.params)
router.get('/:id/shows', async (req, res) => {
    try {
      const id = req.params.id
      const foundUser = await User.findByPk(id)
      if (foundUser) {
        const shows = await foundUser.getShows()
        res.status(200).json(shows)
      } else {
        res.status(404).send('User not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get shows')
    }
})

// PUT update and add a show if a user has watched it
router.put('/:id/shows/:showId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    const show = await Show.findByPk(req.params.showId)
    await user.addShow(show)
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Cannot update shows')
  }
})

module.exports = {
    router
}