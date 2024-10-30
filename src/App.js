import Canvass from "./Canvass";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="mainContent">
        <Header />
        <Canvass />
        <Footer />
      </div>
    </div>
  );
}

export default App;
