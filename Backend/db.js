const {connect} = require('mongoose');

const connectdb = async(url)=>{
    try{
    await connect(url);
    console.log("Connected to database successfully");
    }catch(err){
        console.log("Error connecting to database", err);
    }
}
module.exports = connectdb;