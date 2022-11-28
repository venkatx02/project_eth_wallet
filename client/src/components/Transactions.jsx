import React, { useContext } from "react"
import { TransactionContext } from "../context/TransactionContext"

const TransactionCard = ({addressTo, addressFrom, timestamp, message, amount, url}) => {
    return (
        <div className="bg-[#181918] m-5 flex flex-1 flex-col p-4 rounded-md hover:shadow-3xl">
            <div className="flex flex-col items-center w-full mt-2">
                <div className="display-flex justify-start width-full mb-2 p-1">
                    <a href={`http://goerli.etherscan.io/address/${addressTo}`} targer="_blank" rel="noopener noreferrer">
                        <p className="text-white text-sm">From: {addressFrom}</p>
                    </a>
                    <p className="text-white text-sm ">To: {addressTo}</p>
                    <p className="text-white text-sm ">Timestamp: {timestamp}</p>
                    <p className="text-white text-sm ">Amount(ETH): {amount}</p>
                    <p className="text-white text-sm ">Message: {message}</p>
                </div>
            </div>
        </div>
    )
}

const Transactions = () => {
    const {connectedAccount, transactions} = useContext(TransactionContext);
    return (
        <div className="flex width-full justify-center items-center gradient-bg-transactions">
            <div className="flex flex-col py-12 px-4">
                {connectedAccount&&
                <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                }
                {!connectedAccount&&
                <h3 className="text-white text-3xl text-center my-2">Connect your account to see the latest transactions</h3>
                }
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, i)=>(
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transactions