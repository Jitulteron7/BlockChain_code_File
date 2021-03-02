import React,{useEffect,useState} from "react";
import "./Page.css";
import {useParams} from "react-router-dom"
import axios from "axios"
import {Link} from "react-router-dom"
// import pdf from "./Files/pdf/1916125_Exp3.pdf";
import img from "../../logo.svg"
// ../../Files/pdf/${user.pdf_location}

class Car extends React.Component {

    render() {
        let pdf = require("./Files/pdf/1916125_Exp3.pdf")
      return pdf;
    }
  }
const Page2=()=>{
    
    const string=useParams()
    const [user,setUser]=useState({});
    
    const url=`./../../Files/pdf/${user.pdf_location}`;
    const Download=()=>{
        window.location.href = "http://localhost:3000/src/Files/pdf/"+user.pdf_location;
    }
    
    useEffect( ()=>{
        
        const fetchData= async ()=>{
            console.log(string.string);
            const data= await axios.get(`http://localhost:5000/data/${string.string}`);
            if(data){
                setUser(data.data.data)
                console.log(data.data.data);
                console.log(user.pdf_location);
            }
        }
        
        fetchData()
    },[user])

    

    return(<>
    
    <div class="row page">
      
            <div class="div1 col s8">
                <h4>Certificate will be displayed here</h4>
                {console.log(user.pdf_location)}
                
            </div>
            <div class="div2 col s3">
                <div>
                    <h4>Issued to:-</h4>
                    <h4>Trainer Name:- {user?user.batch_trainer:"NO"}</h4>
                    <h4>Training  to:- {user?user.name:"NO"}</h4>
                    <h4>Batch Code:- {user?user.batch_code:"NO"}</h4>
                    <h4>Batich Duration:- {user?user.batch_start_date:"NO"}</h4>
                    <h4>Transsaction ID:- {user?user.name:"NO"}</h4>
                    <h4>Hash:- {user?user.name:"NO"}</h4>
                </div>
                <div className="buttonIs">
                    <button className="">Verify</button>
                    <button className=""><a href={pdf} download type="button">Download pdf</a></button>
                </div>
            </div>
    </div>
    </>);


}

export default Page2;