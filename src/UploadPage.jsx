import { Upload, Progress, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import "./UploadPage.css";
import { useState } from "react";
import {float2percent, useForceUpdate} from "./utils"


const ip = "100.64.210.94:5000";
const url = `http://${ip}/uploadFiles`;

let cacheList = [];
let controlParas = {
  lastIndex: 0, 
  uploadLimit: 2,
  totalPics: 0
}

export default function UploadPage({releasePics, appendPic, setRes, nextStage }) {
  const forceUpdate = useForceUpdate();
  const [uploadEnable, setEnable] = useState(true);

  const onChange = ({ file, fileList }) => {
    // release picture blob hold by URL.createObjectURL
    releasePics();
    // reset control paras
    controlParas = {
      lastIndex: 0, 
      uploadLimit: 2,
      totalPics: fileList.length
    }
    cacheList = [];
    fileList.length = 0;  // hack: because fileList is accumulated
    setEnable(false);
  };

  const onStart = (file)=> {
    // console.log("onStart", file, file.name);
  }
  const onError = (err) => {
    console.log("onError", err);
  }

  const onSuccess = () => {
    sendRequst();
  };


  const sendRequst = () => {
    let {uploadLimit, lastIndex, totalPics} = controlParas;
    console.log(cacheList.length, uploadLimit, totalPics, lastIndex);
    if(cacheList.length === 0) {
      if(totalPics > 0) {
        nextStage();
        console.log("cache empty");
      }
      return
    }
    else if(cacheList.length < (totalPics - lastIndex)) {
      console.log("wait for sending", cacheList);
      return;
    } 

    console.log("start sending", cacheList);

    const formData = new FormData();
    const start = lastIndex, end = lastIndex+ Math.min(uploadLimit, cacheList.length)  -1;
    formData.append("start", start.toString());
    formData.append("end", end.toString());
    cacheList.splice(0, end-start+1).forEach((file, index) => {
      formData.append((lastIndex + index).toString(), file);
    })

    axios
      .post(url, formData)
      .then((res) => {
        console.log("SUCCESS", res);
        setRes(res.data.res);
        controlParas.lastIndex = end+1;
        sendRequst();
        forceUpdate();
      })
      .catch((err) => {
        onError(err);
      })
      .finally();
  }


  const uploadFile = ({ file, onSuccess }) => {
    const img_url = URL.createObjectURL(file);
    appendPic(img_url);
    cacheList.push(file);
    onSuccess();
  };

  return (
    <div>
      <div className="upload-area">
        <Spin spinning={!uploadEnable}>
          <Upload.Dragger showUploadList={false}
            directory
            customRequest={uploadFile}
            onStart={onStart}
            onSuccess={onSuccess}
            onChange={onChange}       
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽上传文件夹</p>
            {/* <p className="ant-upload-hint">
              算法模型将处理分析文件夹中的所有图像的人脸数据，可能需要一段时间。请耐心等待。。。
            </p> */}
          </Upload.Dragger>
        </Spin>
      </div>
      
      <div className="upload-info">
        <Progress percent={float2percent(controlParas.lastIndex/controlParas.totalPics, 0)} status="active" ></Progress> 
        <div className="upload-status">
          <span>总计{controlParas.totalPics}张</span> &nbsp;
          <span>当前已处理{controlParas.lastIndex}张</span>
        </div>       
      </div>
      
    </div>
  );
}
