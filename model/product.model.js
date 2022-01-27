
const mongoose = require('mongoose')

var Product = new mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true,
            minlength:3,
            maxlength:50,
        },
        seller:
        {
            type: String,
            minlength: 8,
        },
        price: 
        {
            type: Number,
            required: false,
            length: 11
        },
        date_bid:
        {
            type: String,
            required: false,
            minlength: 0
        },
        category:
        {
            type: String,
            required: false,
            minlength: 0
        },
        buy_now_price:
        {
            type: String,
            required: false,
            minlength: 0
        },
        description:{
            type: String,
        },
        img: {
            type: String,
            required: true,
        },
        sub_img:{
            type: String,
           
        },
        auto_add_end_at:
        {
            type: Number
        }
    },
    { timestamps: true,collection:'Product'}
)
const model = mongoose.model('Product', Product);
module.exports = model;