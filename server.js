//imports
const express = require("express")
const app = express()
const port = 3000

//import routes
const showRoutes = require("./server/routes/showRoutes").router
const userRoutes = require("./server/routes/userRoutes").router

// // middleware
app.use(express.json())

// Express Routes
app.use("/shows", showRoutes)
app.use("/users", userRoutes)

//define where your express server will be listening to
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
