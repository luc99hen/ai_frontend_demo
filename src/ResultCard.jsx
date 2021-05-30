import { Card } from 'antd';
import { float2percent } from "./utils"

export default function ResultCard({ result }){

    return <Card className="upload-res" title="识别结果" bordered={true} loading={!result}>
        {result ? <div style={{fontSize: 40, fontWeight: 800, textAlign: 'center'}}>
            <div>人种：{result.race}</div>
            <div>置信度： {float2percent(result.confidence, 2)}%</div>
        </div> : null} 
    </Card>;
}