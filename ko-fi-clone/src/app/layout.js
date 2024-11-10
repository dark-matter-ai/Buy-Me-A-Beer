import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        {/* Separator Division */}
        <div className="separator"></div>
        <Footer />
      </body>
    </html>
  );
}
