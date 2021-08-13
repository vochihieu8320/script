function email_template(campaign_title){
    const data = `
    Hello,
    We are sorry for this inconvenience. We can't create ${campaign_title} campaign. Because support@hiq.ai don't have full permission on this campaign    
    Regards,
    #HiQ
    
    ----
    HomeIQ - Support Team
    Hotline: (+84)989 000 222
    Email: support@hiq.ai
    
    Follow Us at:
    - Website: https://hiq.ai/
    - Facebook: https://facebook.com/groups/hiqinsiders
    - Youtube: https://www.youtube.com/channel/UCnNUAI8Q29ABuvDcywDq59A
    - Instagram: https://instagram.com/HomeIQ.Smartlife'
    `
    return data;
}


module.exports={email_template}