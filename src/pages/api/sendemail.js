const nodemailer = require("nodemailer");
const Mustache = require("mustache");

const templates = {
  "welcome-coach": {
    subject: "Bienvenido/Bienvenida a Teaching Path 👏",
    body: ` 
    <h3>👋 Bienvenido/Bienvenida {{name}} a Teaching Path, ahora ya puedes crear tus propios Pathways y compartir conocimiento con tu comunidad. Te invitamos a visitar la documentación de nuestra plataforma.</h3>
    <br>
    <h4>¿Qué debes tener en cuenta?</h4>
    <p>Teaching Path es una plataforma que busca integrar personas con conocimiento con personas que pretende adaptar un conocimiento. Esto se hace gracias a los Pathways que puedes construir dentro de la plataforma.</p>
    <p>En el momento no hay una forma de monetizar tu conocimiento de manera directa pero el sistema si te facilita ponerte en contacto con los aprendices para que de forma personal o grupal puedes acordar sesiones de mentoria o de consultoria.</p>
    <p>Te invitamos a leer los términos y condiciones.</p>
    <p>Términos y Condiciones ( https://docs.teachingpath.info/terminos )</p>
    <p>¿Tienes dudas, inquietudes o sugerencias?</p>
    <h3>¿Tienes dudas, inquietudes o sugerencias?</h3>
    <center>Puedes escribirnos y ponerte en contacto con nosotros para responder a tus dudas, inquietudes o darnos alguna sugerencia acerca de la plataforma.</center>
    <center>teachingpath.dev@gmail.com</center>
    `,
  },
  "welcome-trainee": {
    subject: "Bienvenido/Bienvenida a Teaching Path 👏",
    body: ` 
    <h3>👋 Bienvenido/Bienvenida {{name}} a Teaching Path, ahora ya puedes crear tus propios Pathways y compartir conocimiento con tu comunidad. Te invitamos a visitar la documentación de nuestra plataforma.</h3>
    <br>
    <h4>¿Qué debes tener en cuenta?</h4>
    <p>Teaching Path es una plataforma que busca integrar personas con conocimiento con personas que pretende adaptar un conocimiento. Esto se hace gracias a los Pathways que puedes construir dentro de la plataforma.</p>
    <p>Te invitamos a leer los términos y condiciones.</p>
    <p>Términos y Condiciones ( https://docs.teachingpath.info/terminos )</p>
    <p>¿Tienes dudas, inquietudes o sugerencias?</p>
    <h3>¿Tienes dudas, inquietudes o sugerencias?</h3>
    <center>Puedes escribirnos y ponerte en contacto con nosotros para responder a tus dudas, inquietudes o darnos alguna sugerencia acerca de la plataforma.</center>
    <center>teachingpath.dev@gmail.com</center>
    `,
  },
  "start-pathway": {
    subject: "El Pathway a Iniciado 💪",
    body: ` 
    <h2>Has comenzado el viaje con el Pathway <i>{{name}}</i></h2>
    <p> Tener en cuenta que este pathway puedes apoyarte de tu Teacher para acelerar el proceso de aprendizaje. Sigue todas las recomendaciones y las instrucciones dentro del pathway de eso depende el exito del pathway.
    </p>
    <h3>¡Felicidades, vas por buen camino! 👏🥳🥳</h3>
    `,
  },
  "finish-runner": {
    subject: "Has completado con exito el Runner 💪",
    body: ` 
    <h2>Excelente trabajo, has culminado el Runner <i>{{name}}</i> de forma exitosa</h2>
    <p>Ahora debes continuar con el siguiente Runner y finalizar el Pathway</p>
    <h3>¡Felicidades, vas por buen camino! 👏🥳🥳</h3>
    `,
  },
  "finish-pathway": {
    subject: "Has completado con exito el Pathway 👏🥳🥳",
    body: ` 
    <h2>Has superado el Pathway <i>{{name}}</i>, excelente trabajo</h2>
    <p>Completaste el Pathway, te felicito, tu experiencia en el pathway puede ser replicado en tu vida profesional, gracias por vivir y compartir tu viaje en Teaching Path, sigue el camino al exito</p>
    <h3>¡Felicidades, ya tiene un nuevo trofeo del pathway {{name}}! 👏🥳🥳. Visita tu panel para observar los emblemas el trofeo del pathway.</h3>
    `,
  }
};

const transporter = nodemailer.createTransport({
  service: 'Godaddy',
  host: "smtpout.secureserver.net",  
  secureConnection: false,
  port: 465,
  auth: {
      user: "assistant@teachingpath.info",
      pass: "Rauloko250360." 
  }
});

const mailOptions = {
  from: '"Teaching Path 🎓" <assistant@teachingpath.info>',
  to: "assistant@teachingpath.info",
  subject: "",
  html: "",
};

async function sendemailHandler(req, res) {
  console.log("sendemailHandler....");
  if (req.method === "GET") {
    try {
      const template = templates[req.query.template];
      const output = Mustache.render(template.body, req.query);
      mailOptions.html = output;
      mailOptions.subject = template.subject;
      mailOptions.to = req.query.email;
      console.log("sending....");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.send(500, error);
        } else {
          console.log("Email sent");
          res.status(200).json({ result: "OK" });
        }
      });
    } catch (err) {
      res.status(403).send(err.message);
    }
  }
}

export default sendemailHandler;
