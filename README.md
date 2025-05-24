# Price Suggestion Feature

This feature helps sellers determine competitive pricing based on real-time market data by suggesting a **minimum bid** and an optional **buy now** price when listing a new product.

> It searches based on the title of the item but it will be able to do more intelligent searches like condition, size, material, colour and gender which I am currently implementing.

---

## Live App

- **Live App**: _https://trendies-price-suggestion.vercel.app/new-listing(https://trendies-price-suggestion.vercel.app/new-listing)_

---

## What It Does

- Adds a **GET PRICE SUGGESTION** button to the product submission form.
- Fetches **market prices** from Google Shopping via SerpAPI (as an example, this will be expanded to more APIs and web scraping).
- Calculates and displays:
  - Suggested **Minimum Bid** (70% of median market price)
  - Suggested **Buy Now Price** (110% of median market price)
  - Platform fee breakdown: commission, service, and seller fees
  - Net amount seller receives
- Handles all API errors gracefully.

---

## Future Improvements

- Currently working on more detailed searches like condition, size, material, colour and gender, which affect the suggested price (in testing at the moment).
- For now only uses

## Improvements & Future Work

| Area              | Suggestion                                                                 |
|-------------------|---------------------------------------------------------------------------|
| Accuracy          | Incorporate condition, size, material, colour and gender for more precise matching (currently testing this)                    |
| Performance       | Because the API fetch can be slow at times, trigger price suggestion in the **previous step** to prefetch data in the background, reducing wait time and improving UX |
| Validation        | Add product title sanitisation and debouncing                             |
| Error Handling    | Show user-friendly messages for edge cases                                |
| Data Sources      | Expand beyond SerpAPI — integrate **multiple APIs** and **web scraping** to increase price coverage and robustness |
| Predictive Pricing| Use a **machine learning model** trained on product attributes and historical prices to suggest pricing |
