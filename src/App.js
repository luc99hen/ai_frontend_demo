import FileUpload from "./FileUpload";
import ResultCard from "./ResultCard";
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";

const mockData = [
  { "Plate": "ABCDT", "Category": "大熊" },
];

function App() {
  const [imgUrl, setURL] = useState(
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  );

  const [res, setRes] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const setImage = (url) => {
    URL.revokeObjectURL(imgUrl);  // release previous URL file
    setURL(url);
  };

  const setPredict = (res) => {
    setRes(res);
  };

  return (
    <div className="app">
      <div className="upload">
        <FileUpload
          setImage={setImage}
          setRes={setPredict}
          setLoading={setLoading}
        ></FileUpload>
      </div>
      <div className="result">
        <ResultCard
          loading={loading}
          resData={res}
          imgUrl={imgUrl}
        ></ResultCard>
      </div>
    </div>
  );
}

export default App;
