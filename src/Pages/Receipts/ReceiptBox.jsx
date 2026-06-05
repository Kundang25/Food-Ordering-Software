import { LucideArrowBigRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

function ReceiptBox({order}) {
  const total = Number(order.price) + Number(order.service_charge || 0);
  return (
    <div className="bg-white shadow-md rounded-md flex w-full">
        <span className="bg-black text-white flex items-center justify-center flex-1 border-r-2 rounded-l-lg text-center text-[12px]">Order No. {order.order_no}</span>
        <span className="flex items-center justify-center flex-1 font-extrabold">₹{total.toFixed(2)}</span>
        <span className="bg-gray-50 font-extralight flex items-center justify-center flex-col flex-1">
          {order.order_status}
        </span>
        <span className="font-thin flex text-white bg-[#f77417] h-full p-4 items-center justify-center flex-1 ">{new Date(order.order_date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
        <Link to={`/receipt/${order.order_id}`} className="flex-[0.2] min-w-min flex justify-center items-center bg-orange-400 rounded-r-lg text-3xl text-white p-2">{">"}</Link>
  </div>
  )
}

export default ReceiptBox;