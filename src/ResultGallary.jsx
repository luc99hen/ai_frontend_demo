import {Radio, Card, Empty } from "antd"
import { useState } from "react";
import {float2percent} from "./utils"

function ResCard({res}){
    return <Card
        hoverable
        style={{ width: 240, margin: "10px" }}
        cover={<img alt="example" style={{height: 240, objectFit: "cover"}} src={res.url} />}
    >
        { res.data ?  (
            <div>
                <Card.Meta title={res.data.race !== null ? `人种分类：${res.data.race}` : "人种分类：无"} />
                {   res.data.race === null ? null :
                        <Card.Meta title={`置信度：${float2percent(res.data.confidence, 2) }%` } />
                }
            </div>
            ) : null}
  </Card>;
}

export default function ResultGallary({allRes}){

    const [value, setValue] = useState("全部结果");

    const onChange = e => {
        setValue(e.target.value);
    };

    const resFilter = r => {
        if(value === "全部结果")
            return true;
        else if(value === "其他")
            return r.data && r.data.race === null;
        else
            return r.data && r.data.race === value;
    }
    const displayRes = allRes.filter(resFilter);
    

    return <div className="res-wrapper">
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={"全部结果"}>全部结果</Radio>
            <Radio value={"白人"}>白人</Radio>
            <Radio value={"黑人"}>黑人</Radio>
            <Radio value={"拉美裔"}>拉美裔</Radio>
            <Radio value={"东亚人"}>东亚人</Radio>
            <Radio value={"西亚人"}>西亚人</Radio>
            <Radio value={"其他"}>其他</Radio>
        </Radio.Group>
        <div className="res-gallary">
            {  displayRes.length === 0 ?
                (<div style={{margin: "100px auto"}}><Empty></Empty></div>) :
                displayRes.map((res, i) =>
                (<ResCard res={res} key={i}></ResCard>)
            )}
        </div>
    </div>;
}