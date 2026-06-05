import React,{useEffect,useState} from 'react'
import ReceiptBox from './ReceiptBox';
import api from '@/services/axiosInstance';
import { useAuth } from '@/contexts/authContext';
export default function Receipts() {
    const {currentUser} = useAuth();
    const [receipts,setReceipts]=useState(null)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const fetchReceipts=async()=>{
            const token = currentUser.token;
            try{
            const {data:orders}=await api.get("receipt/fetch-receipts",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(typeof(orders))
            setReceipts(orders)}
            catch(err){
                console.log(err.message)
                setError("Unable to fetch transaction history, please try again later")
            }
        }
        fetchReceipts()
    },[])

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg w-full flex justify-center flex-col items-center">
        <p className="text-2xl w-full text-center font-extralight font-sans">Your Transaction History</p>
        {error?
            <p className='text-red-500'>{error}</p>:
            receipts?
                receipts.map((order)=>(
                <ReceiptBox key ={order.order_id} order={order}/>
                )):
                <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div> 
        }
    </div>
  );
}