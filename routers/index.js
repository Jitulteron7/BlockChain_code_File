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
    // ,training_title,batch_trainer,name,batch_start_date,batch_code,pdf_location
    const deploy = async (filehash,data,nameIs) => {

        try{
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);

            
           let testIs=randomString.generate({length:20});
           
        //    await deploy(testIs,hashCertificate,d[`TrainingTitle`],d[`Batch_Trainer`],d[`Staff_Name`],d[`BatchStartDate`],d[`Batch Code`],`${myFile2.name}`);
        let hh = await factory.methods.addData(
            testIs,
            filehash
          ).send({gas:'1000000' , from: accounts[0]}).on('transactionHash',async function(hash){
            //---------------------
            // code of DB
          
            let get={
                training_title:data[`TrainingTitle`],
                batch_trainer:data[`Batch_Trainer`],
                name:data[`Staff_Name`],
                batch_start_date:data[`BatchStartDate`],
                string:testIs,
                certificate_hash:filehash,
                batch_code:data[`Batch Code`],
                pdf_location:`${nameIs}`,
                transaction_hash:hash
               }
           

                 
                     Certificate.create(get)
                     
                
            
            

        //--------------------------
        
        });
           

           
        console.log(data[`S/No`],"from deploy");
        console.log(data,"from deploy");
        console.log(hh);
   

        } catch(e){
            console.log(e);
        }
      };


      const deploy2 = async (filehash,data) => {

        try{
            const accounts = await web3.eth.getAccounts();
            console.log('account address ', accounts[0]);

            
           let testIs=randomString.generate({length:20});
           
        
        let hh = await factory.methods.addData(
            testIs,
            filehash
          ).send({gas:'1000000' , from: accounts[0]}).on('transactionHash',async function(hash){
            //---------------------
            // code of DB
                 let get={
                     ...data,
                     transaction_hash:hash
                 }
                 let complete=await    Certificate.create(get)
                 if(complete){
                     return res.status(200).json({
                         sucess:1,
                         message:"Saved sucessfully"
                     })
                 }
            //--------------------------
        
        });
           

           
        // console.log(data[`S/No`],"from deploy");
        // console.log(data,"from deploy");
        console.log(hh);

        } catch(e){
            console.log(e);
        }
      };



    //------------------------------------------------------------
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
// file upload api
router.post('/tutor/upload/files',async (req, res) => {
    try{
           if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    const myFile2 = req.files;
    console.log(myFile,"data excel");
    console.log(myFile2,"data pdf");
    myFile.mv(`${__dirname}/../../../blockchain/src/Files/excel/${myFile.name}`,async function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        
        myFile2.mv(`${__dirname}/../../../blockchain/src/Files/pdf/${myFile2.name}`,async function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }



            let hashCertificate= await sha256.sha256(myFile2.name);

           

            let data= await dataExtract(myFile.name);

        let info=[];

        console.log(data);
         data.map(async (d,index)=>{
            await deploy(hashCertificate,d,myFile2.name);
            console.log(d[`S/No`],"from map");
            console.log(d,"from map data");
        })
 
        })
        
      
    });
}
    catch(e){
        console.log(e,"Jitul Teorn");
        res.status(400).send({err:e});
       }
})


router.post("/tutor/upload/file",async(req,res)=>{
    try{
        let testIs=randomString.generate({length:20});
        let myfile=req.files.file;
        let hashCertificate= await sha256.sha256(myfile.name);
        let data=JSON.parse(req.body.data);
        let allData={
            ...data,
            string:testIs,
            certificate_hash:hashCertificate,
            pdf_location:`${myfile.name}`
        }
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
        
        // let info=await Certificate.create(JSON.parse(data));
        // if(info){
        //     myfile.mv(`${__dirname}/../../../blockchain/src/Files/pdf/${myfile.name}`,async (err)=>{
        //         if(err){
        //             console.log(err)
        //             return res.status(400).send({ msg: "Error occured" });
        //         }
        //        return res.status(201).json({
        //             success:1,
        //             message:"Saved sucessfully"
        //         });
        //     })
        // }
    }
    catch(e){
        return res.json({
            success:0,
            message:"Error :"+e
        })
    }
})



router.get("/data/:string",async (req,res)=>{
try{
   let string=req.params.string;
   console.log(string);
   const sql1 = `SELECT 
                 
   certificates.batch_code,
   certificates.name,
   certificates.batch_trainer
   FROM
   certificates 
   WHERE  
   certificates.string=${string}
  `;


// const result = await db.query(sql1, { type: db.QueryTypes.SELECT }); 
const result =await Certificate.findOne({
    where: {certificate_id:1}
});

 return   res.send({data:result,path:`${__dirname}/public/data.xlsx`,string:string});

}
catch(e){
res.send({err:e})
}

})

module.exports=router;