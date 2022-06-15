const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors= require('cors')
const path = require("path");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "Backend/config.env" });
  }
const urlSchema= new mongoose.Schema({
    url:{
        type: String,
        required:true
    },
    hash: String
})

const urlmodal= mongoose.model('url',urlSchema);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI).then(
    console.log('connected to databse successfully')
)
app.post('/addurl', async(req,res)=>{
    const {url,hash} = req.body;

    try{
        if(!url){
            return res.status(400).json({
                success:false,
                message: "please enter valid url"
            })
        }
        const urlentry= await urlmodal.create({
            url,
            hash
        })
        urlentry.save();
        res.status(201).json(urlentry);
        
    }catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
})
app.get('/shorturl/:id',async (req,res)=>{
    // console.log(req.params.hash);
    // console.log(typeof req.params.hash);
    try{
        const id=req.params.id
        let urlentry;
        let isvalidid=mongoose.Types.ObjectId.isValid(id)
        // console.log(isvalidid);
        if(isvalidid){
            // console.log('correct id');
            urlentry= await urlmodal.findById(id);
        }else{
            console.log('incorrect id');
            return res.status(404).json({'success':false, error : 'try again incorrect url'});
        }
        // console.log(urlentry);
        if(!urlentry){
            console.log('url not found');
            // res.write('url not found')
            return res.status(400).json({'success':false, error : 'try again incorrect url'});
        }else{
            res.status(200).json({'success':true, urlentry});
            // res.status(200).json(urlentry.url)
            return
        }
    }catch(err){
        console.log('enter in catch block of get req')
        console.log(err);
    }
})
app.get('/:hash',async (req,res)=>{
    // console.log(req.params.hash);
    // console.log(typeof req.params.hash);
    try{
        const urlentry= await urlmodal.findOne({hash : String(req.params.hash)});
        // console.log(urlentry);
        if(!urlentry){
            console.log('url not found');
            // res.write('url not found')
            res.status(404).json({'success':false});
            return
        }else{
            res.status(200).redirect(urlentry.url);
            // res.status(200).json(urlentry.url)
            return
        }
    }catch(err){
        console.log('enter in catch block of post req')
        console.log(err);
    }
})

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// let process={env:{PORT:4000}}
const server =app.listen(process.env.PORT||4000,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT||4000}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });

