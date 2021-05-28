import {Button} from "antd";

export default function ControlButton({ onClick, children}){
    return <Button 
        onClick={onClick}
        size="large" >{children}</Button>;
} 