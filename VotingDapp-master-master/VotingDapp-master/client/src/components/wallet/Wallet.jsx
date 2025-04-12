import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import ABI from "../../ABI/ABI.json";
import "./Wallet.css"
const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  
    const init = async () => {
      // const web3 = new Web3("HTTP://127.0.0.1:7545");
      if(window.ethereum){
        const web3=  new Web3(window.ethereum);
        await window.ethereum.request({
          method:"eth_requestAccounts"
        })
        const contractAddress = "0x4A6b32873111152F5432984e3350c03e1B0e4089";
        //to create contract instance - abi and contract address
        const contract = new web3.eth.Contract(ABI, contractAddress);
        setState({ web3: web3, contract: contract });
      }
    };
   

  return (
    <>
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
    <div className="container button-container">

    <button className="conMetabtn button button-default" onClick={init}> Connect Metamask</button>
    </div>
    </>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;
