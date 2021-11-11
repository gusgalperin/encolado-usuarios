import nodemailer from 'nodemailer'


function crearEnviadorDeMails (miMail,pass){
const transporter = nodemailer.createTransport({
    
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: { 
       rejectUnauthorized: false,
    },
    auth: {
        user: miMail,
        pass: pass
    }
  })

//   return {
//       enviarConCuerpoHtml: async (to, subject, html) =>{
//           const info = {
//             from: rem,
//             to : to,
//             subject: subject,
//             html: html 
//           }
//           try {
//               await transporter.sendMail(info)
//               console.log('email enviado')
//           } catch (error) {
            
//             throw new Error(`error al enviar el mail , ${error}`)
              
//           }
//       }
//   }

return {
    enviarMensaje: async (to, subject, html) =>{
        const info = {
          from: miMail,
          to : to,
          subject: subject,
          html: html 
        }
        try {
            await transporter.sendMail(info)
            console.log('email enviado')
        } catch (error) {
          
          throw new Error(`error al enviar el mail , ${error}`)
            
        }
    }
}
  
}


export {crearEnviadorDeMails}