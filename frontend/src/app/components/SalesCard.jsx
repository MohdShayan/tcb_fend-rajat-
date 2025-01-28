import { UserCircleIcon } from "lucide-react";
import React from "react";

export default function SalesCard(props) {
  const { title, category, saleAmount, imageSrc } = props; // Destructure props for easier use

  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          {/* Render image if imageSrc is provided, else render a default icon */}
          {imageSrc ? (
            <img src={imageSrc} alt={title || "User"} className="object-cover w-full h-full rounded-full" />
          ) : (
            <UserCircleIcon className="w-full h-full text-gray-500" />
          )}
        </div>
        <div className="text-sm">
          <p>{title}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            {category}
          </div>
        </div>
      </section>
      <p>{saleAmount}</p>
    </div>
  );
}
