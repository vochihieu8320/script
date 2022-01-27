function mail_options(user_mail, content, subject)
{
    const mailOptions = {
        from: process.env.email_name,
        to: user_mail,
        subject: subject,
        text: content
      };
    return mailOptions;
}

function send_mail(transporter, mailOptions)
{
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log("error", error)
        } else {
         
        }
      });
}



module.exports = {mail_options, send_mail}