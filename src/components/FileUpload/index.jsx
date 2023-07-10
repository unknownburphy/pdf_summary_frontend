import React, { useState } from "react";
import { convertPdfToText } from "../Functions/pdfconverter";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileUrl(event.target.result);
      // convertPdfToText(fileUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (fileUrl == null) {
      console.log("No file selected");
    } else {
      convertPdfToText(fileUrl);
      // extractedChars가 추출된 txt. 이걸 동현이 함수에 넣으면 됨 ㅋ
      // console.log(extractedChars);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className="bg-teal-200" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
