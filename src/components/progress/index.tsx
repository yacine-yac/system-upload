import "./index.css";
function Progress({fraction}:{fraction:number}){
    const perc = (100-fraction)*560/100; //565.48
    return <>
        <div className="area_prog center"> 
            <svg className="center">
                <circle r="90" cx="50%" cy="50%" fill="transparent"    strokeDasharray="560" strokeDashoffset="0"></circle>
                <circle r="90" cx="50%" cy="49%" strokeDasharray="565.48" strokeDashoffset={perc}></circle>
                <text x="45%" y="55%" fill="white">{fraction+"%"}</text>
            </svg>  
        </div>
    </>
}
export default Progress;