import { Upload, Button, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import {server_ip, defaultFileList} from "./config"

const uploadProps = {
  multiple: false,
  listType: "picture",
  onStart(file) {
    console.log("onStart", file, file.name);
  },
  onError(err) {
    console.log("onError", err);
  },
  onProgress({ percent }, file) {
    console.log("onProgress", `${percent}%`, file.name);
  },
};

export default function FileUpload({ setImage, setRes, setLoading }) {
  const [port, setURL] = useState("5000");
  const [allFiles, setFiles] = useState(defaultFileList);

  const switchMode = (e) => {
    const mode = e.target.value;
    if (mode === "axle") {
      setURL("5001");
    } else {
      setURL("5000");
    }
  };

  const onChange = ({ file, fileList }) => {
    console.log(file);
    if (!file.category) {
      file.category = port === "5000" ? "type" : "axle";
      setFiles([...allFiles, file]);
    }
  };

  const onRemove = (file) => {
    setFiles(allFiles.filter((e) => e.uid !== file.uid));
  };

  const onSuccess = (res, file) => {
    console.log("onSuccess", res, file.name);
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
    console.log(file);
    setImage(url);

    setLoading(true);

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          );
        },
      })
      .then(({ data: response }) => {
        let GetImgHeader = new Headers();
        GetImgHeader.append('pragma', 'no-cache');
        GetImgHeader.append('cache-control', 'no-cache');

        let header = {
          method: 'GET',
          headers: GetImgHeader,
        };

        fetch(`http://${server_ip}:${port}/getImg`, header)
          .then(res => res.blob())
          .then(img => setImage(URL.createObjectURL(img)))
        onSuccess(response, file);
        setLoading(false);
      })
      .catch(() => {
        onError();
        setLoading(false);
        setRes([]);
      });

    return {
      abort() {
        console.log("upload progress is aborted.");
      },
    };
  };

  return (
    <div>
      <Upload
        {...uploadProps}
        fileList={allFiles.filter(
          (e) => e.category === (port === "5000" ? "type" : "axle")
        )}
        action={`http://${server_ip}:${port}/upload`}
        customRequest={customRequest}
        onSuccess={onSuccess}
        onChange={onChange}
        onRemove={onRemove}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <Radio.Group
        className="upload-select"
        defaultValue="type"
        onChange={switchMode}
      >
        <Radio.Button value="type">Type</Radio.Button>
        <Radio.Button value="axle">Axle</Radio.Button>
      </Radio.Group>
    </div>
  );
}
