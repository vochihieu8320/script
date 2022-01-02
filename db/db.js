const mongoose = require('mongoose')

const host_db  = process.env.db || "mongodb://localhost:27017/AppChat";


async function connect(){

    try 
    {
        await mongoose.connect(host_db);
        console.log("connect to mongoDB");    
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = { connect };
