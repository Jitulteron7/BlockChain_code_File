import React,{useEffect,useState} from "react";
import "./Page.css";
import {useParams} from "react-router-dom"
import axios from "axios"
import ShowFile from "../ShowFile/ShowFile";
import {Link} from "react-router-dom"
import pdf from "../../Files/pdf/1916125_Exp3.pdf";
import img from "../../img/banner.png"
// ../../Files/pdf/${user.pdf_location}

// class Car extends React.Component {

//     render() {
//         let pdf = require("./Files/pdf/1916125_Exp3.pdf")
//       return pdf;

//     }
//   }

const Page2=()=>{
    
    const string=useParams()
    const [user,setUser]=useState({});
    
    
    const fetchData= async ()=>{
        // console.log(string.string);
        const data= await axios.get(`${window.location.protocol}//${window.location.hostname}:5000/data/${string.string}`);
        if(data){
            setUser(data.data.data)
            
            // console.log(data.d ata.data);
            
            
        }
    }
    useEffect( ()=>{
        
    
        fetchData()
    },[])

    

    return(<>
    
    {user?<div class="response page">
      
      <div class="div1 card ">

         {user?<ShowFile url={user.pdf_location} />:<h4>Certificate will be displayed here</h4>}
          
          
      </div>
      <div class="div2  card">
              <div>
                  <img src={img}/>
                  
              </div>
          <div className="content_page">
              
              <div>
              <h3>Issued</h3>
              <h4>{user?user.stuff_name:"NO"}</h4>
              </div>
              <div>
              <h3>Trainer Name</h3>
              <h4>{user?user.batch_trainer:"NO"}</h4>
              </div>
              <div>
              <h3>Training  code</h3>
              <h4>{user?user.training_code:"NO"}</h4>
              </div>
              <div>
              <h3>Batch Code</h3>
              <h4> {user?user.batch_code:"NO"}</h4>
              </div>
              <div>
              <h3>Batach Duration</h3>
              <h4> {user?user.batch_start_date:"NO"}</h4>
              </div>
              <div>
              <h3>Transsaction ID</h3>
              <p style={{width:"500px",textAlign:"left"}}>{user?user.transaction_hash:"NO"}</p>
              </div>
              <div>
              <h3>Hash</h3>
              <p style={{width:"500px",textAlign:"left"}}>{user?user.certificate_hash:"NO"}</p>
              </div>
          </div>
          <div className="buttonIs">
              <button className="btn icon_btn"><span class="Small material-icons">gavel</span><span>Verify</span></button>
             
          </div>
      </div>
</div>:<div>Loading</div>}
    </>);


}

export default Page2;