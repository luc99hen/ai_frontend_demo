import FileUpload from "./FileUpload";
import ResultCard from "./ResultCard";
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";

const mockData = [
  { title: "车牌", result: ["1", "23"] },
  { title: "车型", result: "特斯拉M3" },
];

function App() {
  const [imgUrl, setURL] = useState(
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  );

  const [res, setRes] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const setImage = (url) => {
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
