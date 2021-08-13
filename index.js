const mysql = require('mysql');
const service = require('./service/check-permission.service');


const db = mysql.createConnection({
    host     :  process.env.database_host,
    port:       process.env.database_port,
    user     : process.env.database_user,
    password :  process.env.password,
    database : process.env.database, 
  });



  var cron = require('node-cron');
  cron.schedule('*/5 * * * *', () => {
         listcampaign()
    });
async function connect_database() 
{
    return new Promise(async(resolve, reject)=>{
        db.connect((err) =>{
            if(err){
                console.log("err", err);
                reject(err);
            }
            console.log("connect database");
            resolve(true);
        });
        
    })
    
}


async function listcampaign() 
{
    try {
        await connect_database();
        const query ="SELECT * FROM `campaign`";
        db.query(query, async(err, result, fields) =>{
            if(err)
            {
                reject(err);
            }
            else
            {   
               await service.checkPermisson(result, db)
            
            }

        })
        

    } catch (error) {
        
    }
    
}

//  function scripstart(campaign_title){
//     return new Promise(async(resolve, reject)=>{
//         try {
//             const result = await service.checkPermisson(campaign_title);
//              resolve(result)    
//         } catch (error) {
//             reject(error)
//         }
        
//     })
   
    
// }


// process.on('message', async function(packet) {
//     if(packet.data)
//     {
//         const result = await scripstart(packet.data.campaign.title);
//         console.log("result", result);
      
//     }
//   });

 

  