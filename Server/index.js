const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3001

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

const uri = "mongodb+srv://Hritro:P8mDThzN-fWTzyr@cluster0.fy9jzry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const verifyJwt = (req,res,next) => {
  const token = req?.cookie?.token

  if(!token){
    return res.status(401).send({message: 'Unauthorized personal!!!'})
  }

  jwt.verify(token, 'jwt-secret', (err, decoded) => {
    if(err){
      return res.status(401).send({message: 'Unauthorized personal!!!'})
    }
    next();
  })
}


async function run() {
  try {

    const db = client.db('restaurant')
    const foodcollection = db.collection('foods')


    app.post('/jwt', async(req, res) =>{
      const user = req.body;

      const token = jwt.sign(user, 'jwt-secret', {expiresIn: '3d'})
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, //when under devplopment === false and when go to production === true
        sameSite: 'strict', // when under devplopment === strict and when go to production === none
        expiresIn: 3*24*60*60*1000
      })

      res.send({message: 'Token generated and has been saved on the cookie...!'})
    })

    app.get('/test', (req,res) =>{
      res.send({message: 'Token verification successful!!'})
    })
    //add food
    app.post('/add-food',verifyJwt, async(req,res) =>{
      const food = req.body
      try{
        const result = await foodcollection.insertOne(food)
        res.status(200).send({message:'Food item added successfully.'})
      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })

    //update food
    app.put('/update-food', async(req,res) =>{
      const food = req.body
      const {_id,...data} = food;
      try{
        const result = await foodcollection.updateOne({_id: new ObjectId(food._id)},{$set: data})
        res.status(200).send({message:'Food item updated successfully.'})
      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })

    //get all foods
    app.get('/all-foods', async(req,res) =>{
      const {search} = req.query
      try{
        let result;
        const searchQuery = {
          foodName: {$regex: search, $options: 'i'}
        }
        if(search){
          result = await foodcollection.find(searchQuery).toArray()
        }else{
          result = await foodcollection.find({}).toArray()
        }
        res.status(200).send(result)

      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })
    //top food items
    app.get('/top-foods', async(req,res) =>{
      try{
        const result = await foodcollection.find().limit(6).toArray()
        res.status(200).send(result) 
      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })

    //single food
    app.get('/food/:id', async(req,res) =>{
      const id = req.params.id
      try{
        const result = await foodcollection.findOne({_id: new ObjectId(id)})
        res.status(200).send(result) 
      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })

    //get by email
    app.get('/myfood/:email', async(req,res) =>{
      const email = req.params.email
      try{
        const result = await foodcollection.find({addedByEmail: email}).toArray()
        res.status(200).send(result) 
      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
