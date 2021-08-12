const mysql = require('mysql');
const service = require('./service/check-permission.service');
const pm2 = require('pm2')


const db = mysql.createConnection({
    host     :  process.env.database_host,
    port:       process.env.database_port,
    user     : process.env.database_user,
    password :  process.env.password,
    database : process.env.database, 
  });

db.connect((err) =>{
    if(err){
        console.log("err")
    }
    console.log("connected database");
});



async function scripstart(campaign_title){
    const result = await service.checkPermisson(campaign_title);
    return result
}


process.on('message', function(packet) {
    console.log("packet", packet.data);
    if(packet.data)
    {
        const result = scripstart(packet.data.campaign.title);
        console.log("result", result);
    }
  });
