

import { UserCircleIcon } from "lucide-react";
import React from "react";



export default function SalesCard(props) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
         
        </div>
        <div className="text-sm">
            <p>{props.title}</p>
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                {props.category}
            </div>
        </div>
      </section>
        <p>{props.saleAmount}</p>
    </div>
  );
}