
function Update_Campaign(data, db) 
{
    return new Promise(async(resolve, reject)=>{
        const query_update_campaign =  "UPDATE `campaign` SET ? WHERE ca_id = '"+data.ca_id+"'";
        db.query(query_update_campaign, data, (err, result, fields)=>{
            if (err)
            {
                console.log("err");
                resolve(err)
            }
            else
            {
              
                resolve(true);
            }
          }) 
    })
   
}

function Get_Campaign(db) {
    return new Promise(async (resolve, reject)=>{
        const query ="SELECT * FROM `campaign`";
        db.query(query,(err, result, fields) =>{
            if(err)
            {
                reject(err);
            }
            else
            {   
                resolve(result)
            }


        })
    })
}



module.exports={Get_Campaign, Update_Campaign }