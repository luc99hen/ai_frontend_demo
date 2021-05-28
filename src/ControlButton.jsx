import {Button} from "antd";

export default function ControlButton({icon, onClick, props}){
    return <Button 
        {...props}
        onClick={onClick}
        style={{"margin": "auto 20px"}} 
        shape="circle" size="large" 
        icon={icon}></Button>;
} 