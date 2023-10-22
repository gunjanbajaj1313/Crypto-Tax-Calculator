import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav/Nav";
import Calculator from "./components/Calculator/Calculator";
import Faqs from "./components/Faqs/Faqs";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Calculator />
      <Faqs />
      <Footer />
    </div>
  );
}

export default App;
