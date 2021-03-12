import { Upload, Button, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

export default function FileUpload(){
  return <div>
    <Radio.Group defaultValue="a" style = {{marginRight: "175px"}}>
      <Radio.Button value="a">Car</Radio.Button>
      <Radio.Button value="b">People</Radio.Button>
    </Radio.Group>
    
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
    >       
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>   
  </div>
}