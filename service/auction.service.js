const Auction = require('../model/auction.model');

class AuctionService{
    async getAuctions(){
        try {
            const auctions = await Auction.findOne({status: 1});
            return auctions
        } catch (error) {
            console.log(error)
        }
    }

    async getAuction(productID){
        try {
            return await Auction.findOne({productID: productID})            
        } catch (error) {
            console.log(error)
        }
    }

    async updateAuction(productID, body){
        try {
            await Auction.updateOne({productID: productID}, body)
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new AuctionService



