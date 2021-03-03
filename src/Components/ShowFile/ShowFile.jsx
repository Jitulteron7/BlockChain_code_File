import React, { useState ,useEffect} from 'react'; 
import { Document, Page,pdfjs } from "react-pdf"; 
import url1 from "../../Files/pdf/certificate.pdf"  
import "./showFile.css";  


  
export default function Test({url}) { 
      
    
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
    console.log(`../../Files/pdf/${url}`)
  },[url])
  
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
          <button className="btn icon_btn"><a type="" download href={url1} ><i className="large material-icons">get_app</i><a  type="button">Download pdf</a></a></button>
      </div>
      </div> 
    </> 
  ); 
}