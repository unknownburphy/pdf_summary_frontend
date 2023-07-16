import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className="bg-teal-200" />
      <button onClick={() => console.log(selectedFile)}>Upload</button>
    </div>
  );
};

export default FileUpload;
