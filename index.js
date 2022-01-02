const { createServer } = require("http");
const { Server, Socket } = require("socket.io");
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const db = require("./db/db");
const app = express();
const auctions_history = require("./service/auction_history.service");
const BideService = require("./service/bide.service");
const AuctionService = require("./service/auction.service");

app.use(
  cors({
    origin: process.env.Domain_Fe,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
const httpServer = createServer(app);
//create socker server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.Domain_Fe,
  },
});

io.on("connection", async (socket) => {
  socket.on("join-room", async (productID, callback) => {
    try {
      socket.join(productID);
      const auctions = await auctions_history.auction_history(productID);
      callback({ status: "success" });
      io.to(productID).emit("room-messages", auctions);
    } catch (error) {
      console.log(error);
      callback("something went wrong");
    }
  });

cron.schedule("*/10 * * * * *", async () => {
    //tìm các auctions còn đấu giá
    let auction = await AuctionService.getAuctions();
    if(!auction.productID)
      return; 
    socket.join(auction.productID);
    //tim tất cả bider của cuộc đấu giá đó
    const biders = await BideService.Biders(auction.productID);
    let count = 0 ;
    for (let j = 0; j < biders.length; j++) {
      // nếu bider hiện tại không phải là người đang giữ giá cao nhất
      if (biders[j].userID != auction.holderID) {
        //kiểm trả xem bider này có thể đấu giá được hay không
        if (
          await BideService.check_bide(
            biders[j].userID,
            biders[j].productID,
            auction.real_price,
            auction.min_price
          )
        ) {
          //có thể đấu giá
          let message = await BideService.bide(
            biders[j].userID,
            biders[j].productID,
            auction.real_price,
            auction.min_price
          );
          //câp nhật lại người giữ giá hiện tại
          auction.holderID = biders[j].userID;
          // cập nhật lại giá vào sản phẩm
          auction.min_price = parseInt(auction.min_price) + parseInt(auction.real_price)*0.01;
          io.to(auction.productID).emit("received-messages", message, auction.holderID);  
               
        } 
        else 
        {
          count++;
        }
      }
    }
    // đấu giá hoàn tất
    if(count == biders.length - 1){
      await AuctionService.updateAuction(auction.productID, {status:0})
    }
    
});

});


db.connect();
httpServer.listen(port, () => {
  console.log(`Server listen at ${port}`);
});
