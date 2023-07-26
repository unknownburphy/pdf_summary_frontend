import FileSaver from "file-saver";
import CopyToClipboard from "react-copy-to-clipboard";
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react";
import {ReactMarkdownProps} from 'react-markdown'
const Summary = ({ summary }) => {
  const [value,setValue] = useState(summary)
  const [isEdit, setIsEdit] = useState(false);
  // if no summary is provided
  if (!summary) {
    return <div>there is no summary available</div>;
  }
  // function to save text as a .txt file
  const exportTxt = () => {
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
    <div id="summary-area-wrapper" className="h-96">
      <div className="h-36">Summary Completed!</div>
      <div className="flex items-center justify-between w-full">
      <div className="container">
        {isEdit ? (<MDEditor
        value={value}
        onChange={setValue}
        preview="edit"
      />) : ( <MDEditor.Markdown source={value} style={ {maxHeight: '500px', // 미리보기 박스 높이 설정
    overflowY: 'scroll', // 스크롤 설정
    padding: '10px', // 패딩 설정
    border: '1px solid black'} // 테두리 설정
  } onScroll={handleScroll} onMouseOver={handleMouseOver}
  />)} 
      <div  className="button">
        {isEdit ? (<button onClick={() => {
                  setIsEdit(false);
                  setValue(value);
                }}>Done</button>):
        (<button onClick={() => setIsEdit(true)}>
        Edit
      </button>)
    }
      </div>
      </div>
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
