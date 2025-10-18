import "@/styles/globals.css";
// import { AppProps } from "next/app"; // Removed because this is a JS file

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
