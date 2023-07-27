import { useNavigate } from "react-router";
import { useState } from "react";
import langchainSummary from "../Functions/langchainSummary";
import { BarLoader } from "react-spinners";

const Home = ({ onReceiveSummary, setPdfFile }) => {
  /* Logic

  1. Drag and drop PDF file / Click to select PDF file
      Drag and Drop : 'handleDragOver()' -> 'handleDrop()' -> 'handleFileChange()'
      Click to select : 'handleFileChange()'

  2. Show selected file name and summary start button
      'handleFileChange()' -> 'setSelectedFile()' and 'setFileUrl()'
      if 'selectedFile' exists, show 'selectedFile.name' and summary start button

  3. When summary start button clicked
      'loading' set to true -> loading bar appears
      'handleSubmit()' -> 'langchainSummary()' send fileUrl to get summary
      send 'response.intermediateSteps' to 'onReceiveSummary' to set summary of App.js
      show 'go to check' button

  4. When 'go to check' button clicked
      navigate to '/summary'

  */

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // to show loading bar
  const [fileUrl, setFileUrl] = useState(null);
  const [showGoToCheck, setShowGoToCheck] = useState(false); // to show go to check button

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setPdfFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }

    setLoading(true);
    const res = await langchainSummary(fileUrl);
    onReceiveSummary(res.intermediateSteps, res.text);
    setLoading(false);
    setShowGoToCheck(true);
  };

  const handleGoToCheck = () => {
    navigate("/summary");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="bg-red-300 gap-12 h-full w-full flex flex-col items-start justify-between px-20 py-16 border-b-2 border-zinc-100">
      <div id="work-area">
        <div id="work-area-container-dropzone">
          <div className="flex-col justify-start items-start flex">
            <div className="text-[60px] font-black flex flex-col text-key ">
              시험공부할 때 PDF 요약하려면?
            </div>
            <div id="subtitle" className="text-[2opx] font-r text-light">
              텍스트가 많은 PDF를 요약할 때, PDF Summary로 간단하게 요약하고
              편하게 내용을 확인하세요.
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        {!selectedFile && !loading && (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-[3px] border-key border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-m text-gray-500 dark:text-gray-400">
                <span className="font-semibold">클릭해서 파일선택</span> 또는
                드래그 하세요!
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </label>
        )}

        {selectedFile && !loading && !showGoToCheck && (
          <div className="flex-col justify-start items-start flex w-full">
            <div className="flex flex-col items-center justify-center w-full h-64 border-[3px] border-key border-dashed rounded-lg cursor-pointer bg-gray-50 ">
              <div className="text-[60px] font-black flex flex-col text-key">
                {selectedFile.name}
              </div>
              <button onClick={handleSubmit}>Summary Start</button>
            </div>
          </div>
        )}

        {loading && (
          <div>
            <div>
              요약중입니다... 30장 이상의 파일은 1분 이상의 시간이 소요될 수
              있습니다
            </div>
            <div>
              <BarLoader height={30} width={900} color="#00798C" />
            </div>
          </div>
        )}

        {showGoToCheck && (
          <div>
            <div>요약이 완료되었습니다!</div>
            <button onClick={handleGoToCheck}>확인하러 가기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
