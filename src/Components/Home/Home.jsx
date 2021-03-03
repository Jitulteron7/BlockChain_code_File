import React,{useState,useRef} from "react";
import "./Home.css";
import img from "../../img/home.png"
import axiosInstance from "../../helper/AxiosInstance";
import axios from "axios"

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
            console.log(res);
            getFile({ name: res.data.name,
                     path: 'http://localhost:4500' + res.data.path
                   })
        }).catch(err => console.log(err))
    }

    
    return(<>
    <div className="Home">
        <div className="File">
            <div className="body">
                <img src={img} />
                <h3>Drop Your File Here</h3>
            </div>
            <div className="progessBar" style={{ width: progress }}>
                     {progress}
                </div>
            <div className="bottom">
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn" style={{backgroundColor:"#76ff03 "}}>
                        <span>Excel</span>
                        
                        <input type="file" accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="multiplefile" ref={el} onChange={handleChange}  multiple/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
                <form action="#">
                    <div class="file-field input-field">
                    <div class="btn " >
                        <span>Pdf</span>
                        
                        <input accept="application/pdf" type="file" name="multiplefile" ref={sl} onChange={handleChange2}  multiple/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
                    </div>
                </form>
            </div>
            {data.path && <img src={data.path} alt={data.name} />}
        </div>
        <center><button onClick={()=>{uploadFile()}} class="waves-effect waves-light btn">UPLOAD</button></center>
    </div>
    </>);


}

export default Home;