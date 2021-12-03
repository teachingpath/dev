import Document, { Head, Html, Main, NextScript, Script } from "next/document";
import PAGE from "config/page.config";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href={PAGE.favicon} rel="shortcut icon" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@200;300;400;500;600&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/monokai-sublime.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>
          <script>hljs.highlightAll();</script>
          <script
            src="https://kit.fontawesome.com/1f858e8509.js"
            crossOrigin="anonymous"
          ></script>

          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Aprende java, javascript, python, patrones de diseño, arquitectura de software, principios de programación, buenas practicas, programación, desarrollo de software y mucho más gracias a los pathways y a las rutas de aprendizaje"
          />
          <meta
            name="keywords"
            content="aprende programación, diseño de patrones, arquitectura, aprende facil, aprende con rutas de aprendizaje, mentoria, coaching, java, angular, javascript, react, python, reactring, codigo limpia, codigicación, cursos, lecciones de progrmación, colombia, medellin, cali, bogota, barranquilla"
          />
          <meta name="author" content="Raul A. Alzate" />
          <meta
            name="copyright"
            content="Propietario del teaching path - raul andres alzate gomez"
          />
          <meta httpEquiv="cache-control" content="no-cache" />
        </Head>
        <body className="theme-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
