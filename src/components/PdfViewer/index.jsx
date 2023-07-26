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
        style={{ height: windowSize.height * 0.8, overflowX: "hidden" }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            height={windowSize.height * 0.65}
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onLoadSuccess={onPageLoadSuccess}
            onWheel={handleOnWheel}
          />
        </Document>
        <div>
          <div>
            <button onClick={movePreviousPage}>←</button>
            <span>
              {pageNumber} / {numPages}
            </span>
            <button onClick={moveNextPage}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
