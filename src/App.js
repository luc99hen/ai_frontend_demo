import FileUpload from "./FileUpload";
import ResultCard from "./ResultCard";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="upload">
        <FileUpload></FileUpload>
      </div>
      <div className="result">
        <ResultCard></ResultCard>
      </div>
    </div>
  );
}

export default App;
