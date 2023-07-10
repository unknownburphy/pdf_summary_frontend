import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./routes/HomePage";
import SummaryPage from "./routes/SummaryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
