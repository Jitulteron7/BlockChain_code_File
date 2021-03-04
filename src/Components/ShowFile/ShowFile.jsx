import React, { useState ,useEffect} from 'react'; 
import { Document, Page,pdfjs } from "react-pdf"; 
import url1 from "../../Files/pdf/certificate.pdf"  
import "./showFile.css";  

export default function Test(params) { 
      
  const downloadCertificate=()=>{
    console.log("kela kela",__dirname,params.url);
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href',  
    'data:text/plain;charset=utf-8, ' 
    + encodeURIComponent(`../../Files/pdf/${params.url}`)); 
    element.setAttribute('download', "test.pdf"); 
  
    
  
    document.body.appendChild(element); 
  

    element.click(); 
  
    document.body.removeChild(element); 
  }
  pdfjs.GlobalWorkerOptions.workerSrc =  
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1); 
  
  
  document.addEventListener("contextmenu", (event) => { 
    event.preventDefault(); 
  }); 
    
  
  function onDocumentLoadSuccess({ numPages }) { 
    setNumPages(numPages); 
    setPageNumber(1); 
  } 
  
  function changePage(offset) { 
    setPageNumber(prevPageNumber => prevPageNumber + offset); 
  } 
  
  function previousPage() { 
    changePage(-1); 
  } 
  
  function nextPage() { 
    changePage(1); 
  } 

  useEffect(()=>{
    // console.log(`../../Files/pdf/${url}`)
  },[])
  
  return ( 
    <> 
    <div className="main showFile"> 
      <Document 
        file={url1}
        onLoadSuccess={onDocumentLoadSuccess} 
      > 
        <Page pageNumber={pageNumber} /> 
      </Document> 
      <div className="buttonIsShow">
          <button onClick={()=>{/*downloadCertificate()*/}} className="btn icon_btn"><a type="" href={`../../Files/pdf/${params.url}`} download ><i className="large material-icons">get_app</i><a  type="button">Download pdf</a></a></button>
      </div>
      </div> 
    </> 
  ); 
}