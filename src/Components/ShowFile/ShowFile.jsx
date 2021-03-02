import React, { useState ,useEffect} from 'react'; 
import { Document, Page,pdfjs } from "react-pdf"; 
import url1 from "../../Files/pdf/HR_Oyester.pdf"  
import "./showFile.css";  


  
export default function Test({url}) { 
      
    console.log(url=="HR_Oyester.pdf",url,"HR_Oyester.pdf");
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
      <div> 
        <div className="pagec"> 
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
        </div> 
        <div className="buttonc"> 
        <button 
          type="button"
          disabled={pageNumber <= 1} 
          onClick={previousPage} 
          className="Pre waves-effect waves-light btn"
            
        > 
          Previous 
        </button> 
        <button 
          type="button"
          disabled={pageNumber >= numPages} 
          onClick={nextPage} 
          className="waves-effect waves-light btn"
           
        > 
          Next 
        </button> 
        </div> 
      </div> 
      </div> 
    </> 
  ); 
}