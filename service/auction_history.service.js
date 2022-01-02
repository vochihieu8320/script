const Auction_His = require("../model/auction_history.model");

class Auction_History{
    async auction_history(productID){
        try {
            return await Auction_His.find({productID: productID});
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Auction_History