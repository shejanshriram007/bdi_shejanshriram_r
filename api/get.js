const express =require('express')
const MongoClient=require('mongodb').MongoClient
const app=express()
app.use(express.json())
var database

app.get('/api/users',(req,res)=>{
  database.collection('users').find({}).toArray((err,result)=>{
    if (err)throw err
    res.send(result)
  })
})
app.listen(8080,()=>{
  MongoClient.connect('mongodb://localhost:27017',{usenewUrlParser:true},(error,result)=>{
    if(error) throw error
    database=result.db('contact')
    console.log('connection sucessful')
  })
})
