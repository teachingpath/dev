import Document, {Head, Html, Main, NextScript} from "next/document"
import PAGE from "config/page.config"

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href={PAGE.favicon} rel="shortcut icon" type="image/x-icon"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@200;300;400;500;600&family=Roboto+Mono&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css"/>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>

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
