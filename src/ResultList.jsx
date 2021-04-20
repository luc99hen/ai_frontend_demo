import { Table } from 'antd';
import React  from 'react';


const columns = [
  {
    title: '图片名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '分类',
    key: 'type',
    dataIndex: 'type',
  }
];


export default function ResultList({loading, resData}){
    return <Table columns={columns} dataSource={resData} loading={loading} pagination={false}/>;
} 