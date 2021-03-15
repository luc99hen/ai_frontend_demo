import { Upload, Button, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState } from "react";


const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];


const uploadProps = {
  action: 'http://100.64.217.69:5000/upload',
  multiple: false,
  listType: "picture",
  defaultFileList: fileList,
  headers: {
    Authorization: '$prefix $token',
  },
  onStart(file) {
    console.log('onStart', file, file.name);
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress({ percent }, file) {
    console.log('onProgress', `${percent}%`, file.name);
  }
};



export default function FileUpload({setImage, setRes, setLoading}){

  const [port, setURL] = useState("5000");

  const switchMode = (e) => {
    const mode = e.target.value;
    if(mode === "car"){
      setURL("5001");
    }
    else{
      setURL("5000");
    }
  };

  const onSuccess = (res, file) => {
    console.log('onSuccess', res, file.name);
    setRes(res.res);
  };

  const customRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) => {

    const url = URL.createObjectURL(file);
    setImage(url);

    setLoading(true);

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
        },
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
        setLoading(false);
      })
      .catch(() => {
        onError();
        setLoading(false);
      });

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  }

  return <div>
    <Radio.Group defaultValue="car" style = {{marginRight: "175px"}} onChange={switchMode}>
      <Radio.Button value="car">Car</Radio.Button>
      <Radio.Button value="people">People</Radio.Button>
    </Radio.Group>
    
    <Upload {...uploadProps} action={`http://100.64.217.69:${port}/upload`} customRequest={customRequest} onSuccess={onSuccess}>       
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>   
  </div>
}