'use client'

import React, { useState, useEffect } from 'react'

type FormData = {
  title: string
  description: string
  brand: string
  category: string
  price: number | ''
}

export default function ListItemForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    brand: '',
    category: '',
    price: '',
  })

  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null)
  const [loadingSuggestion, setLoadingSuggestion] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch price suggestion whenever brand or category changes
  useEffect(() => {
    async function fetchPriceSuggestion() {
      // If either brand or category is empty, reset suggestion
      if (!formData.brand || !formData.category) {
        setSuggestedPrice(null)
        return
      }

      setLoadingSuggestion(true)
      setError(null)

      try {
        const query = new URLSearchParams({
          brand: formData.brand,
          category: formData.category,
        })

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/price-suggestion?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch price suggestion')

        const data = await res.json()
        // If API returns a suggested price, update state
        if (data.suggestedPrice !== null) {
          setSuggestedPrice(data.suggestedPrice)
          // If price field is empty, autofill it with suggested price
          if (formData.price === '') {
            setFormData(prev => ({ ...prev, price: data.suggestedPrice }))
          }
        } else {
          setSuggestedPrice(null)
        }
      } catch (e) {
        setError((e as Error).message)
        setSuggestedPrice(null)
      } finally {
        setLoadingSuggestion(false)
      }
    }

    fetchPriceSuggestion()
    // Re-run this effect when brand or category changes
  }, [formData.brand, formData.category])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    if (name === 'price') {
      const numberValue = value === '' ? '' : Number(value)
      setFormData(prev => ({ ...prev, price: numberValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <div>
        <label htmlFor="title" className="block font-semibold">
          Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="brand" className="block font-semibold">
          Brand*
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block font-semibold">
          Category*
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block font-semibold">
          Price* {loadingSuggestion && <span className="text-sm text-gray-500">Checking...</span>}
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price === '' ? '' : formData.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
          min={0}
        />
        {suggestedPrice !== null && !loadingSuggestion && (
          <p className="text-sm text-gray-600">Suggested price: {suggestedPrice} MAD</p>
        )}
      </div>

      <div>
        <label htmlFor="photo" className="block font-semibold mb-1">
          Photo
        </label>
        <button
          type="button"
          onClick={() => console.log('Attach photo clicked')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
        >
          Attach Photo
        </button>
      </div>

      {/* Display error messages if any */}
      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className="bg-black text-white uppercase tracking-widest font-medium rounded-sm px-6 py-3 hover:bg-gray-100 hover:text-black transition-colors duration-300 disabled:opacity-50 mx-auto block cursor-pointer"
        disabled={loadingSuggestion}
      >
        List Item
      </button>
    </form>
  )
}
