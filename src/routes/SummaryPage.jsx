import FileSaver from "file-saver";
import CopyToClipboard from "react-copy-to-clipboard";

const Summary = ({ summary }) => {
  // if no summary is provided
  if (!summary) {
    return <div>there is no summary available</div>;
  }
  // function to save text as a .txt file
  const exportTxt = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "summary.txt");
  };

  return (
    <div id="summary-area-wrapper" className="h-96">
      <div className="h-36">Summary Completed!</div>
      <div className="flex items-center justify-between w-full">
        <div>{summary}</div>
        <div className="flex-col items-center justify-between">
          <button className="button" onClick={() => exportTxt()}>
            export
          </button>
          <CopyToClipboard
            className="button"
            text={summary}
            onCopy={() => alert("copied to clipboard")}
          >
            <span>Copy</span>
          </CopyToClipboard>
          <button>c</button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
