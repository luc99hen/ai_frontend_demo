import Image from "./Image";
import ControlButton from "./ControlButton";
import UploadPage from "./UploadPage"
import ResultCard from "./ResultCard"
import ResultGallary from "./ResultGallary"
import {useForceUpdate, useInterval} from "./utils"
import { Button } from 'antd';
import { useState } from "react";


import p1 from "./images/1.jpg"
import p2 from "./images/2.jpg"
let res = {
    id: 1,
    type: "东亚人",
    race: "东亚人",
    confidence: 0.99
}
let res1 = {
    id: 1,
    type: "东亚人",
    race: "非人",
    confidence: 0.99
}
const multiple_src = [{"url": p1, "data": res}, {"url": p2, "data": res}, 
    {"url": "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", "data": res1}
] 

let next_src = 0;
// const all_status = ["upload", "show-single", "show-multiple"];

export default function Content(){
    const [detect_mode, setDetect] = useState(false);
    const [show_mode, setShow] = useState("single");     // show_mode: can be single picture or multiple picture
    const [page_status, setPage] = useState(1);
    const [cur_img, setImg] = useState(multiple_src[0]);
    const [all_pics, setPics] = useState(multiple_src);
    const forceUpdate = useForceUpdate();


    const nextPic = () => {   
        const next_img = all_pics[next_src];
        setImg(next_img);
        if (detect_mode && show_mode === "multiple"
            && next_img.data
            && next_img.data.race !== "东亚人") {
            console.log("bad guy found");
            stopPlay();
        }
        next_src = (next_src + 1) % all_pics.length;
    }

    useInterval(nextPic, show_mode === "multiple" ? 1000 : null);

    const startNext = () => {
        setShow("single");
        nextPic();
    }

    const startPlay = () => {
        setShow("multiple");
        setDetect(false);
    }

    const stopPlay = () => {
        setShow("single");
    }

    const startDetect = () => {
        setShow("multiple");
        setDetect(true);
    }

    const appendPic = (newPic) => {
        setPics((arr) => [...arr, {"url": newPic, "data": null}]);
    }

    const releasePics = () => {
        if(all_pics.length > 0){
            all_pics.forEach(img => {URL.revokeObjectURL(img.url)})
        }
        setPics([]);
        next_src = 0;
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

    const lastPage = () => {
        if(page_status === 2) {
            const ele = document.getElementById("root");   
            ele.style.height = "100%";
        } else {

        }
        setPage(page_status => page_status-1);
    }

    const nextPage = () => {
        if(page_status === 1){  
            const ele = document.getElementById("root");    
            ele.style.height = "auto";
        }else {
            nextPic();
        }
        setPage(page_status => page_status+1);
    }


    const all_res = <div>
        <ResultGallary allRes={all_pics}></ResultGallary>
    </div>;

    const single_res = <div>   
        <Image src={cur_img.url}></Image>
        <div className="button-group">
            <ControlButton onClick={startNext}>单步展示模式</ControlButton>
            <ControlButton onClick={startPlay}>连续展示模式</ControlButton>
            <ControlButton onClick={startDetect}>外国人发现模式</ControlButton>
            <ControlButton onClick={nextPage}>全部识别结果分类概览</ControlButton>
        </div>

        <ResultCard result={cur_img.data} />
        
    </div>;

    const upload_page = <div>
        <UploadPage
            appendPic={appendPic}
            releasePics={releasePics}
            setRes={setRes}
            nextStage={nextPage}>
        </UploadPage></div>
    

    return <div>
        {
            page_status === 2 ? all_res : 
                page_status === 1 ? single_res : upload_page
        }
        {
            page_status !== 0 ? <Button 
                className="return-btn"
                onClick={lastPage}
            >返回</Button> : null
        }
    </div>
}