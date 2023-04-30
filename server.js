var express = require('express');
var cors = require('cors');
const fetch = (...args)=> 
    import ('node-fetch').then(({default:fetch})=>fetch(...args));

var bodyParser = require('body-parse');


const CLIENT_ID = "0a2008d2460307811069";
const CLIENT_SECRET ="92bacaa9b09ebbdc620119d16e80aaef67bde496";



var app = express();

app.use(cors());
app.use(bodyParser.json());

//code being passed from the frontend
app.get('/getAccessToken',async function(req,res){

   console.log(req.query.code);

    const params = "?client_id=" + CLIENT_ID + "&client_secret" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params ,{
        method:"POST",
        headers:{
            "Accept":"application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log("data",data);
        res.json(data);
    })
})

//getUserData
//access token is going to be passed in as an authorization header


app.get('/getUserData',async function(req,res){
    req.get("Authorization");
    await fetch("https://api.github.com/user",{
        method:"GET",
        header:{
            "Authorization":req.get("Authorization")
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log
    })
})


app.listen(4000,function(){
    console.log("CORS server running on pport 4000")
})