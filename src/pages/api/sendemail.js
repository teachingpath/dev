const nodemailer = require("nodemailer");
const Mustache = require("mustache");

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: "assistant@teachingpath.info",
    pass: "Loschuchis88.",
  },
});

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
    <center>assistant@teachingpath.info</center>
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
    <center>assistant@teachingpath.info</center>
    
    `,
  },
  "start-pathway": {
    subject: "El Pathway a Iniciado 💪",
    body: ` 
    <h2>Has comenzado el viaje con el Pathway <i>{{name}}</i></h2>
    <p> Tener en cuenta que este pathway puedes apoyarte de tu Mentor para acelerar el proceso de aprendizaje. Sigue todas las recomendaciones y las instrucciones dentro del pathway de eso depende el exito del pathway.
    </p>
    <h3>¡Felicidades, vas por buen camino! 👏🥳🥳</h3>
    <blockquote>Ya iniciaste este viaje, dedicale un tiempo prudente y continuo a este proceso de crecimineto profesional, saca algunas horas al dia para trabajar este pathway, recuerda que puedes también comunicarte con el Mentor de este pathway, ¡exitos!.</blockquote>
    `,
  },
  "finish-runner": {
    subject: "Has completado con exito la ruta 💪",
    body: ` 
    <h2>Excelente trabajo, has culminado la Ruta <i>{{name}}</i> de forma exitosa</h2>
    <p>Ahora debes continuar con la siguiente Ruta y finalizar el Pathway</p>
    <h3>¡Felicidades, vas por buen camino! 👏🥳🥳</h3>
    <blockquote>Si no has terminado el pathway te invito a continuar con el siguiente runner.</blockquote>
    `,
  },
  "feedback": {
    subject: "Te hicieron una revisión",
    body: `
    <p>Saludo Aprendiz, te han realizado una retroalimentación a una respuesta tuya dentro de teachingpath.dev.</p>
    <p>El Mentor te reviso la lección: <b>{{track}}</b></p>
    <p><i>{{resp}}</i></p>
    <h3>Retroalimentación:</h3>
    <p><i>{{feedback}}</i></p>
    <h3>Calificación: {{score}}</h3>
    <blockquote>Responder a este correo para conseguir mas información</blockquote>
    `,
  },
  "finish-pathway": {
    subject: "Has completado con exito el Pathway 👏🥳🥳",
    body: ` 
    <h2>Has superado el Pathway <i>{{name}}</i>, excelente trabajo</h2>
    <p>Completaste el Pathway, te felicito, tu experiencia en el pathway puede ser replicado en tu vida profesional, gracias por vivir y compartir tu viaje en Teaching Path, sigue el camino al exito</p>
    <h3>¡Felicidades, ya tiene un nuevo trofeo del pathway {{name}}! 👏🥳🥳. Visita tu panel para observar los emblemas el trofeo del pathway.</h3>
    <blockquote>Es lo que esperaba de ti, que pudieras lograr este pathway ahora puedes ver dentro de tu panel de usuario el trofeo que pudiste conseguir, ¡te felicito!.</blockquote>
    `,
  },

  "new-member-to-pathway": {
    subject: "Nuevo aprendiz dentro del pathway",
    body: ` 
    <h2>Tienes un nuevo aprendiz dentro del pathway</h2>
    <p><b>{{name}}</b> ha iniciado el pathway <i>{{pathway}}</i></p>
    <blockquote>¡Felicidades! poco a pocos vas teniendo mas aprendices y así facilitarles el proceso formativo gracias a tu esperiencia</blockquote>
    `,
  },

  "new-response-to-hacking": {
    subject: "Nueva respuesta al hacking",
    body: ` 
    <h2>Hay un respuesta al hacking</h2>
    <p><b>{{name}}</b> ha respondido al hacking <u>{{hackingName}}</u></p>
    <p>Puede ver el resultado dentro del resumen del aprendiz entrando <a href="//{{host}}/pathway/resume?id={{id}}">AQUÍ</a></p>
    `,
  }
};

async function sendemailHandler(req, res) {
  if (req.method === "GET") {
    try {
      const template = templates[req.query.template];
      const output = Mustache.render(template.body, req.query);
      const from =  "Teaching Path 🎓 <assistant@teachingpath.info>";
      const info = await transporter.sendMail({
        from: from,
        replyTo: req.query.replyTo,
        to: req.query.email,
        subject: template.subject,
        html: output,
      });
      res.status(200).json({ result: "OK", info });
    } catch (err) {
      console.error(req.query, err);
      res.status(403).send(err.message);
    }
  }
}

export default sendemailHandler;
