import Image from "./Image";
import ControlButton from "./ControlButton";
import FileUpload from "./FileUpload"
import ResultCard from "./ResultCard"
import ResultGallary from "./ResultGallary"
import { Button } from 'antd';
import { useState } from "react";
import { PauseOutlined,CaretRightOutlined,ForwardOutlined,FastForwardOutlined,ShrinkOutlined } from "@ant-design/icons";


import p1 from "./images/1.jpg"
import p2 from "./images/2.jpg"
const multiple_src = [p1, p2, 
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
] 

let timer = null, next_src = 1;


export default function Content(){
    const [is_pause, setPause] = useState(false);
    const [show_all, setShowAll] = useState(false);
    const [img_src, setImg] = useState(p1);

    if(!timer){
        timer = setInterval(() => {
            setImg(multiple_src[next_src]);
            next_src = (next_src + 1) % multiple_src.length;
        },1000);
    }

    const all_res = <div>
        <ResultGallary></ResultGallary>
        <Button size="large" className="close-btn" icon={<ShrinkOutlined />} onClick={ () => {
            setShowAll(false);
            const ele = document.getElementById("root");    
            ele.style.height = "100%";
        } }></Button>
    </div>;

    const single_res = <div>   
        <Image src={img_src}></Image>
        <div className="button-group">
            {is_pause ? <ControlButton icon={<PauseOutlined />} /> 
                : <ControlButton icon={<CaretRightOutlined />} /> }
            <ControlButton icon={<ForwardOutlined/>} />
            <ControlButton icon={<FastForwardOutlined />} />
        </div>

        <ResultCard className="upload-res" />
        <FileUpload className="upload-select"></FileUpload>
        <Button className="show-all-btn" onClick={() => { 
            setShowAll(true);
            const ele = document.getElementById("root");    
            console.log(ele);
            ele.style.height = "auto";
        } }>展示所有结果</Button>
    </div>;
    

    return <div>
        {show_all ? all_res : single_res}
    </div>
}