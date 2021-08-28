import Document, {Head, Html, Main, NextScript, Script} from "next/document"
import PAGE from "config/page.config"

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href={PAGE.favicon} rel="shortcut icon" type="image/x-icon"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@200;300;400;500;600&family=Roboto+Mono&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/monokai-sublime.min.css"/>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>
                    <script>hljs.highlightAll();</script>
                    <script src="https://kit.fontawesome.com/1f858e8509.js" crossorigin="anonymous"></script>

                </Head>
                <body className="theme-light">
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
