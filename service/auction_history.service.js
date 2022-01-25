const Auction_His = require("../model/auction_history.model");

class Auction_History{
    async auction_history(productID){
        try {
            return await Auction_His.aggregate([
                {
                    $match: {productID: productID}
                },
                { $addFields: { "user": {
                    $toObjectId: "$userID"
                }}},
                {
                    $lookup:
                    {
                       
                        from: "users",
                        localField:"user",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {$unwind: { path: "$owner", preserveNullAndEmptyArrays: true }},
        ]);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Auction_History