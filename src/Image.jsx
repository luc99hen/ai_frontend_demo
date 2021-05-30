export default function Image({src}){

    return <div className="upload-image">
        <img  style={{"height": "100%"}} alt="" src={src} ></img>    
    </div>
}