import { Upload, Button, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

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
  action: 'https://run.mocky.io/v3/84ae21d7-c07b-427c-b9ba-7f52d33d6a99',
  multiple: false,
  listType: "picture",
  defaultFileList: fileList,
  data: { a: 1, b: 2 },
  headers: {
    Authorization: '$prefix $token',
  },
  onStart(file) {
    console.log('onStart', file, file.name);
  },
  onSuccess(res, file) {
    console.log('onSuccess', res, file.name);
  },
  onError(err) {
    console.log('onError', err);
  },
  onProgress({ percent }, file) {
    console.log('onProgress', `${percent}%`, file.name);
  }
};


export default function FileUpload({switchMode, setRes}){

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
    setRes(url);
    console.log(url);

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
      })
      .catch(onError);

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
    
    <Upload {...uploadProps} customRequest={customRequest}>       
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>   
  </div>
}