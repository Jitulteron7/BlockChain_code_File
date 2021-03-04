import React,{useState,useRef} from "react";
import "./Page3.css";
import img from "../../img/home.png"
import axiosInstance from "../../helper/AxiosInstance";
import axios from "axios";
import M from "materialize-css"

const Home =()=>{

    // excel
    const [file, setFile] = useState(''); 

    // all the data state
    const [batch_code,set_batch_code]=useState();
    const [batch_trainer,set_batch_trainer]=useState("");
    const [batch_start_date,set_batch_start_date]=useState("");
    const [training_title,set_training_title]=useState("");
    const [stuff_name,set_stuff_name]=useState("");
    const [stuff_no,set_stuff_no]=useState();
    const [training_code,set_training_code]=useState();
    const [load,setLoad]=useState(true)
    const [data, getFile] = useState({ name: "", path: "" });   
     const [progress, setProgess] = useState(0);
    const sl=useRef();


    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    
    const uploadFile = () => {
       if(!file||!batch_code||!batch_trainer||!training_title||!stuff_name||!training_code||!stuff_name||!batch_start_date){
        M.toast({html:`
        <div class="file_upload_notification_error">
            <span class="material-icons">
            error_outline
            </span>
            <span >Please add all the fields !</span>
        </div>`
        ,classes:"file_upload_notification"})
       }else{
        
        let load=document.querySelector("#load_fileIn.uploading_file");
        load.style.display="block"
        load.style.height="105%"
        const formData = new FormData(); 
       
        let totData={ batch_code,
            batch_trainer,
            batch_start_date,
            training_title,
            stuff_name,
            stuff_no,
            training_code
        }
       
        formData.append('file',file);
        formData.append('data',JSON.stringify(totData));
        
        axios.post(`${window.location.protocol}//${window.location.hostname}:5000/tutor/upload/file`,
        
       formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            dummy(res.data.success)
            
            getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
                   
        }).catch(err => console.log(err))
       }
    }

    const dummy=(boolen)=>{
        if(boolen){

            M.toast({html:`
                        <div class="file_upload_notification">
                            <span class="material-icons">
                                check_circle_outline
                            </span>
                            <span >Pushed certificate to Blockchain Successfully</span>
                        </div>`
                        ,classes:"file_upload_notification"})
          }else{
           M.toast({html:`
           <div class="file_upload_notification_error">
               <span class="material-icons">
               error_outline
               </span>
               <span >Unable to upload !</span>
           </div>`
           ,classes:"file_upload_notification"})
          }

        let load=document.querySelector("#load_fileIn.uploading_file");
        load.style.display="none";
          document.querySelectorAll("input").values=""
        
            
       
                
        
        
    }
    return(<>
    
    <div id="load_fileIn" className="uploading_file">
        <div className="loading">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div className="Page3">
        <div className="File row">
            <div className=" col l12">
            <div className="body ">
                
                <div class="row">
                    <center><h3 className="details_h3">Details</h3></center>
                    <center><div className="detail_bar"></div></center>
                    <form class="col s12">
                    
                    <div class="row">
                        <div class="input-field col s6">
                        
                        <input onChange={(e)=>{set_batch_code(e.target.value)}}  id="Batch_Code" type="number" class="validate" />
                        <label for="Batch_Code">Batch Code</label>
                        </div>
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_stuff_name(e.target.value)}} id="Stuff_Name" type="text" class="validate" />
                        <label for="Stuff_Name">Stuff Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_stuff_no(e.target.value)}}  id="Stuff_No" type="number" class="validate" />
                        <label for="Stuff_No">Stuff No</label>
                        </div>
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_training_title(e.target.value)}} id="Training_Title" type="text" class="validate" />
                        <label for="Training_Title">Training Title</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                        <input  onChange={(e)=>{set_training_code(e.target.value)}} id="Training_code" type="number" class="validate" />
                        <label for="Training_code">Training code</label>
                        </div>
                        <div class="input-field col s6">
                        <input onChange={(e)=>{set_batch_trainer(e.target.value)}} id="Batch_Trainer" type="text" class="validate" />
                        <label for="Batch_Trainer">Batch Trainer</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                        <input  onChange={(e)=>{set_batch_start_date(e.target.value)}} id="Batch_Start_Date" type="date" class="validate" />
                        <label for="Batch_Start_Date">Batch Start Date</label>
                        </div>
                        
                    </div>
                    
                    
                    </form>
                </div>
                  </div>
                
            </div>
            <div className="bottom col l12">
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn " >
                        <span>Pdf</span>
                        
                        <input accept="application/pdf" type="file" name="multiplefile" ref={sl} onChange={handleChange}  />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
                {/* <div className="progessBar" style={{ width: progress }}>
                         {progress}
                    </div> */}
                    {/* <div class="progress card">
                        <div class="determinate" style={{width:`${50}%`}}></div>
                    </div> */}
            </div>
            
        </div>
        <center><button onClick={()=>{uploadFile()}} class="waves-effect waves-light btn">UPLOAD</button></center>
    </div>
    </>);


}

export default Home;