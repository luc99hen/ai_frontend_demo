import { Card } from 'antd';
import React  from 'react';

export default function ResultCard({loading, resData, imgUrl}){

    return <Card style={{ width: 500}} cover={
        <img
          alt="example"
          src={imgUrl}
        />} loading={loading} >

        {resData.map(v =>
          <div>{Object.keys(v).filter(key => (key!=="key" && key!=="name"))
          .map(
            (key) => (<span> {key}:&nbsp;{v[key]} &nbsp;&nbsp; </span> ))
          }</div>
        )
        }
       
    </Card>;
}