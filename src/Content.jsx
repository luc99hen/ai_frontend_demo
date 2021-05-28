import Image from "./Image";
import ControlButton from "./ControlButton";
import FileUpload from "./FileUpload"
import ResultCard from "./ResultCard"
import ResultGallary from "./ResultGallary"
import {useForceUpdate} from "./utils"
import { Button } from 'antd';
import { useState } from "react";
import { PauseOutlined,CaretRightOutlined,RadarChartOutlined,FastForwardOutlined,ShrinkOutlined } from "@ant-design/icons";


import p1 from "./images/1.jpg"
import p2 from "./images/2.jpg"
let res = {
    id: 1,
    type: "东亚人",
    race: "东亚人",
    confidence: 0.99
}
const multiple_src = [{"url": p1, "data": res}, {"url": p2, "data": res}, 
    {"url": "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", "data": res}
] 

let timer = null, next_src = 0;


export default function Content(){
    const [detect_mode, setDetect] = useState(false);
    const [show_mode, setShow] = useState("single");   // show_mode: can be single picture or multiple picture
    const [show_all, setShowAll] = useState(false);
    const [cur_img, setImg] = useState(multiple_src[0]);
    const [all_pics, setPics] = useState(multiple_src);
    const forceUpdate = useForceUpdate();


    const nextPic = () => {   
        setImg(all_pics[next_src]);
        next_src = (next_src + 1) % all_pics.length;
    }

    const startPlay = () => {
        setShow("multiple");
        if(!timer){
            timer = setInterval(nextPic, 1000); 
        }
    }

    const stopPlay = () => {
        setShow("single");
        clearInterval(timer);
        timer = null;
    }

    const appendPic = (newPic) => {
        setPics((arr) => [...arr, {"url": newPic, "data": null}]);
        next_src = 0;
    }

    const releasePics = () => {
        if(all_pics.length > 0){
            all_pics.forEach(img => {URL.revokeObjectURL(img.url)})
        }
        setPics([]);
    }

    const setRes = (res) => {
        for(let r of res){
            setPics((pics) => {
                pics[parseInt(r.id)].data = r;
                return pics;
            })
        }
        forceUpdate();
    }

    if(timer && show_mode === "single"){
        clearInterval(timer);
    }

    const all_res = <div>
        <ResultGallary allRes={all_pics}></ResultGallary>
        <Button size="large" className="close-btn" icon={<ShrinkOutlined />} onClick={ () => {
            setShowAll(false);
            const ele = document.getElementById("root");    
            ele.style.height = "100%";
        } }></Button>
    </div>;

    const single_res = <div>   
        <Image src={cur_img.url}></Image>
        <div className="button-group">
            {show_mode === "multiple" ? <ControlButton icon={<PauseOutlined />} onClick={stopPlay}/> 
                : <ControlButton icon={<CaretRightOutlined />} onClick={nextPic}/> }           
            <ControlButton icon={<FastForwardOutlined />} onClick={startPlay} />
            
            <ControlButton icon={<RadarChartOutlined />} 
                onClick = {() => {setDetect(!detect_mode)}} 
                props={{"danger": detect_mode, "type": "text"}} />
        </div>

        <ResultCard result={cur_img.data} />
        <Button className="show-all-btn" onClick={() => { 
            setShowAll(true);
            const ele = document.getElementById("root");    
            ele.style.height = "auto";
        } }>展示所有结果</Button>
    </div>;
    

    return <div>
        {show_all ? all_res : single_res}
        <FileUpload 
            // setLoading={setLoading} 
            appendPic={appendPic}
            releasePics={releasePics}
            setRes={setRes}
            >
        </FileUpload>
    </div>
}