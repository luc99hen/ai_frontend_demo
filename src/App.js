import FileUpload from "./FileUpload";
import ResultCard from "./ResultCard";
import ResultList from "./ResultList"
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";
import {Radio} from "antd"
import { FileImageOutlined, FolderOpenOutlined } from "@ant-design/icons";


function App() {
  const [imgUrl, setURL] = useState(
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  );

  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("file");

  const setImage = (url) => {
    setURL(url);
  };

  const setPredict = (res) => {
    setRes(res);
  };

  const switchMode = (e) => {
    const mode = e.target.value;
    setPath(mode);
  };

  return (
    <div className="app">
      <div className="upload">
        <FileUpload
          setImage={setImage}
          setRes={setPredict}
          setLoading={setLoading}
          loading={loading}
          path={path}
        ></FileUpload>
        <Radio.Group
          className="upload-select"
          defaultValue="file"
          onChange={switchMode}
        >
          <Radio.Button value="file"><FileImageOutlined />文件</Radio.Button>
          <Radio.Button value="folder"><FolderOpenOutlined />文件夹</Radio.Button>
        </Radio.Group>
      </div>
      <div className="result">
        {path === "file" ?
          <ResultCard
            loading={loading}
            resData={res}
            imgUrl={imgUrl}
          ></ResultCard> :
          <ResultList loading={loading} resData={res}/>
        }
        
      </div>
    </div>
  );
}

export default App;
