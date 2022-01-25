const Bide = require('../model/bide.model');
const Auction = require('../model/auction.model');
const His_Auction = require('../model/auction_history.model');
class BideService{
   async bide(userID, productID, bider_step, auction){
       try {
        let bider_price = bider_step + auction.min_price
        //cập nhật lại giá đang đấu của bider
        await Bide.updateOne({userID: userID, productID: productID}, {current_price: bider_price});
        //cập nhật lại giá vào của sản phẩm và holder của sản phẩm đấy
        const check_auction = await Auction.findOne({userID: userID, productID: productID});
        await Auction.updateOne({productID: productID}, 
            {
            min_price: bider_price, 
            holderID: userID, 
            amount_bider_bide: check_auction.amount_bider_bide + 1
            });
         //thêm lịch sử đấu giá
         const body = {
            userID: userID,
            productID: productID,
            price: bider_price
        }
        const check_history = await His_Auction.findOne(body)
        if(check_history === null)
        {   
            const message = await His_Auction.create(body);
            return message    
        }
        else
        {
            return null;
        }
       
       } catch (error) {
           console.log(error)
       }
       
    }
    async check_bide(userID, productID, auction){
        let bider_price = auction.min_price;
        const bider = await Bide.findOne({userID: userID, productID: productID});
        return (+bider.max_price >= bider_price + bider.bid_step) ? true : false
    }
    async Biders(productID){
        try {
            return await Bide.find({productID: productID, auto_bide: "1"})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new BideService