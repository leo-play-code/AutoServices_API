import nodemailer from 'nodemailer';



export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ddmtestanswer@gmail.com',
        pass: 'elidpmedyysfjxlv'
    }
});






export const sendVerfiyMail = (mailOptions)=>{
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}