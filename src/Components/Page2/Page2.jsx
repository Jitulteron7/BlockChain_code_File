import React,{useEffect,useState} from "react";
import "./Page.css";
import {useParams} from "react-router-dom"
import axios from "axios"
import ShowFile from "../ShowFile/ShowFile";
import {Link} from "react-router-dom"
import pdf from "../../Files/pdf/1916125_Exp3.pdf";
import img from "../../img/banner.png";
import M from "materialize-css";
import {useLottie} from "lottie-react"
import animation from "../../img/layer.json"

import {Done1,Done2,Done3,Done} from "../Anime/Anime"


const Anime=()=>{
const style={
  height:200,

}

  const options = {
    animationData: animation,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options, style);
  
  return View;
}


const Page2=()=>{
    
    const string=useParams()
    const [user,setUser]=useState({});
    const [conditionIs,setCondition]=useState(false);
    
    const fetchData= async ()=>{
        // console.log(string.string);
        const data= await axios.get(`${window.location.protocol}//${window.location.hostname}:5000/data/${string.string}`);
        if(data){
            setUser(data.data.data)
            
            // console.log(data.d ata.data);
            
            
        }
    }
    const showLi=()=>{
        let li=document.querySelectorAll(".table_data ul li .done");
        let li2=document.querySelectorAll(".table_data ul li .not");
        let div=document.querySelector(".table_data .message_done");
        let div1=document.querySelector(".table_data .message_not");
        
        for (let i=0;i<li.length;i++){
            setTimeout( ()=>{
                li[i].style.display="flex";
                li2[i].style.display="none";
                
                if(i+1==li.length){
                    if(div){
                        div.style.display="flex";
                    }
                    if(div1){
                        div1.style.display="flex";
                        }
                    
                    
                }
                
            },1000*(i+1));
        }
    }
    useEffect( ()=>{
    

        
        fetchData()
    },[])
    const Click=()=>{

        let time=document.querySelector(".timmer")
        time.style.display="flex";
        setTimeout(()=>{
            time.style.display="none";
            
            axios.get(`${window.location.protocol}//${window.location.hostname}:5000/verify/${string.string}`)
            .then(res=>
                {
                    console.log(res.data)
                    
                        showVerification(res.data.success);
                    
                })
                
                .catch(e=>console.log(e))
        },5000)

    }
    
const showVerification=(condition)=>{
    setCondition(condition)
    let verification=document.querySelector(".table_data");
    verification.style.display="block";
    showLi()
}
    return(<>
    
    {user?
    <>
    <div class="response page">
      
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
              <button onClick={()=>{Click()}} className="btn icon_btn"><span class="Small material-icons">gavel</span><span>Verify</span></button>
             
          </div>
      </div>
      
      
</div>
<div className="timmer">
<Anime/>
</div>
<div className="table_data">
<center><h3>Verification</h3></center>
        <ul>
            <li><h4>Fetching EnCrypted Hash from Blockchain</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span class="done Small material-icons" style={{color:"#AACC00"}}>check_circle</span></li>
            <li><h4>Fetching Document</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span class="done Small material-icons" style={{color:"#AACC00"}}>check_circle</span></li>
            <li><h4>Generating Hash and Comparing</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span class="done Small material-icons" style={{color:"#AACC00"}}>check_circle</span></li>
            <li><h4>Verifying Cryptographic Signature</h4><span  style={{color:"#4ED4FF"}}class="not Small material-icons">access_time_filled</span><span className="done Small material-icons" style={conditionIs?{color:"#AACC00"}:{color:"red"}}>{conditionIs?"check_circle":"error"}</span></li>
            <li><h4>Checking Revocation Status</h4><span style={{color:"#4ED4FF"}} class="not Small material-icons">access_time_filled</span><span className="done Small material-icons" style={conditionIs?{color:"#AACC00"}:{color:"red"}}>{conditionIs?"check_circle":"error"}</span></li>
            
        </ul>
        {conditionIs?<div className="message_done">
            <p>Sucessfully Verified</p>
        </div>:
        <div className="message_not">
            <p>Invalid Document</p>
        </div>}
</div>
</>
:<div>Loading</div>}
    </>);


}

export default Page2;