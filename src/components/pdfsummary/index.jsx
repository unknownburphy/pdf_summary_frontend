import React, { useState } from "react";
import { convertPdfToText } from "../../Functions/pdfconverter";
import { gptApi } from "../../apis/api";

const Pdfsummary = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    //file select
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileUrl(event.target.result);
      // convertPdfToText(fileUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSummary = async () => {
    if (fileUrl == null) {
      console.log("No file selected");
    } else {
      const prompt = await convertPdfToText(fileUrl); //pdf-text
      const response = await gptApi(prompt); //gpt api req-res
      setResponse(response.data.choices[0].text);
      console.log(response.data);
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="bg-teal-200"
        />
        <button onClick={handleUploadSummary}>Upload</button>
      </div>
      <div>OpenAI Response: {response}</div>;
    </>
  );
};

export default Pdfsummary;
