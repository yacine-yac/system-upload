import {useState,useCallback,createRef,ChangeEvent, useEffect,createContext} from "react";
import reactDom from "react-dom";
import { useFetcher } from "react-router-dom"; 
import './App.css';
import ButtonsArea from './components/ButtonsArea';
import ErrorHandler from './components/Error';
import Peace from './components/peace';
import Progress from './components/progress';
import Welcom from './components/welcom'; 
import ProgressPeace from './components/peace/progressPeace';
import PeaceError from './components/peace/errorPeace';
import PeaceReload from './components/peace/PeaceReload'; 
import { useListReaders } from "./custom/reader";
import {fireWall} from "./custom/reader/config";
import { Reader } from "./custom/reader/Reader"; 
import useUpload from "./custom/upload";
import config from "./config.json"; 

type contextType={deletePeace:()=>void};
export const context=createContext<contextType>({} as contextType ); 
function App() { 
  const filesCollection= useListReaders(fireWall);
  const inputState=Boolean(filesCollection.files.length); 
  const upload=useUpload(config.server,{enabled:true}); 
  console.log(upload);
  const handleInput=(e: ChangeEvent<HTMLInputElement>)=>{
            filesCollection.setElement(e.target);
        }
  useEffect(()=>{ 
  },[filesCollection.element]); 
  const send=useCallback(()=>{ 
    upload.setData(filesCollection.items);
    upload.dispatch();
  },[filesCollection.items]);
  return  <>
 
  <div className="d1 main-center">
      <form method="POST" encType="multipart/form-data" > 
                <div className="area1 center"> 
                    <h1>Uploading System</h1> 
                    <label><input disabled={inputState} value={filesCollection.value}   onChange={handleInput} type="file" name="uploading[]" id="upload" multiple /></label>
                </div> 
               {upload.isProgress && <Progress fraction={upload.progress+"%"} />}
                <div  className="area2">
                      {/* <div className="area21" id="area_release"> */} 
                      {   filesCollection.files.length>0   && filesCollection.files.map((x:Reader,y:number)=>{ 
                              return   x.flag ? <context.Provider key={y} value={{deletePeace:()=>x.destroy()}}><Peace  key={y} img={x.result} name={x.name} size={x.size} state={upload.success} type={x.type} /></context.Provider> 
                                              : x.isProgress ? <ProgressPeace key={y} img={x.result} fraction={x.progress} />
                                              :x.isError ?  <PeaceReload key={y} name={x.name} size={String(x.size)} /> :null; 
                            })}
                      { upload.isError  && <ErrorHandler messageError={upload.errorMessage ?? undefined}  status={100}/>  }  
                      {filesCollection.rejected.length>0 && filesCollection.rejected.map((x,y)=><PeaceError key={y} name={x.name} messageError={x.message}  />)}
                      {(filesCollection.element===null) &&   <Welcom />}
         
                </div>
              {filesCollection.files.length>0 &&  <ButtonsArea clearAllFiles={filesCollection.initState} sendFiles={send}  /> }
 
      </form>  
  </div> 
  
  </>
}

export default App;
