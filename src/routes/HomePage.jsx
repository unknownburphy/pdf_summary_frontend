import FileUpload from "../components/FileUpload";

const Home = () => {
  return (
    <div id="work-area-wrapper" className="h-96">
      <div id="work-area">
        <div id="work-area-container-dropzone">
          <div>
            <div>title</div>
            <div>subtitle</div>
          </div>
          <div>
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
