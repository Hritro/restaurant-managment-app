const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    const foodCollention = db.collection('foods')


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

    app.get('/test', verifyJwt, (req,res) =>{
      res.send({message: 'Token verification successful!!'})
    })
    //add food
    app.post('/add-food', async(req,res) =>{
      const food = req.body
      try{
        const result = await foodCollention.insertOne(food)
        res.status(200).send({message:'Food item added successfully.'})
      }catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong!', error: error})
      }
    })

    //get all foods
    app.get('/all-foods', async(req,res) =>{
      try{
        const result = await foodCollention.find().toArray()
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
