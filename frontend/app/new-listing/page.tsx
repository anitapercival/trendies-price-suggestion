"use client";

import React, { useState } from "react";
import Image from "next/image";
import PricingDetails from "../components/PricingDetails";
import ProductDetails from "../components/ProductDetails";

type Step = "product" | "pricing";

type ProductInfo = {
  productTitle: string;
};

export default function ListingPage() {
  const [step, setStep] = useState<Step>("product");
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

  const handleProductTitleChange = (title: string) => {
    setProductInfo({ productTitle: title });
  };

  const handleProductContinue = () => {
    if (!productInfo?.productTitle) {
      alert("Please fill in the product title first.");
      return;
    }
    setStep("pricing");
  };

  const handleBackToProduct = () => {
    setStep("product");
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="p-4">
        <div className="flex justify-between items-center">
          <Image src="/trendies-logo.png" alt="Logo" width={120} height={40} />
          <nav className="space-x-4"></nav>
        </div>

        <div className="border-b border-gray-300 mt-4"></div>

        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-black">All</a>
            <a href="#" className="hover:text-black">Watches</a>
            <a href="#" className="hover:text-black">Jewellery</a>
            <a href="#" className="hover:text-black">Bags</a>
            <a href="#" className="hover:text-black">Shoes</a>
            <a href="#" className="hover:text-black">Accessories</a>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mt-8"></div>

        <div className="flex items-center justify-between py-4 text-sm font-medium">
          <div className="flex justify-between items-center space-x-8 flex-1 max-w-4xl">
            <a href="#" className="underline hover:text-black">HOME</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black">MY LISTINGS</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black">BIDS & OFFERS</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black">PAYOUTS & TRANSACTIONS</a>
          </div>
          <button className="ml-8 bg-black text-white px-4 py-1 hover:bg-gray-800 transition whitespace-nowrap cursor-pointer">
            ADD NEW ITEM
          </button>
        </div>

        <div className="border-b border-gray-200"></div>
      </header>

      {/* Step Indicator */}
      <section className="px-4 py-6">
        <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto">
          <div className="absolute top-2 left-0 right-0 h-0.5 bg-black z-0"></div>

          {['Product Details', 'Pricing', 'Authentication', 'Availability', 'Submit'].map((label, index) => (
            <div key={label} className="flex flex-col items-center z-10 w-1/5 text-center">
              <div
                className={`w-4 h-4 rounded-full border-2 mb-2 ${
                  (step === "product" && index < 1) || (step === "pricing" && index < 2)
                    ? 'bg-black border-black'
                    : 'bg-white border-black'
                }`}
              ></div>
              <span className="text-sm text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Back Link in Pricing */}
      {step === "pricing" && (
        <div className="max-w-4xl mx-auto mt-4 px-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleBackToProduct();
            }}
            className="text-gray-600 hover:text-black flex items-center text-sm font-medium"
          >
            <span className="mr-2 text-xl">←</span> Back to Product Details
          </a>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        {step === "product" && (
          <ProductDetails onProductTitleChange={handleProductTitleChange} />
        )}
        {step === "pricing" && productInfo && (
          <PricingDetails productTitle={productInfo.productTitle} onBack={handleBackToProduct} />
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-12 mb-20">
        {step === "product" && (
          <button
            onClick={handleProductContinue}
            className="bg-black text-white font-semibold px-6 py-3 hover:bg-gray-800 transition cursor-pointer"
          >
            CONTINUE TO PRICING
          </button>
        )}
        {step === "pricing" && (
          <button
            onClick={() => {}}
            className="bg-black text-white font-semibold px-6 py-3 hover:bg-gray-800 transition cursor-pointer"
          >
            CONTINUE TO AUTHENTICATION
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white text-center p-4">
        <p>&copy; 2025 Trendies Morocco. All rights reserved.</p>
      </footer>
    </main>
  );
}
