import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useWindowSize from "./useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfFile }) => {
  const windowSize = useWindowSize();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onPageLoadSuccess({ pageNumber }) {}

  function movePreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function moveNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  const handleOnWheel = (e) => {
    // if (e.nativeEvent.wheelDelta > 0) {
    //   movePreviousPage();
    // } else {
    //   moveNextPage();
    // }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      movePreviousPage();
    } else if (e.key === "ArrowRight") {
      moveNextPage();
    }
  };

  return (
    <div>
      <div
        style={{ height: windowSize.height * 0.8, overflowY: "scroll" }}
        tabIndex={0}
      >
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              width={windowSize.width * 0.4}
              height={windowSize.height * 0.65}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onLoadSuccess={onPageLoadSuccess}
            />
          ))}
        </Document>
        {/* <div>
          <div>
            <button onClick={movePreviousPage}>←</button>
            <span>
              {pageNumber} / {numPages}
            </span>
            <button onClick={moveNextPage}>→</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PdfViewer;
