import Footer from '../components/Footer';
import NoticeBar from '../components/NoticeBar';
import Head from 'next/Head';
import ShopBar from '../components/ShopBar';
import WebMenu from '../components/MainMenu';
import Logo from '../components/utilities/Logo';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Laruci</title>
        <meta name="description" content="Laruci Web Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/laruci_logo.ico" />
      </Head>
      <div className="maingrid">
        <NoticeBar />
        <ShopBar />
        <Logo />
        <div className="mainmenu">
          <WebMenu />
        </div>
        <Component {...pageProps} />
        <Footer />
        <div id="backdrop-root" />
      </div>
    </>
  );
}

export default MyApp;
