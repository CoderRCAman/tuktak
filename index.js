require('dotenv').config()
const express = require('express');  
const mongoose  = require('mongoose');
const app = express() ;  
const PORT = process.env.PORT || 4000 
const MONGODB_URL = process.env.MONGODB_URL ;
const cookieParser = require('cookie-parser')  
const morgan = require('morgan') ; 
const HomeRoutes = require('./routes/home_routes') ;
const AuthRoutes = require('./routes/auth_routes') ;
const LandingRoutes = require('./routes/landing_routes')

//middlewares 
app.use(express.json()) ; 
app.use(express.urlencoded({extended:true})) ;
app.use(cookieParser()) ;
app.use(morgan('tiny')) ;
app.set('view engine' , 'ejs') ;
app.use(express.static('public')) //this makes the public folder accessile to every client 

//ALL ROUTES 
app.use('/',HomeRoutes) ;  
app.use('/',AuthRoutes) ;  
app.use('/',LandingRoutes)

mongoose.connect(MONGODB_URL) 
.then(mongo => console.log('Database was connected!.....')) 
.catch(err => {
    console.log("A mongodb Error:\n" , err) ;
})

app.listen(PORT ,()=>{
    console.log("Server is up and running......",PORT)
}) ; 