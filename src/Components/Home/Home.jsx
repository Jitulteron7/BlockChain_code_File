import React,{useState,useRef} from "react";
import "./Home.css";
import img from "../../img/home.png"
import axiosInstance from "../../helper/AxiosInstance";
import axios from "axios";
import M from "materialize-css"

const Home =()=>{
    // excel
    const [file, setFile] = useState(''); 
    // pdf
    const [file2, setFile2] = useState({}); 
    // progress bar code
    const [data, getFile] = useState({ name: "", path: "" });   
     const [progress, setProgess] = useState(0); 
    
    const el = useRef(); 
    const sl=useRef();

    // excel
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    // pdf 
    const handleChange2 = (e) => {
        setProgess(0)
        const file = e.target.files; // accesing file
        setFile2(file); // storing file
    }

    // upload function
    const uploadFile = () => {
        if(!file||!file2)
          {
            return  M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Please add all the fields !</span>
            </div>`
            ,classes:"file_upload_notification"})
          }
          let load=document.querySelector("#load_fileIn.uploading_file");
          load.style.height="80%"
           load.style.display="block"

        const formData = new FormData(); 
        
        // pdf 
        for (let i=0;i<file2.length;i++){
            formData.append(`file${i}`,file2[i]);
        }
        // excel
        formData.append('file',file);
        
    
        axios.post(`${window.location.protocol}//${window.location.hostname}:5000/tutor/upload/files`, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            if(res.data.success){
                load.style.display="none"
                M.toast({html:`
                        <div class="file_upload_notification">
                            <span class="material-icons">
                                check_circle_outline
                            </span>
                            <span >Pushed certificates to Blockchain Successfully</span>
                        </div>`
                        ,classes:"file_upload_notification"})
                getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
            }else{
                setFile("");
                setFile2("");
                M.toast({html:`
                <div class="file_upload_notification_error">
                    <span class="material-icons">
                    error_outline
                    </span>
                    <span >Unable to upload !</span>
                </div>`
                ,classes:"file_upload_notification"})
            }
            
        }).catch(err => 
            {
                let load=document.querySelector("#load_fileIn.uploading_file");
                load.style.display="none";
                M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Error! Unable to upload files</span>
            </div>`
            ,classes:"file_upload_notification"})
            console.log(err)})
    }

    const dummy=()=>{

           let load=document.querySelector("#load_fileIn.uploading_file");
           load.style.display="block"
            setTimeout(()=>{
                load.style.display="none"
                
            },5000 )
            M.toast({html:`
                        <div class="file_upload_notification">
                            <span class="material-icons">
                                check_circle_outline
                            </span>
                            <span >Pushed certificates to Blockchain Successfully</span>
                        </div>`
                        ,classes:"file_upload_notification"})
                    
            M.toast({html:`
            <div class="file_upload_notification_error">
                <span class="material-icons">
                error_outline
                </span>
                <span >Unable to upload !</span>
            </div>`
            ,classes:"file_upload_notification"})
            
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

    <div className="Home">
        <div className="File">
            <div className="body">
                {/* <img src={img} /> */}
                <h3>Upload Your File Here</h3>
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn" style={{backgroundColor:"#AACC00",fontSize:"1.2rem",borderRadius:"40px",width:"100%",fontWeight:"bold"}}>
                    <div className="inner_btn">
                            <span class="Small material-icons">upload_file</span>
                            <span>Excel</span>
                    </div>
                        
                        
                        <input type="file" accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="multiplefile" ref={el} onChange={handleChange}  multiple/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn " style={{backgroundColor:"#00b0ff",fontSize:"1.2rem",borderRadius:"40px",width:"100%",fontWeight:"bold"}}>
                    <div className="inner_btn">
                            <span class="Small material-icons">picture_as_pdf</span>
                            <span>Pdf</span>
                    </div>
                        
                        <input accept="application/pdf" type="file" name="multiplefile" ref={sl} onChange={handleChange2}  multiple/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
            </div>
            
            <div className="bottom">
                
                {/* <div className="progessBar" style={{ width: progress }}>
                     {progress}
                     
                </div> */}
                    
            </div>
        </div>
        <center> <button onClick={()=>{uploadFile()/*dummy()*/}} class="waves-effect waves-light btn"><span class="Small material-icons">upload</span><span>UPLOAD</span></button></center>
    </div>
    </>);


}

export default Home;



// 