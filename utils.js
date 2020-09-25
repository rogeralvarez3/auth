const nodemailer = require("nodemailer");
const sendMail= function(data,resolve) {
    let transporter = nodemailer.createTransport({
        host: "coopefacsa.coop",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "webmaster@coopefacsa.coop", // generated ethereal user
            pass: "Cc123456@" // generated ethereal password
        }
    });
    transporter.sendMail(
        {
            from: '"COOPEFACSA R.L." <webmaster@coopefacsa.coop>;', // sender address
            to: data.mail, // list of receivers
            subject: "Recuperación de contraseña", // Subject line
            html: `<h4>Usted ha solicitado recuperar su contraseña, haga click en el siguiente link para cambiarla</h4><br><strong>http://coopefacsa.coop:3100/resetPass.html?requestCode=${data.param}</strong><br><span style='color:red'>Nota: El link ya no será válido después de 10 minutos.</span>` // html body
        },
        info => {
            //console.log(info);
            resolve(info);
        }
    );
}
module.exports={sendMail}