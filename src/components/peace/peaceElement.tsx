type peaceElement={ 
    img:string,
    name:string,
    size:string,
    state:boolean,
    setBeforeDeleteState:React.Dispatch<React.SetStateAction<boolean>>
}
 
function PeacElement({img,name,size,state,setBeforeDeleteState}:peaceElement): JSX.Element{
 
    return <>
                <img src={img} />
                <div className="center-v">
                            <h2>{name}</h2>
                            <span>{size}</span>
                </div>
             { state===false &&  <button type="button" onClick={()=>setBeforeDeleteState(prev=>!prev)} role="delete" className="dlt_file"></button> }
    </>
}
export default PeacElement;