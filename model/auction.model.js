
const mongoose = require('mongoose')

const Auction = new mongoose.Schema(
    {
        //ID cua người đang giữ giá sản phẩm
        holderID: 
        { 
            type: String,
            required: true
        },
        productID: 
        { 
            type: String,
            required: true
        },
        //gia trị thực của sản phẩm
        real_price:{
            type: String,
            required: true
        },
        //giá để vào sản phẩm
        min_price:{
            type: String,
            required: true
        },
        status:{
            type: Number,
            required: true
        }
    },
    { timestamps: true}
)

const model = mongoose.model('Auction', Auction);
module.exports = model;
