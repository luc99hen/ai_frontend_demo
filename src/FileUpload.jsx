import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
// import { useState, useEffect } from "react";

const ip = "100.64.210.94:5000";
const url = `http://${ip}/uploadFiles`;

let controlParas = {
  lastIndex: 0, 
  uploadLimit: 1,
  cacheList: [],
  totalPics: 0
};

export default function FileUpload({releasePics, appendPic, setRes, setLoading }) {

  const onChange = ({ file, fileList }) => {
    // release picture blob hold by URL.createObjectURL
    releasePics();
    // reset control paras
    controlParas = {
      lastIndex: 0, 
      uploadLimit: 1,
      cacheList: [],
      totalPics: fileList.length
    }
    fileList.length = 0;  // hack: because fileList is accumulated
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
    const {uploadLimit, lastIndex, cacheList, totalPics} = controlParas;
    console.log(cacheList.length, uploadLimit, totalPics, lastIndex);
    if(cacheList.length === 0) {
      console.log("cache empty");
      return
    }
    else if(cacheList.length < (totalPics - lastIndex)) {
      console.log("wait for sending", cacheList);
      return;
    } 

   
    console.log("start sending", cacheList);
    
    // setLoading(true);

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
        controlParas.uploadLimit = uploadLimit*2;
        if(cacheList.length > 0){
          console.log("next request");
          sendRequst();
        }
      })
      .catch((err) => {
        onError(err);
      })
      .finally();
  }


  const uploadFile = ({ file, onSuccess }) => {
    const img_url = URL.createObjectURL(file);
    appendPic(img_url);
    controlParas.cacheList.push(file);
    onSuccess();
  };

  return (
    <div>
      <Upload
        showUploadList={false}
        directory
        customRequest={uploadFile}
        onStart={onStart}
        onSuccess={onSuccess}
        onChange={onChange}
        className="upload-select"
      >
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </div>
  );
}
