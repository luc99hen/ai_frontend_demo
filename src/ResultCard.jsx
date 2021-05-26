import { Card } from 'antd';

export default function ResultCard({loading, resData, className}){

    return <Card className={className} title="识别结果:" bordered={true}>
        <div>分类：</div>
        <div>人种：</div>
    </Card>;
}