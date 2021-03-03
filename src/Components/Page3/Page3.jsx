import React,{useState,useRef} from "react";
import "./Page3.css";
import img from "../../img/home.png"
import axiosInstance from "../../helper/AxiosInstance";
import axios from "axios"

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
            getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
        }).catch(err => console.log(err))
    }

    
    return(<>
    <div className="Page3">
        <div className="File row">
            <div className=" col l12">
            <div className="body ">
                
                <div class="row">
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
                <div className="progessBar" style={{ width: progress }}>
                         {progress}
                    </div>
            </div>
            {data.path && <img src={data.path} alt={data.name} />}
        </div>
        <center><button onClick={()=>{uploadFile()}} class="waves-effect waves-light btn">UPLOAD</button></center>
    </div>
    </>);


}

export default Home;