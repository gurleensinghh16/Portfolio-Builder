import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/about";
import TemplateShowcase from "./components/templateshowcase";
import HowItWorks from "./components/howitworks";
import Footer from "./components/footer";
import Preview from "./pages/preview";

import Templates from "./pages/templates";
import Create from "./pages/create";

import "./App.css";

function HomePage() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/templates" element={<Templates />} />

        {/* We'll create this page next */}
        <Route path="/create" element={<Create />} />
        
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;