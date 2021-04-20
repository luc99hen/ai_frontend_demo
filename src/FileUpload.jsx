import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

let defaultFileList = [
  {
    uid: "-1",
    name: "xxx.png",
    status: "done",
    url:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "-2",
    name: "yyy.png",
    status: "error",
  },
];

const uploadProps = {
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

export default function FileUpload({ setImage, setRes, setLoading, path, loading }) {
  const [allFiles, setFiles] = useState(defaultFileList);


  const onChange = ({ file, fileList }) => {
    console.log(file);
    if(path === "file"){
      setFiles(fileList);
    }
  };

  const onRemove = (file) => {
    setFiles(allFiles.filter((e) => e.uid !== file.uid));
  };

  const onSuccess = (res, file) => {
    console.log("onSuccess", res, file.name);
    setRes(res.res);
  };

  const uploadFolder = ({action, file, headers, onProgress}) => {
    
    if(!loading){
      setLoading(true);
      console.log(file.webkitRelativePath);

      const formData = new FormData();
      formData.append("path", file.webkitRelativePath.split("/")[0])
      axios
      .post(action, formData,  {
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          );
        },
      })
      .then((res) => {
        setRes(res.data.res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))

    }
    
  }

  const uploadFile = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
  }) => {
    const url = URL.createObjectURL(file);
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
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          );
        },
      })
      .then(({ data: response }) => {
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
        directory={path === "folder"}
        fileList={allFiles}
        action={`http://localhost:5000/${path}`}
        customRequest={path === "file" ? uploadFile : uploadFolder}
        onSuccess={onSuccess}
        onChange={onChange}
        onRemove={onRemove}
      >
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </div>
  );
}
