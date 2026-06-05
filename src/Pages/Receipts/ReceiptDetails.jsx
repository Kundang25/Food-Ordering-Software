import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const ReceiptDetails = () => {
    const [order,setOrder]=useState(null)
    const [error,setError]=useState(null)
    const {orderId}=useParams();
    const {currentUser}=useAuth();
    useEffect(()=>{
        const fetchReceipt=async()=>{
            try{
                console.log("Heyo")
                const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/receipt/get-receipt`,{order_id:orderId},{
                    headers:{
                        Authorization:`Bearer ${currentUser.token}`
                    }
                })
                console.log(response.data)
                const {result_order:{base_amount,order_no,order_date,service_charge},result_items}=response.data
                setOrder({
                    order_no,
                    base_amount: Number(base_amount),
                    service_charge: Number(service_charge || 0),
                    items: result_items,
                    order_date,
                })
            }
            catch(err){
                if(!err.response){
                    setError("Unable to fetch the receipt at the moment")
                }
                else if(response.status==400){
                    setError("The associated order number is not in your transaction history")
                }
                else {
                    setError("We're experiencing some server issues, please try again later")
                }
                console.error(err)
            }
        }
        fetchReceipt()
    },[])
    if(error){
        return (
        <p className="text-red-500 w-full text-center">
            {error}
        </p>)
    }
    if(!order){
        return (<>
        Loading... 
        </>)
    }
  return (
<div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg border gap-3">
  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center ">
    Order Receipt
  </h2>

  <div className="border-b pb-2 mb-2 gap-3">
    <p className="text-sm text-gray-600">
      <span className="font-semibold">Order No:</span> {order.order_no}
    </p>
    <p className="text-sm text-gray-600">
      <span className="font-semibold">Order Date:</span> {new Date(order.order_date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    </p>
  </div>

  <table className="w-full mb-4">
    <thead>
      <tr className="text-gray-700 border-b">
        <th className="text-left py-2">Item</th>
        <th className="text-center py-2">Qty</th>
        <th className="text-right py-2">Price</th>
      </tr>
    </thead>
    <tbody>
      {order.items.map((item, index) => (
        <tr key={index} className="border-b">
          <td className="py-2">{item.name}</td>
          <td className="text-center py-2">{item.quantity}</td>
          <td className="text-right py-2">₹{(Number(item.selling_price) * item.quantity).toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="border-t pt-3 mt-8">
    <p className="flex justify-between text-sm">
      <span>Amount:</span>
      <span>₹{order.base_amount.toFixed(2)}</span>
    </p>
    <p className="flex justify-between text-sm">
      <span>Service Charge:</span>
      <span>₹{order.service_charge.toFixed(2)}</span>
    </p>
    <p className="flex justify-between text-lg font-semibold mt-2">
      <span>Total:</span>
      <span>₹{(order.base_amount + order.service_charge).toFixed(2)}</span>
    </p>
  </div>
</div>
  )
}

export default ReceiptDetails