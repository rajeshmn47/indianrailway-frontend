import "@/styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Component {...pageProps} />;
}
