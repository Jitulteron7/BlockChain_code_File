const router=require("express").Router();
const XLSX =require("xlsx");
const {db}=require("../db/sql");
const Certificate=require("../models/index")
const randomString=require("randomstring");
const sha256=require("js-sha256");
//---------------------------------------
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const factory = require('../Ethereum/certificate') ;

const provider = new HDWalletProvider(
    'frame apart post kick armed refuse limb armed annual jaguar apart cliff' ,
    'https://rinkeby.infura.io/v3/1ec6558c6dba4a9db1ab5f5b647d9a60'
    );
    
    const web3 = new Web3(provider);
    // blockchain deploy for multiple pdfs 
    const deploy = async (filehash,data,nameIs,get) => {
        

        try{
            // name of the pdf
          let namePdf=get.name
               
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);

            // unique Id (for dev using random string )

           let testIs=randomString.generate({length:20});
           
        // generating the trasaction_hash
        factory.methods.viewData(testIs).call
          let hh = await factory.methods.addData(
            
            testIs ,/*id */
            filehash /*pdf hash file*/

          ).send({gas:'1000000' , from: accounts[0]}).on('transactionHash',async function(hash){
            //---------------------
            // code of DB
        //   create the data one by one 
            let get={
                training_title:data[`TrainingTitle`],
                batch_trainer:data[`Batch_Trainer`],
                name:data[`Staff_Name`],
                batch_start_date:data[`BatchStartDate`],
                string:testIs,
                certificate_hash:filehash,
                batch_code:data[`Batch Code`],
                pdf_location:`${namePdf}`,
                transaction_hash:hash,
                stuff_name:data[`Staff_Name`],
                training_code:data[`TrainingCode`],
                stuff_no:data[`Staff_EmpNumber`]
               }
           

                 
                   await  Certificate.create(get)
 
            
        //--------------------------
        
        });
           

           
        // console.log(data[`S/No`],"from deploy");
        // console.log(data,"from deploy");
        // console.log(hh);
   

        } catch(e){
            console.log(e);
        }
      };



    //   viewData
    const DataCheck=async (string)=>{
        try{
            let data=await factory.methods.viewData(string).call();
            return data;
            
        }
        catch (e){
            
            console.log(e);
        }
    }
    
// blockchain deploy for single pdfs 
      const deploy2 = async (filehash,data,res) => {

        try{
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);

            
           let testIs=randomString.generate({length:20});
           
        
        let hh = await factory.methods.addData(
            testIs,/*id */
            filehash/*pdf hash file*/
          ).send({gas:'1000000' , from: accounts[0]}).on('transactionHash',async function(hash){
            //---------------------
            // code of DB
            // create row data and save

                 let get={
                     ...data,
                     transaction_hash:hash
                 }
                 await    Certificate.create(get)
                 
            //--------------------------
        
        });
           

        console.log(hh);

        } catch(e){
            console.log(e);
        }
      };



    //------------------------------------------------------------

    // XLSX npm data extraction function
const dataExtract= async (file)=>{
    const workbook= XLSX.readFile(`${__dirname}/../../../blockchain/src/Files/excel/${file}`);
    var data = [];
    var info=null;
    var sheet_name_lists  = workbook.SheetNames;
    sheet_name_lists.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        
        for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        
        info=data;

    });
    return info;
    
}


router.get("/verify/:id",async (req,res)=>{

    let check= await  DataCheck(req.params.id);
    let data= await Certificate.findOne({
            where: {string:req.params.id}
    })
    console.log(req.params.id,"id");
    console.log(check,"blobk");
    console.log(check==data.certificate_hash);
    console.log(data.certificate_hash,"db");
    if(data.certificate_hash!=check){
         res.status(200).json({
            success:true,
            message:"verified"
        })
    }
    else{
        res.status(200).json({
            success:false,
            message:"invalid"
        })
    }

})




// multipe file upload route
router.post('/tutor/upload/files',async (req, res) => {
    try{
           if (!req.files) {
                return res.status(500).send({ msg: "file is not found" })
            }
            
        // accessing the excel file
    const myFile = req.files.file;
    // converting file object to array and using only the value not the key 

    // console.log(Object.keys(req.files).map((key)=>req.files[key]));

    let allPdfs=Object.keys(req.files).map((key)=>{
        if(key!="file"){
            return req.files[key]
        }
    })

    // save the pdf and excel file seperately logic

    allPdfs.map((get,index)=>{

        // pdf in the last index
        // pdf file index !=lastindex 
        if(allPdfs.length!=index+1){
            
            // save pdf
            myFile.mv(`${__dirname}/../../../blockchain/src/Files/pdf/${get.name}`,async function (err) {
                    if (err) {
                        console.log(err)
                        return res.status(500).send({ msg: "Error occured" });
                    }
                    
                    // save excel
                myFile.mv(`${__dirname}/../../../blockchain/src/Files/excel/${myFile.name}`,async function (err) {
                        if (err) {
                            console.log(err)
                            return res.status(500).send({ msg: "Error occured" });
                        }

                    })
                }) 
        }
    })


                    
                        // data exraction from excel
                        let data= await dataExtract(myFile.name);
            
                        
                
                        // save data and pass all hash pdf certificate to blockchain
                        data.map(async (d,index)=>{
                           try{
                                // hashing pdf
                            let hashCertificate= await sha256.sha256(allPdfs[index].name);
                            // block chain function
                            await deploy(hashCertificate, d  , myFile.name ,  allPdfs[index]);
                            if(index+1==data.length){
                                return res.status(201).json({
                                    success:true,
                                    message:"Uploaded Successfully"
                                })
                            }
                           
                           }
                           catch(e){
                               return res.status(400).json({
                                success:false,
                                message:"Something went wrong" 
                               })
                           }
                        })
                        

    
        }
            catch(e){
                
                res.status(400).send({err:e,message:"Error"});
            }
        })



// single file upload route
router.post("/tutor/upload/file",async(req,res)=>{
    try{


        // id
        let testIs=randomString.generate({length:20});
        // pdf 
        let myfile=req.files.file;
        // hash
        let hashCertificate= await sha256.sha256(myfile.name);
        // get the data from the form
        let data=JSON.parse(req.body.data);
        // saveing with more data
        let allData={
            ...data,
            string:testIs,
            certificate_hash:hashCertificate,
            pdf_location:`${myfile.name}`
        }

        // save pdf file
        myfile.mv(`${__dirname}/../../../blockchain/src/Files/pdf/${myfile.name}`,async (err)=>{
                    if(err){
                        console.log(err)
                        return res.status(400).send({ msg: "Error occured" });
                    }
                    await deploy2(hashCertificate,allData);
                    return res.status(201).json({
                        success:1,
                        message:"Saved sucessfully"
                    });
                })
        

        }
        catch(e){
            return res.json({
                success:0,
                message:"Error :"+e
            })
        }
})



// route to get the saved files 
router.get("/data/:string",async (req,res)=>{
try{


    
   let string=req.params.string;
//    console.log(string);
//    const sql1 = `SELECT 
                 
//    certificates.batch_code,
//    certificates.name,
//    certificates.batch_trainer
//    FROM
//    certificates 
//    WHERE  
//    certificates.string=${string}
//   `;


const result =await Certificate.findOne({
    where: {string:string}
});

 return   res.send({data:result,path:`${__dirname}/public/data.xlsx`,string:string});


}
catch(e){
res.send({err:e})
}

})





module.exports=router;