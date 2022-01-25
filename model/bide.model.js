
const mongoose = require('mongoose')

const Bide = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        productID: 
        { 
            type: String,
            required: true
        },
        //giá tối đa có thể chi trả cho sản phẩm
        max_price:{
            type: String,
            required: true
        },
        //giá đang đấu giá hiện tại
        current_price: {
            type: String,
            required: true
        },
        auto_bide:{
            type: String,
        },
        bid_step:
        {
            type: Number,
        }
    },
    { timestamps: true}
)

const model = mongoose.model('Bide', Bide);
module.exports = model;
