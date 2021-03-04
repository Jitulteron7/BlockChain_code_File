import done from "../../img/done.json"   
import {useLottie} from "lottie-react"
const Done=(data)=>{
    const style={
      height:70,
      width:70,
    
    }
    
      const options = {
        animationData: done,
        loop: false,
        autoplay: data||false,
        
      };
      const { View } = useLottie(options, style);
      
      return View;
      
    }
 const Done1=(data)=>{
    const style={
      height:70,
      width:70,
    
    }
    
      const options = {
        animationData: done,
        loop: false,
        autoplay: data||false,
        
      };
      const { View } = useLottie(options, style);
      
      return View;
      
    }
    const Done2=(data)=>{
        const style={
          height:70,
          width:70,
        
        }
        
          const options = {
            animationData: done,
            loop: false,
            autoplay: data||false,
            
          };
          const { View } = useLottie(options, style);
          
          return View;
          
        }
        const Done3=(params)=>{
            const style={
              height:70,
              width:70,
            
            }
            
              const options = {
                animationData: done,
                loop: 4,
                autoplay: true,
                
              };
              const { View } = useLottie(options, style);
              
              return View;
              
            }

export  {Done,Done1,Done2,Done3}