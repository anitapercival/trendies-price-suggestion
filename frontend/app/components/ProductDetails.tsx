import React, { useState } from "react";

interface ProductDetailsProps {
  onProductTitleChange: (title: string) => void;
}

export default function ProductDetails({ onProductTitleChange }: ProductDetailsProps) {
  const [productTitle, setProductTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setProductTitle(title);
    onProductTitleChange(title);
  };

  const inputClasses = "border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-black";

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Product Details</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CATEGORY *</label>
          <select className={inputClasses} defaultValue="">
            <option value="" disabled>Select category</option>
            <option value="Accessories">Accessories</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Shoes">Shoes</option>
            <option value="Watches">Watches</option>
            <option value="Bags">Bags</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PRODUCT TITLE *</label>
          <input
            type="text"
            placeholder="Enter title"
            value={productTitle}
            onChange={handleTitleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">SIZE/DIMENSIONS *</label>
          <input
            type="text"
            placeholder="Enter size"
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">BRAND NAME *</label>
          <input
            type="text"
            placeholder="Enter brand name"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CONDITION *</label>
          <select className={inputClasses} defaultValue="">
            <option value="" disabled>Select condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">COLLECTION</label>
          <input
            type="text"
            placeholder="e.g SS25"
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">PERSON</label>
          <select className={inputClasses} defaultValue="">
            <option value="" disabled>Select person</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Children">Children</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">MATERIAL</label>
          <input
            type="text"
            placeholder="Enter material"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">COLOR</label>
          <select className={inputClasses} defaultValue="">
            <option value="" disabled>Select color</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Brown">Brown</option>
            <option value="Pink">Pink</option>
            <option value="Purple">Purple</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 mt-4">DESCRIPTION</label>
        <textarea
          placeholder="Enter detailed description"
          className={`${inputClasses} h-32`}
        ></textarea>
      </div>

      <div className="mt-4">
        <a href="#" className="text-black underline text-sm font-medium">
          Upload Photos
        </a>
      </div>
    </div>
  );
}
