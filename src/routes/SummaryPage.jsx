import { useCallback } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Summary = () => {
  const dummyText = "This is a dummy text";

  const exportTxt = useCallback(() => {
    let fileName = "filename.txt";
    const element = document.createElement("a");
    const file = new Blob([dummyText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    // document.body.appendChild(element);
    element.click();
  }, []);

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
