import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js"
import Cors from "cors"

// App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://admin:dqb2IrGDcCFqk9s7@cluster0.vtizn.mongodb.net/doggydb?retryWrites=true&w=majority`


// Middlewares
app.use(express.json())
// Used for adding headers to requests and security i think?
app.use(Cors())

// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("YOYOYO whudup"))

app.post("/cards", (req, res) => {
  const dbCard = req.body

  //Create new document
  Cards.create(dbCard, (err, data) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.get("/cards", (req, res) => {

  //Retrieve everything from collection
  Cards.find((err, data) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`))
