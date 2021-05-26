export default function Image({src}){

    return <div className="upload-image">
        <img  style={{"width": "100%"}} alt="" src={src} ></img>    
    </div>
}