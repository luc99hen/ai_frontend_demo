import { Card } from 'antd';
import React, { useState } from 'react';

const mockData = [
  {title: "车牌", result: "沪12345", confidence: "80%"},
  {title: "车型", result: "特斯拉M3", confidence: "70%"},
]

export default function ResultCard(){
    const [loading, setLoading] = useState(false);

    return <Card style={{ width: 500}} cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />} loading={loading} >

        {mockData.map(v => (<div>
          <span>{v.title}：</span>
          <span>{v.result} &nbsp;&nbsp;</span>
          <span>置信度：{v.confidence}</span>
        </div>))}
       
    </Card>;
}