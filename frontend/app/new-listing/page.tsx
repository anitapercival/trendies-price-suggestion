import React from "react";
import ListItemForm from "../components/ListItemForm";
import Image from "next/image";

export default function ListingPage() {
  return (
    <div>
      <div className="flex justify-start px-4 py-6">
        <Image src="/trendies-logo.png" alt="Logo" width={120} height={40} />
      </div>
      <hr className="border-t border-gray-300 mb-6" />
      <ListItemForm />
    </div>
  );
}
