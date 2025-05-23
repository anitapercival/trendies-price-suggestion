# Price Suggestion Feature

This repository contains a technical challenge submission implementing the **Price Suggestion** feature in the product listing form.

Live site: [https://trendies-price-suggestion.vercel.app/new-listing](https://trendies-price-suggestion.vercel.app/new-listing)
Example: Try "Omega" for Brand and "Watches" for Category.

---

## Feature Overview

### Price Suggestion

When a seller fills out the product listing form, the app automatically suggests a price based on the selected **brand** and **category**. This is done by querying existing product prices in the database to calculate an average price, helping sellers price their items competitively.

- If both brand and category are selected, prices are fetched for products matching both.
- If no matches, fallback queries by category or brand alone are performed.
- The average price from matched products is calculated and suggested.
- The suggested price is auto-filled in the form if the price field is empty.
- If no data is found, no suggestion is shown.

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS  
- **Backend:** NestJS, Prisma, PostgreSQL  
- **Tooling:** TypeScript, pnpm (monorepo)  
- **Deployment:** Vercel  

---

# How It Works

- The frontend form component uses React state and effects to track the listing data.
- When brand or category changes, it triggers a fetch request to the backend endpoint /products/price-suggestion.
- The NestJS backend uses Prisma to query the database for matching products and retrieves their prices.
- It calculates the average price and returns it to the frontend.
- The frontend displays the suggested price and auto-fills the price input if it is empty.
- Form submission currently logs the form data to the console.

---

# Code Highlights
- Backend Endpoint: GET /products/price-suggestion
- Queries the product table filtering by brand and/or category, calculates average price, handles errors gracefully.
- Frontend Form: Uses React hooks (useState, useEffect) to manage form data and fetch price suggestions dynamically.
- Responsive, adapting layout and size to various screen widths to ensure the UI remains clean and usable on mobile, tablet, and desktop devices.

---

# Improvements & Next Steps
- Advanced Price Suggestion Algorithms: Incorporate machine learning or statistical models to suggest prices more accurately, considering additional factors like product condition, seller ratings, seasonal trends, and price fluctuations over time.
- User Personalisation: Tailor price suggestions based on the seller’s past listings, location, or preferences.
- Form Validation & UX Enhancements: Add inline validation with helpful tooltips, clear error messages, and loading skeletons or spinners to improve form responsiveness and clarity.
- Extend API for Additional Filters: Allow price suggestions to factor in more granular filters like product condition, colour, or size.
