import React from "react";
import App, { AppProps } from "next/app";
import "../styles/global.scss";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return <Component {...pageProps} url={router} />;
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default App;
