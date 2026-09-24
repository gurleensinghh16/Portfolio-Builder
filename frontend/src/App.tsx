import TemplateShowcase from "./components/templateshowcase";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import About from "./components/about";
import HowItWorks from "./components/howitworks";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <About />
      <TemplateShowcase />
      <HowItWorks />
      <Footer />
    </div>
  );
}
export default App;