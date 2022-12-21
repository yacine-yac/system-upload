import "./index.css";
import img from '../../icons/exclamation.png';
export default function PeaceError({name,messageError}:{name:string,messageError:string}){
    return <>
     <div className="peace peace-error"> 
                <img src={img} />
                <div className="center-v">
                            <h2>{messageError}</h2>
                            <span>{name}</span> 
                </div> 
     </div> 
    </>
}