const express = require('express');
// ____ cors ---
const cors = require ('cors');
//
const ObjectId = require('mongodb').ObjectId;

// ____ mongo client ___ 
const { MongoClient } = require('mongodb');
// ____ secuer pass ___ 
require('dotenv').config()
const app =express();
const port =5000;
 
// ____ middleware__
app.use(cors());
app.use(express.json());



// _________ mongo uri ____ 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0k3m9.mongodb.net/myFirstDatabase?
retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// ______ from mango drive  ___ 
async function run (){
       try{
await client.connect();
const database = client.db('carMechanic');
const servicesCollection = database.collection('services');
//  GET API 
app.get('/services', async(req,res)=>{
       const cursor = servicesCollection.find({});
       const services =await cursor.toArray();
       res.send(services);
})

// get single service 
app.get ('/services/:id',async(req,res)=>{
       const id = req.params.id;
       const query = { _id: ObjectId(id) };
       const service = await servicesCollection.findOne(query);
       res.json(service);

})
// delete 
app.delete('/services/:id', async(req,res)=>{
       const id =req.params.id;
       const query ={_id:ObjectId(id)};
       const result =await servicesCollection.deleteOne(query);
       res.json(result);

})



// POST API 
app.post('/services',async (req,res)=>{
               const service= req.body;
console.log('hit api ',service);

//      res.send('hit my api ang go datas')         
                
               const result = await servicesCollection.insertOne(service);
//  ____ by this console we dont get any data from here ..bcz of app.post .. if we creact  it dereacly then we gget somt data              
console.log(result);
res.json(result)
})


// _____ have to check by __ 
// console.log("database");
       } 
       finally{
               //       ------- we can close it if we want .. but now i do this______ 
               //        await client.close();
       }       
}
run().catch(console.dir);



app.get('/', (req,res)=>{
res.send('running gunies server');
})
 
app.listen(port ,()=>{
               console.log("running genius server on porat", port)
})
