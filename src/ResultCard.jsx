import { Card } from 'antd';
import React  from 'react';

export default function ResultCard({loading, resData, imgUrl}){

    return <Card style={{ width: 500}} cover={
        <img
          alt="example"
          src={imgUrl}
        />} loading={loading} >

        {Array.isArray(resData) ? resData.map(v => (<div key={v.Plate}>
          <span>车型：{v.Category}</span> &emsp;
          <span>车牌: {v.Plate } </span> &emsp;
          <span>品牌: {v.Brand } </span>
        </div>)) : (<span>车轴数： {resData.axle}</span>) }
       
    </Card>;
}