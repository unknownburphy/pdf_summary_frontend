import FileSaver from "file-saver";
import CopyToClipboard from "react-copy-to-clipboard";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import PdfViewer from "../components/PdfViewer";
import Edit from "../assets/images/edit.png";
import Done from "../assets/images/done.png";

const Summary = ({ summary, totalSummary, pdfFile }) => {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // when summary is changed, update value and add "\n" for each line
  useEffect(() => {
    if (!summary) {
      return <div>앗, 요약이 존재하지 않아요</div>;
    }
    let summaryText = "## 전체요약\n" + totalSummary + "\n\n" + "## 세부요약\n";
    for (let i = 0; i < summary.length; i++) {
      summaryText += `### ${i + 1}\n` + summary[i] + "\n\n";
    }
    setValue(summaryText);
  }, [summary, totalSummary]);

  // function to save text as a .txt file
  const handleExportTxt = () => {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "summary.txt");
  };

  // const handleScroll = (e) => {
  //   // 여기에 스크롤 이벤트에 대한 핸들러 코드를 작성
  //   console.log("Scroll event", e);
  // };

  // const handleMouseOver = (e) => {
  //   // 여기에 마우스 오버 이벤트에 대한 핸들러 코드를 작성
  //   console.log("Mouse over event", e);
  // };

  return (
    <div
      id="summary-area-wrapper"
      className="flex items-center justify-center h-full w-full bg-gray-200"
    >
      <div
        id="summary-area"
        className="flex w-full h-full bg-white overflow-hidden"
      >
        <div
          id="summary-pdf-area-wrapper"
          className="w-1/2 h-full bg-gray-50 p-5 flex flex-col items-center justify-center overflow-auto"
          // style={{ height: "calc(100vh - 2rem)" }}
        >
          <div className="w-full h-8 flex flex-row justify-start ml-2 font-pre text-m font-bold text-gray-600 ">
            📚 원본 PDF
          </div>
          <PdfViewer className="w-full" pdfFile={pdfFile}></PdfViewer>
        </div>
        <div
          id="summary-text-area-wrapper"
          className="w-1/2 h-full flex flex-col"
        >
          <div
            id="summary-text-area"
            className="bg-white h-full overflow-auto p-5"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            <div className="flex flex-row justify-center items-center">
              <div className="w-full h-8 flex flex-row ml-2 font-pre text-m font-bold text-gray-600 ">
                🪄요약한 내용
              </div>
              <div>
                {isEdit ? (
                  <button
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    <img
                      id="Done"
                      src={Done}
                      alt="Done"
                      className="max-h-6 mr-4"
                    />
                  </button>
                ) : (
                  <button onClick={() => setIsEdit(true)}>
                    <img
                      id="Edit"
                      src={Edit}
                      alt="Edit"
                      className="max-h-6 mr-4"
                    />
                  </button>
                )}
              </div>
            </div>
            <div>
              {isEdit ? (
                <MDEditor
                  value={value}
                  onChange={setValue}
                  preview="edit"
                  height={600}
                />
              ) : (
                <MDEditor.Markdown
                  source={value}
                  rehypeRewrite={(node, index, parent) => {
                    if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                      parent.children = parent.children.slice(1)
                    }
                  }}
                  style={{
                    maxHeight: "600px",
                    overflowY: "scroll",
                    padding: "10px",
                    margin: "3px",
                    border: "1px solid lightgray",
                    fontFamily: "Pretendard",
                  }}
                />
              )}
            </div>
            <div
              id="summary-text-area-buttons"
              className="flex justify-between w-full h-full gap-3 pt-5"
            >
              <button
                id="summary-text-area-export-button"
                className="w-full h-20 bg-gray-200 mb-2 rounded-md font-pre font-medium text-l text-gray-700 hover:bg-light hover:text-[white] hover:font-bold"
                onClick={handleExportTxt}
              >
                📁 텍스트 파일로 내보내기
              </button>
              <CopyToClipboard
                id="summary-text-area-copy-button"
                className="w-full h-20 bg-gray-200 mb-2 rounded-md font-pre font-medium text-l text-gray-700 hover:bg-light hover:text-[white] hover:font-bold"
                text={value}
                onCopy={() =>
                  alert("클립보드로 복사되었어요! ctrl+v로 붙여넣기 해보세요.")
                }
              >
                <button>📋 클립보드로 복사하기</button>
              </CopyToClipboard>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;
