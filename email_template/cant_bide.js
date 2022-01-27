function cant_bide(form){
    const data = `
        Hello ${form.name}!
        You can bide ${form.product_name}, because your account react maximum price which you can pay for this product.
        Please visit the following link, change your maximum price and then you can bid this product.
        ${form.link}
        #WNC
        
        ----
        WNC - Support Team
        Hotline: (+84)000 111 000
        
        Follow Us at:
        - Facebook: https://facebook.com/groups/wnc
        - Youtube: https://www.youtube.com/channel/wnc
        - Instagram: https://instagram.com/wnc'
        `
        return data;
    }

module.exports = {cant_bide}