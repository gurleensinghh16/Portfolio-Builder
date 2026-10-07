import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/about";
import TemplateShowcase from "./components/templateshowcase";
import HowItWorks from "./components/howitworks";
import Footer from "./components/footer";
import Preview from "./pages/preview";
import Templates from "./pages/templates";
import Create from "./pages/create";
import Login from "./pages/login";

import { useAuth } from "./lib/AuthContext";
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

// Redirects to /login if user is not signed in
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/login" element={<Login />} />

        {/* Protected — must be logged in */}
        <Route path="/create" element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        } />
        <Route path="/preview" element={
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;