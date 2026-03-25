"use client";

import { useState } from "react";
import { generateRecipe } from "./actions";
import RecipeResults from "./RecipeResults";

export default function RecipeForm() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const formData = new FormData(e.target);
      const result = await generateRecipe(formData);

      if (result.success) {
        setRecipe(result.recipe);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label
              htmlFor="ingredients"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Ingredients Available
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              placeholder="e.g., chicken, tomatoes, garlic, olive oil..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              rows="3"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="cuisineType"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Cuisine Type
            </label>
            <select
              id="cuisineType"
              name="cuisineType"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">Any Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Asian">Asian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="French">French</option>
              <option value="American">American</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="dietary"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Dietary Requirements
            </label>
            <select
              id="dietary"
              name="dietary"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="">No restrictions</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="dairy-free">Dairy-free</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="preferences"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Additional Preferences
            </label>
            <textarea
              id="preferences"
              name="preferences"
              placeholder="e.g., quick meal (under 30 mins), spicy, comfort food..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-2">
        <RecipeResults recipe={recipe} error={error} />
      </div>
    </div>
  );
}
