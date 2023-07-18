import FileSaver from "file-saver";
import CopyToClipboard from "react-copy-to-clipboard";

const Summary = () => {
  // now we are testing with dummyText instead of SummaryText
  const dummyText = "This is a dummy text";

  // function to save text as a .txt file
  const exportTxt = () => {
    const blob = new Blob([dummyText], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "summary.txt");
  };

  return (
    <div id="summary-area-wrapper" className="h-96">
      <div className="h-36">Summary Completed!</div>
      <div className="flex items-center justify-between w-full">
        <div>example</div>
        <div className="flex-col items-center justify-between">
          <button className="button" onClick={() => exportTxt()}>
            export
          </button>
          <CopyToClipboard
            className="button"
            text={dummyText}
            onCopy={() => alert("copied to clipboard")}
          >
            <text>Copy</text>
          </CopyToClipboard>
          <button>c</button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
