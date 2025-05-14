const connectdb = require("./db");

const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;

const cors = require('cors');
const router = require("./routes/userrouter");
app.use(cors());

app.use(express.json());

app.use('/user',router )

const url = process.env.db_uri;


app.listen(port, async()=>{
    try{
        await connectdb(url);
        console.log(`Server is running on port ${port}`);
    }
    catch(err){
        console.log("Error starting server", err);
    }
})