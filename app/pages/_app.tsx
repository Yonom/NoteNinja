import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/themes/light-theme.css";
import "../styles/themes/dark-theme.css";
import "../styles/globals.css";
import "../styles/prose.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Head>
        <title>NoteNinja</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </TooltipProvider>
  );
}
export default App;
