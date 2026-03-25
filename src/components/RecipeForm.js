"use client";

import { useState } from "react";
import { generateRecipe, saveRecipe } from "../app/new-recipe/actions";
import RecipeResults from "./RecipeResults";

export default function RecipeForm() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecipe(null);
    setSuccess(null);

    try {
      const formData = new FormData(e.target);

      // Collect multiple dietary requirements
      const dietaryRequirements = formData.getAll("dietary");
      const dietaryString =
        dietaryRequirements.length > 0
          ? dietaryRequirements.join(", ")
          : "No restrictions";

      // Create a new FormData object with the combined dietary string
      const modifiedFormData = new FormData();
      modifiedFormData.append("ingredients", formData.get("ingredients"));
      modifiedFormData.append("cuisineType", formData.get("cuisineType"));
      modifiedFormData.append("dietary", dietaryString);
      modifiedFormData.append("preferences", formData.get("preferences"));

      const result = await generateRecipe(modifiedFormData);

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

  async function handleSave() {
    setLoading(true);
    setError(null);

    try {
      const result = await saveRecipe(recipe);

      if (result.success) {
        setSuccess("Recipe saved successfully!");
        setRecipe(null);
        setTimeout(() => setSuccess(null), 3000);
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

  function handleDiscard() {
    setRecipe(null);
    setError(null);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
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
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white"
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
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white"
            >
              <option value="">Any Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Thai">Thai</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Greek">Greek</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Turkish">Turkish</option>
              <option value="Lebanese">Lebanese</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Dietary Requirements
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vegetarian"
                  name="dietary"
                  value="vegetarian"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="vegetarian"
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  Vegetarian
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vegan"
                  name="dietary"
                  value="vegan"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="vegan"
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  Vegan
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="gluten-free"
                  name="dietary"
                  value="gluten-free"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="gluten-free"
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  Gluten-free
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dairy-free"
                  name="dietary"
                  value="dairy-free"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="dairy-free"
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  Dairy-free
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keto"
                  name="dietary"
                  value="keto"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="keto"
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  Keto
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="paleo"
                  name="dietary"
                  value="paleo"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="paleo"
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  Paleo
                </label>
              </div>
            </div>
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
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white"
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
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-green-900 font-semibold mb-2">Success!</h3>
            <p className="text-green-700">{success}</p>
          </div>
        )}
        <RecipeResults
          recipe={recipe}
          error={error}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      </div>
    </div>
  );
}
