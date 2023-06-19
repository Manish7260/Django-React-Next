import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="European Travel Destinations" />

                    <meta name="og:title" property="og:title" content="Yoyoboat" />
                    <meta name="og:description" property="og:description" content="European Travel Destinations" />

                    <meta property="og:image" content="/images/YoYoBoat_Logo.png" />
                    <meta property="og:url" content="" />

                    <link href="/fonts/stylesheet.css" rel="stylesheet"></link>
                    <link rel="icon" href="/images/yoyoboat.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
