const express = require("express")
const app = express()

const showRouter = require("./routes/Show")
const userRouter = require("./routes/User")
const { check, validationResult } = require("express-validator")
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express Routes
app.use("/shows", showRouter)
app.use("/users", userRouter)

app.listen(port, () => console.log(`App listening on port ${port}!`))
