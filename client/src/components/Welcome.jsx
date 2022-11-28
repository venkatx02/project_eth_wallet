import React, { useContext } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { Loader } from './'
import { TransactionContext } from '../context/TransactionContext'
import { useEffect } from 'react'

const Input = ({placeholder, name, type, value, handleChange}) => (
    <input placeholder={placeholder} type={type} value={value} onChange={(e)=>{handleChange(e, name)}} className='my-1 h-8 w-full rounded-full p-4 outline-none bg-[202020] text-white border-none text-sm white-glassmorphism' step="0.0001" />
)

const Welcome = () => {
    const { connectWallet, connectedAccount, formdata, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const {receiver, amount, keyword, message} = formdata;
        e.preventDefault();
        if(!receiver || !amount || !message) return;
        sendTransaction();
    }

    

    return (
        <div className='flex w-full justify-center items-center'>
        <div className='flex md:flex-row flex-col items-start justify-between md:p-5 py-12 px-4 space-x-[100px]'>
        <div className='flex flex-1 justify-start items-start flex-col md:mr-10 mt-20'>
                    <h1 className='text-3xl text-white py-1'>Send Crypto <br /> Anywhere!</h1>
                    {!connectedAccount &&
                    <button type='button' onClick={connectWallet} className='flex flex-row justify-center items-center my-5 bg-red-700 p-3 rounded-full cursor-pointer hover:scale-95'>
                        <p className='text-white text-base font-semibold'> Connect Wallet </p>
                    </button>
                    }
        </div>
        <div className='flex flex-col flex-1 justify-start items-center w-full mf:mt-0 mt-0'>
            <div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 w-full my-5 eth-card white-glassmorpism'>
                <div className='flex justify-between flex-col w-full h-full'>
                    <div className='flex justify-between items-start'>
                        <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                            <SiEthereum fontSize={21} color='#fff'/>
                        </div>
                        <BsInfoCircle fontSize={17} color='#fff' />
                    </div>
                    <div>
                    <p className='text-white text-sm font-light'>{connectedAccount}</p>
                    <p className='text-white font-semibold text-lg'>Ethereum</p>
                    </div>
                </div>
            </div>
            <div className='p-5 w-full flex flex-col justify-start items-center grey-glassmorphism'>
            <Input placeholder="Address To" name="receiver" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Message" name="message" type="text" handleChange={handleChange} />
            <div className='h-[1px] w-full bg-gray-400 my-2' />
            {isLoading ? (
                <Loader />
            ) : (<button type='button' onClick={handleSubmit} className='text-white w-full mt-2 border-[1px] p-2 border-[#808080] rounded-full cursor-pointer hover:scale-95'>Send now</button>
            )}
            </div>
        </div>
        </div>
        </div>
    )
}

export default Welcome