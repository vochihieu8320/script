const mongoose = require('mongoose')

const Auction_his = new mongoose.Schema(
    {
        userID: 
        { 
            type: String,
            required: true
        },
        productID: 
        { 
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        }
    },
    { timestamps: true}
)

const model = mongoose.model('Auction_History', Auction_his);
module.exports = model;
