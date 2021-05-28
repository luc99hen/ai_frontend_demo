import {Radio, Card } from "antd"
import { useState } from "react";

function ResCard({res}){
    return <Card
        hoverable
        style={{ width: 240, margin: "10px" }}
        cover={<img alt="example" style={{height: 240}} src={res.url} />}
        loading={!res.data}
    >
        { res.data ?  <Card.Meta title={`置信度：${res.data.confidence}`} /> : null}
  </Card>;
}

// const mockData = [
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
//     {category: "白人", confidence: 0.99},
// ]

export default function ResultGallary({allRes}){

    const [value, setValue] = useState(1);

    const onChange = e => {
        setValue(e.target.value);
    };
    
    return <div className="res-wrapper">
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>白人</Radio>
            <Radio value={2}>黑人</Radio>
            <Radio value={3}>拉美裔</Radio>
            <Radio value={4}>东亚人</Radio>
            <Radio value={5}>东南亚人</Radio>
            <Radio value={6}>印度人</Radio>
            <Radio value={7}>中东人</Radio>         
            <Radio value={8}>其他</Radio>
        </Radio.Group>
        <div className="res-gallary">
            {allRes.map((res, i) =>
                (<ResCard res={res} key={i}></ResCard>)
            )}
        </div>
    </div>;
}