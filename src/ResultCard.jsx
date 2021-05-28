import { Card } from 'antd';

export default function ResultCard({ result }){

    return <Card className="upload-res" title="识别结果:" bordered={true} loading={!result}>
        {result ? <div>
            <div>分类：{result.type}</div>
            <div>人种：{result.race}</div>
            <div>置信度： {result.confidence}</div>
        </div> : null} 
    </Card>;
}