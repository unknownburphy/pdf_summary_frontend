import FileSaver from "file-saver";
import CopyToClipboard from "react-copy-to-clipboard";
import PdfViewer from "../components/PdfViewer";

const Summary = ({ summary, pdfFile }) => {
  // if no summary is provided
  if (!summary) {
    return <div>there is no summary available</div>;
  }
  // function to save text as a .txt file
  const handleExportTxt = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "summary.txt");
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
          className="w-2/3 h-full p-6 flex items-center justify-center overflow-auto"
          // style={{ height: "calc(100vh - 2rem)" }}
        >
          <PdfViewer pdfFile={pdfFile}></PdfViewer>
        </div>
        <div
          id="summary-text-area-wrapper"
          className="w-1/3 p-6 h-full flex flex-col"
        >
          <div
            id="summary-text-area"
            className="bg-white max-h-96 overflow-auto rounded-md shadow-md p-4"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            <div>{summary}</div>
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
              export
            </button>
            <CopyToClipboard
              id="summary-text-area-copy-button"
              className="button p-2 mb-2"
              text={summary}
              onCopy={() => alert("copied to clipboard")}
            >
              <button>Copy</button>
            </CopyToClipboard>
            <button className="button p-2 mb-2">some button</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;
