import express from "express"
import mongoose from "mongoose"
import Cors from "cors"

mongoose.connect("mongodb+srv://test:test@cluster0.gverq1o.mongodb.net/messaging_app?retryWrites=true&w=majority", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  
const schema = { 
  review: String,  
  review_id:String 
};

const review = mongoose.model("review", schema); 

const app=express()
app.use(express.json())
app.use(Cors())
const port= process.env.PORT || 8001

app.get("/", (_req, res) => res.status(200).send("Hello"))

app.post('/reviews/post', (req, res) => {
    const reviews = req.body
    console.log(reviews);
    review.create(reviews)
    
    .then((result)=>{
        console.log(result);
        res.status(201).send(result)
    })
    .catch((err)=>{
        res.status(500).send(err)

    })
})
app.get('/reviews/get/:id', (req, res) => {
    const id=req.params.id
    review.find({review_id:id})
    .then((result)=>{
        
        res.status(201).send(result)
        
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
        
    })

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))