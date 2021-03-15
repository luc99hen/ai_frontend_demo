import { Card } from 'antd';
import React  from 'react';

export default function ResultCard({loading, resData, imgUrl}){

    return <Card style={{ width: 500}} cover={
        <img
          alt="example"
          src={imgUrl}
        />} loading={loading} >

        {resData.map(v => (<div key={v.title}>
          <span>{v.title}：</span>
          <span>{v.result instanceof Array ? v.result.join(", ") : v.result} </span>
        </div>))}
       
    </Card>;
}