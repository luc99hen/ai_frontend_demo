import { Upload, Progress, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import "./UploadPage.css";
import { useState } from "react";
import {float2percent, useForceUpdate} from "./utils"


const ip = process.env.NODE_ENV === "production" ? 
  window.location.hostname : "100.64.210.94";
const url = `http://${ip}:5000/uploadFiles`;

let cacheList = [];
export let controlParas = {
  lastIndex: 0, 
  uploadLimit: 2,
  totalPics: 0
}

export function UploadPage({releasePics, appendPic, setRes, nextStage }) {
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
            <p className="ant-upload-text">??????????????????????????????</p>
            {/* <p className="ant-upload-hint">
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p> */}
          </Upload.Dragger>
        </Spin>
      </div>
      
      <div className="upload-info">
        <Progress percent={float2percent(controlParas.lastIndex/controlParas.totalPics, 0)} status="active" ></Progress> 
        <div className="upload-status">
          <span>??????{controlParas.totalPics}???</span> &nbsp;
          <span>???????????????{controlParas.lastIndex}???</span>
        </div>       
      </div>
      
    </div>
  );
}
