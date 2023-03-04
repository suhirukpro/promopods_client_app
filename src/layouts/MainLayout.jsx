import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="main-content-wrapper">
        <div className="content-area fade-container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
