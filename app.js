//jshint esversion:6



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require('bcrypt');

const saltRounds = 10;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({

    extended:true
}))
// console.log(process.env.SECRET) 






mongoose.connect("mongodb://localhost:27017/userbase");


const UserSchema = new mongoose.Schema({

email : String,
password : String


})


const User = mongoose.model("articles",UserSchema);

app.get("/", function(req,res){
res.render("home");



});

app.get("/login", function(req,res){
res.render("login");



});

app.get("/register", function(req,res){
res.render("register");



});

app.post("/register", function(req,res){

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.



            const newUser = new User ({
            email :req.body.username,
            password: hash
            
            
            
            })
            newUser.save();
            res.render("secrets")
            
            
            
            });
        });
    });


app.post("/login", function(req,res){
const username  = req.body.username
const password = req.body.password
User.findOne({email: username}, function(err,foundUser){


    if(err){

        console.log(err)
    }
    else{
        bcrypt.compare(password, foundUser.password, function(err, result) {
            // result == true
if(result === true){


    res.render("secrets");
}

        });



}



        
    }
)


});


app.listen(3000, function(){
 console.log("server is up and running")


})



