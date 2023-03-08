const { db, DataTypes } = require('../db')
const express = require("express")
const router = express.Router()

const User = db.define("users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
});

// GET one user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      res.json(user)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get user')
    }
})

// GET all users
router.get('/', async (req, res) => {
    try {
      const allUsers = await User.findAll()
      res.json(allUsers)
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
        res.json(shows)
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
        const userId = req.params.id
        const showId = req.params.showId
        const foundUser = await User.findByPk(userId)
        if (foundUser) {
            const foundShow = await Show.findByPk(showId)
            if (foundShow) {
                const { title, genre, rating } = req.body
                if (!rating || rating.toString().trim() === '') {
                    res.status(400).send('Rating cannot be empty')
                } else {
                    const parsedRating = parseFloat(rating)
                    if (isNaN(parsedRating)) {
                        res.status(400).send('Invalid rating')
                    } else {
                        await foundUser.addShow(foundShow, { through: { title, genre, rating: parsedRating } })
                        res.status(200).send('Show added successfully!')
                    }
                }
            } else {
                res.status(404).send('Show not found')
            }
        } else {
            res.status(404).send('User not found')
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Cannot update show')
    }
})

//exports
module.exports = {
    User,
    router
}
