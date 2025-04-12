import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../../components/wallet/Wallet";
import "./ElectionCommision.css";
import { toast } from "react-hot-toast";

const dateToSeconds=(dateTimeString)=>{
  const date = new Date(dateTimeString);
  return Math.floor(date.getTime() / 1000);
  

}


const ElectionCommision = ({ account }) => {
  const {contract } = useContext(WalletContext);
  const [winner ,setWinner] = useState("No Winner")
  const startVoting = async (e) => {
    e.preventDefault();
    // const startTime = document.querySelector("#start").value;
    // const endTime = document.querySelector("#end").value;
    // Convert date strings to Date objects
    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;

    const startTimeUnix = dateToSeconds(startTime);
    const endTimeUnix = dateToSeconds(endTime);
    console.log(startTimeUnix, endTimeUnix);
    
    const timeData = {
      startTimeUnix, 
      endTimeUnix
    };
    try {
      const res = await fetch(
        "https://voting-dapp-server.onrender.com/api/time-bound",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(timeData),
        }
      );

      const data = await res.json();
      // console.log(res.status);
      if (res.status === 200) {
        await contract.methods.voteTime(startTimeUnix,endTimeUnix).send({from:account,gas:480000})

        toast.success("Voting started");
      } else {
        toast.error("Voting not started because time more than 24 hr");
      }
    } catch (error) {
      toast.error(error);
    }
    // await contract.methods.voteTime(startTimeUnix,endTimeUnix).send({from:account,gas:480000})
     
  };

  useEffect(()=>{
    const winnerInfo = async ()=>{
      const winner = await contract.methods.winner().call();
      setWinner(winner);
    }
    contract && winnerInfo()
  },[contract])


  const resultDeclare = async()=>{
    await contract.methods.result().send({from:account});
    alert("result Declared");
  } 

  const emergerncyDeclare = async()=>{
    await contract.methods.emergency().send({from:account});
    alert("emergerncy Declared");
  } 
  return (
    <>
      <div>
        <Navigation account={account} />
        <div className="election-wrapper">
          <h2>
            Winner is: {winner==="0x0000000000000000000000000000000000000000" ? "Winner Not Declared Yet" : winner}<br />
          </h2>
          <form className="election-form" onSubmit={startVoting}>
            <label htmlFor="start">Start Time</label>
            <input type="datetime-local" id="start" required />

            <label htmlFor="end">End Time</label>
            <input type="datetime-local" id="end" required />

            <button className="regBtn" type="submit">
              Voting Start
            </button>
          </form>
        </div>
        <div className="admin-actions">
          <button className="emerBtn" onClick={emergerncyDeclare}>Emergency</button>
          <button className="resultBtn" onClick={resultDeclare}>Result</button>
        </div>
      </div>
    </>
  );
};

ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
};

export default ElectionCommision;
