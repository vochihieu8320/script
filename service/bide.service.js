const Bide = require('../model/bide.model');
const Auction = require('../model/auction.model');
const His_Auction = require('../model/auction_history.model')
class BideService{
   async bide(userID, productID, real_price, min_price){
        let price = parseInt(real_price)*0.01
        //lấy giá đang giữ hiện tại của bider
        let bider_price = price + parseInt(min_price)
        //cập nhật lại giá đang đấu của bider
        await Bide.updateOne({userID: userID, productID: productID}, {current_price: bider_price});
        //cập nhật lại giá vào của sản phẩm và holder của sản phẩm đấy
        await Auction.updateOne({userID: userID, productID: productID}, {min_price: bider_price, holderID: userID});
         //thêm lịch sử đấu giá
         const body = {
            userID: userID,
            productID: productID,
            price: bider_price
        }
        const message = await His_Auction.create(body);
        return message
    }
    async check_bide(userID, productID, real_price, min_price){
        let price = parseInt(real_price)*0.01
        let bider_price = price + parseInt(min_price)
        const bider = await Bide.findOne({userID: userID, productID: productID});
        return (+bider.max_price >= bider_price) ? true : false
    }
    async Biders(productID){
        try {
            return await Bide.find({productID: productID})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new BideService