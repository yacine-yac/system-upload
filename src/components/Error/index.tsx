import error from './error.png';
import "./index.css";

type errorType={status:number,messageError?:string,onDelete:()=>void,onreLoad:()=>void};

function ErrorHandler({onDelete,onreLoad,status,messageError="Error occured to upload Request"}:errorType){
    return <>
          <div className="error main-center center">
             <img src={error} alt="Error"></img> 
             <h2>{status}!, {messageError}</h2>
             <section className='center-h'>
                <button onClick={onDelete} type='button'></button>
                <button onClick={onreLoad} type='button'></button> 
             </section>
          </div>
    </>
}
export default ErrorHandler;