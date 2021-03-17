import { Upload, Button, Radio } from "antd";
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
    category: "people",
  },
  {
    uid: "-2",
    name: "yyy.png",
    status: "error",
    category: "car",
  },
];

const uploadProps = {
  multiple: false,
  listType: "picture",
  headers: {
    Authorization: "$prefix $token",
  },
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
    if (mode === "car") {
      setURL("5001");
    } else {
      setURL("5000");
    }
  };

  const onChange = ({ file, fileList }) => {
    console.log(file);
    if (!file.category) {
      file.category = port === "5000" ? "people" : "car";
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
          (e) => e.category === (port === "5000" ? "people" : "car")
        )}
        action={`http://100.64.217.69:${port}/upload`}
        customRequest={customRequest}
        onSuccess={onSuccess}
        onChange={onChange}
        onRemove={onRemove}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <Radio.Group
        className="upload-select"
        defaultValue="people"
        onChange={switchMode}
      >
        <Radio.Button value="people">People</Radio.Button>
        <Radio.Button value="car">Car</Radio.Button>
      </Radio.Group>
    </div>
  );
}
