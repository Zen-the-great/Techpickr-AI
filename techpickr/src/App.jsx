import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WhyUs from "./pages/WhyUs";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import PcPreview from "./pages/PcPreview";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/build" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
        <Route path="/3d" element={<PcPreview />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
