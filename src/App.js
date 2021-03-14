import FileUpload from "./FileUpload";
import ResultCard from "./ResultCard";
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";

const mockData = [
  { title: "车牌", result: "沪12345" },
  { title: "车型", result: "特斯拉M3" },
];

function App() {
  const [imgUrl, setURL] = useState(
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  );

  const switchMode = (e) => {
    console.log(e.target.value);
  };

  const setRes = (url) => {
    setURL(url);
  };

  return (
    <div className="app">
      <div className="upload">
        <FileUpload switchMode={switchMode} setRes={setRes}></FileUpload>
      </div>
      <div className="result">
        <ResultCard
          loading={false}
          resData={mockData}
          imgUrl={imgUrl}
        ></ResultCard>
      </div>
    </div>
  );
}

export default App;
