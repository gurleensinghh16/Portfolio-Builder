import Navbar from "./components/navbar";
import Home from "./components/Home";
import About from "./components/about";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <About />
    </div>
  );
}
export default App;