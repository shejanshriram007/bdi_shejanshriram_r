var express=require("express");
var bodyParser=require("body-parser");
var MongoClient=require('mongodb').MongoClient;

var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true  
}));

var url="mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url,function(err,database) {
    if(err) 
        throw err;
    dbo=database.db("contact");
});

app.post('/success',function(req,res) {
    var first_name=req.body.fn;
    var last_name=req.body.ln;
    var phone_no=req.body.ph;
    
    var data={
        "first_name":first_name,
        "last_name":last_name,
        "phone_no":phone_no
}
dbo.collection('users').insertOne(data,function(err,collection){
    if(err) 
        throw err;
console.log("Record inserted Successfully");
});
return res.redirect('success.html');
})
app.get('/',function(req,res){
    return res.redirect('index.html');
}).listen(3005)
console.log("server listening at port 3004");

