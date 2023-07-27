import FileSaver from "file-saver";
import CopyToClipboard from "react-copy-to-clipboard";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { ReactMarkdownProps } from "react-markdown";
import PdfViewer from "../components/PdfViewer";

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
  }, [summary]);

  // function to save text as a .txt file
  const handleExportTxt = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "summary.txt");
  };

  const handleScroll = (e) => {
    // 여기에 스크롤 이벤트에 대한 핸들러 코드를 작성
    console.log("Scroll event", e);
  };

  const handleMouseOver = (e) => {
    // 여기에 마우스 오버 이벤트에 대한 핸들러 코드를 작성
    console.log("Mouse over event", e);
  };

  return (
    <div
      id="summary-area-wrapper"
      className="flex items-center justify-center h-screen w-full p-16 bg-gray-200"
    >
      <div
        id="summary-area"
        className="flex w-full h-full bg-light rounded-lg shadow-lg overflow-hidden"
      >
        <div
          id="summary-pdf-area-wrapper"
          className="w-1/2 h-full p-6 flex items-center justify-center overflow-auto"
          // style={{ height: "calc(100vh - 2rem)" }}
        >
          <PdfViewer pdfFile={pdfFile}></PdfViewer>
        </div>
        <div
          id="summary-text-area-wrapper"
          className="w-1/2 p-6 h-full flex flex-col"
        >
          <div
            id="summary-text-area"
            className="bg-white h-full overflow-auto rounded-md shadow-md p-4"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            <div>
              {isEdit ? (
                <MDEditor
                  value={value}
                  onChange={setValue}
                  preview="edit"
                  height={500}
                />
              ) : (
                <MDEditor.Markdown
                  source={value}
                  style={{
                    maxHeight: "500px",
                    overflowY: "scroll",
                    padding: "10px",
                    border: "1px solid black",
                  }}
                />
              )}
              <div className="button">
                {isEdit ? (
                  <button
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    편집 종료
                  </button>
                ) : (
                  <button onClick={() => setIsEdit(true)}>Edit</button>
                )}
              </div>
            </div>
          </div>
          <div
            id="summary-text-area-buttons"
            className="flex justify-between px-20"
          >
            <button
              id="summary-text-area-export-button"
              className="button p-2 mb-2"
              onClick={handleExportTxt}
            >
              텍스트 파일로 내보내기
            </button>
            <CopyToClipboard
              id="summary-text-area-copy-button"
              className="button p-2 mb-2"
              text={summary}
              onCopy={() => alert("클립보드로 복사되었습니다")}
            >
              <button>클립보드로 복사하기</button>
            </CopyToClipboard>
            <button className="button p-2 mb-2">이것도 채워야겠지?</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;
