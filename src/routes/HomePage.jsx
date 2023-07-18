import { useNavigate } from "react-router";
import { useState } from "react";

const Home = ({ onReceiveSummary }) => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // TODO:
    // 1. extract text from pdf file (selected file)
    // 2. make summary from extracted text
    // 3. this will happen in loading page
    // 4. if loading is completed, give summary data to App.js
    // 5. Finally, navigate to the summary page
    const dummySummary = "this is a dummy summary";

    onReceiveSummary(dummySummary);

    navigate("/summary");
  };

  return (
    <div id="work-area-wrapper" className="h-96">
      <div id="work-area">
        <div id="work-area-container-dropzone">
          <div>
            <div>title</div>
            <div>subtitle</div>
          </div>
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="bg-teal-200"
            />
            <button onClick={handleSubmit}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
