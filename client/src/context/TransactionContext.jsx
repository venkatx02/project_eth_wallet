import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utilities/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formdata, setFormdata] = useState({receiver: '', amount: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCounter, setTransactionCounter] = useState(localStorage.getItem('transactionCounter'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormdata((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getTransactions = async () => {
      try{
        if (!ethereum) return alert("Please install MetaMask.");
        const transactionsContract = createEthereumContract();
        const availableTransactions = await transactionsContract.getTransactions();
        const structuredTransactions = availableTransactions.map((transaction)=>({
          addressFrom: transaction.sender,
          addressTo: transaction.receiver,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / (10**18)
        }))
        console.log(structuredTransactions);
        setTransactions(structuredTransactions);
      }catch(error){
        console.log(error);
      }
    }

    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if(accounts.length){
            setConnectedAccount(accounts[0]);
            getTransactions();
          }else{
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const checkIfTransactionExist = async () => {
        try{
          const transactionsContract = createEthereumContract();
          const transactionCounter = await transactionsContract.transactionCount();

          window.localStorage.setItem("transactionCounter", transactionCounter)
        }catch(error){
          console.log(error);
          throw new Error("No ethereum object");
        }
      }

      const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          setConnectedAccount(accounts[0]);
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum object");
        }
      };

      useEffect(()=>{
        checkIfWalletIsConnect();
        checkIfTransactionExist();
      }, []);

      const sendTransaction = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const {receiver, amount, message} = formdata;
            const transactionsContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
              method: 'eth_sendTransaction',
              params: [{
                from: connectedAccount,
                to: receiver,
                gas: '0x5208',
                value: parsedAmount._hex,
              }]
            });

            transactionHash = await transactionsContract.addBlock(receiver, parsedAmount, message);
            setIsLoading(true);
            console.log(`Loading: ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success: ${transactionHash.hash}`);

            const transactionCounter = await transactionsContract.transactionCount();
            setTransactionCounter(transactionCounter.toNumber());
            window.reload();

        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.");
        }
      }

    return (
        <TransactionContext.Provider value={{connectWallet, connectedAccount, formdata, setFormdata, handleChange, transactions, sendTransaction, isLoading}}>
            { children }
        </TransactionContext.Provider>
    )
}