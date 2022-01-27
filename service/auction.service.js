const Auction = require('../model/auction.model');

class AuctionService{
    async getAuctions(){
        try {
            const auctions = await Auction.find({status: 1}).limit(3);
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
    async getPrice(auction){
        return (auction.bide) ? parseInt(auction.bide) : (parseInt(auction.real_price)*0.01)
    }

}

module.exports = new AuctionService



