import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./routes/HomePage";
import SummaryPage from "./routes/SummaryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const [summary, setSummary] = useState("");

  const handleSummary = (summaryResult) => {
    setSummary(summaryResult);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onReceiveSummary={handleSummary}
                setPdfFile={setPdfFile}
              />
            }
          />
          <Route
            path="/summary"
            element={<SummaryPage summary={summary} pdfFile={pdfFile} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
