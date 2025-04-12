const express = require ('express');
const {Web3}= require("web3");
const cors = require('cors')

const app = express();
const ABI = require("./ABI.json")
app.use(express.json())
app.use(cors())
const web3 = new Web3("HTTP://127.0.0.1:7545") 

const contractAddress= "0x4A6b32873111152F5432984e3350c03e1B0e4089"
const contract = new web3.eth.Contract(ABI,contractAddress);
// console.log(contract)

const gengerVerification=(gender)=>
{
  const genderData = gender.toLowerCase();
  if(genderData==="male" || genderData==="female" || genderData==="others")
  {
    return true;
  }else
  {
    return false;
  }
}

// For gender verification
app.post("/api/voter-verification",(req,res)=>{
    const {gender}= req.body;
    console.log(gender)
    const status=gengerVerification(gender);
    if(status)
    {
        res.status(200).json({message:"gender valid"})

    }else
    {
        res.status(403).json({message:"Gender Invalid"})

    }
})


app.post("/api/time-bound",(req,res)=>{
    const {startTimeUnix,endTimeUnix}=req.body;
    if(endTimeUnix-startTimeUnix<86400)
    {
        res.status(200).json({message:"Voting Timer Started"})

    }else
    {
        res.status(403).json({message:"Voting Timer Error"})
    }
})

const partyClashStatus =async (party)=>{
    const candidateInfo= await contract.methods.candidateList().call();
    // console.log(candidateInfo);
    const exists = candidateInfo.some((candidate)=>candidate.party===party);
    // console.log(exists);
    return exists;
}

app.post("/api/candidate-verification",async(req,res)=>{
    const {gender,party}=req.body;
    // console.log(gender,party)
    const partyStatus = await partyClashStatus(party);
    // console.log(partyStatus)
    const genderStatus = gengerVerification(gender);
    if(genderStatus===true && partyStatus===false)
    {
        res.status(200).json({message:"Registration successfull {Gender and Party Valid}"});

    }else
    {
        res.status(403).json({message:"Registration unsuccessfull {Gender and Party not Valid}"});

    }
})



app.listen(3000,()=>{
    console.log("Server is running");
})