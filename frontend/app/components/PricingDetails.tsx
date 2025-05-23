"use client";

import React, { useState } from "react";
import axios from "axios";

interface PricingDetailsProps {
  productTitle: string;
  onBack: () => void;
}

const Tooltip = ({ text }: { text: string }) => (
  <div className="relative group inline-block ml-1">
    <div className="w-3.5 h-3.5 rounded-full bg-white border border-gray-400 text-gray-700 text-[10px] font-bold flex items-center justify-center cursor-pointer select-none">
      i
    </div>
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 bg-black text-white text-xs p-2 rounded shadow-lg z-10">
      {text}
    </div>
  </div>
);

const PricingDetails: React.FC<PricingDetailsProps> = ({ productTitle, onBack }) => {
  const [minBid, setMinBid] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetSuggestion = async () => {
    if (!productTitle) {
      setError("Product title is missing.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.get<{
        suggestedMinBid: number | null;
        suggestedBuyNow: number | null;
      }>("http://localhost:3001/market/scan-price", {
        params: { product: productTitle },
      });

      const { suggestedMinBid, suggestedBuyNow } = res.data;



      if (suggestedMinBid !== null) {
        setMinBid(suggestedMinBid.toFixed(2));
      } else {
        setError("No suggested minimum bid found.");
      }

      if (suggestedBuyNow !== null) {
        setBuyNowPrice(suggestedBuyNow.toFixed(2));
      } else {
        // Not necessarily error — buy now is optional
        setBuyNowPrice("");
      }
    } catch {
      setError("Failed to fetch price suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 border border-gray-200 p-6 bg-white shadow-sm rounded">
      <div className="mb-4">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-black flex items-center text-sm font-medium mb-2"
        >
          <span className="mr-2 text-xl">←</span> Back to Product Details
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Side */}
        <div className="md:w-1/2 w-full">
          <label className="block text-sm font-semibold mb-1">PRICING & BIDDING</label>

          <label className="block text-xs font-medium mb-1 mt-4">MINIMUM ACCEPTABLE BID (MAD) *</label>
          <input
            type="number"
            value={minBid}
            onChange={(e) => setMinBid(e.target.value)}
            placeholder="Price"
            className="w-full border border-gray-300 px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
          />

          <label className="block text-xs font-medium mb-1 mt-4">BUY NOW PRICE (MAD)</label>
          <input
            type="number"
            value={buyNowPrice}
            onChange={(e) => setBuyNowPrice(e.target.value)}
            placeholder="Optional"
            className="w-full border border-gray-300 px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
          />

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 mb-4">
            <a href="#" className="text-xs underline text-gray-600 hover:text-black cursor-pointer">
              CHECK SIMILAR ITEMS
            </a>
            <button
              onClick={handleGetSuggestion}
              className="text-xs underline text-gray-600 hover:text-black disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              {loading ? "GETTING PRICE SUGGESTION..." : "GET PRICE SUGGESTION"}
            </button>
          </div>

          {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300 mx-6"></div>

        {/* Right Side */}
        <div className="md:w-1/2 w-full mt-8 md:mt-0">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span>Minimum Bid Price</span>
              <span>{minBid || "0.00"} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                Commission
                <Tooltip text="10% commission (varies from 10% to 30% depending on the sale price)" />
              </span>
              <span>{((+minBid || 0) * 0.1).toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                Service Fees
                <Tooltip text="5% service fee for transaction management and customer support" />
              </span>
              <span>{((+minBid || 0) * 0.05).toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                Seller Fees
                <Tooltip text="3% seller fee for account management and associated services" />
              </span>
              <span>{((+minBid || 0) * 0.03).toFixed(2)} MAD</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span>Suggested Buy Now Price</span>
              <span>{buyNowPrice || "-" } MAD</span>
            </div>
          </div>

          <div className="my-4 border-t border-gray-300"></div>

          <div className="flex justify-between font-semibold text-sm">
            <span>You Get</span>
            <span>
              {(+minBid - (+minBid * 0.1 + +minBid * 0.05 + +minBid * 0.03)).toFixed(2)} MAD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
