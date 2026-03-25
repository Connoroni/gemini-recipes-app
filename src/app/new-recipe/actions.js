"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

export async function generateRecipe(formData) {
  try {
    const ingredients = formData.get("ingredients");
    const dietary = formData.get("dietary");
    const preferences = formData.get("preferences");
    const cuisineType = formData.get("cuisineType");

    const prompt = `Generate a detailed recipe based on these requirements:
- Ingredients available: ${ingredients}
- Dietary requirements: ${dietary || "No specific dietary requirements"}
- Cuisine type: ${cuisineType || "Any cuisine"}
- Additional preferences: ${preferences || "None"}

Please provide the recipe in the following JSON format:
{
  "name": "Recipe Name",
  "ingredients": "Comma-separated list of ingredients with quantities",
  "instructions": "Step-by-step cooking instructions",
  "servings": "Number of servings",
  "prepTime": "Preparation time in minutes",
  "cookTime": "Cooking time in minutes"
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        success: false,
        error: "Failed to parse recipe data",
      };
    }

    const recipeData = JSON.parse(jsonMatch[0]);
    return {
      success: true,
      recipe: recipeData,
    };
  } catch (error) {
    console.error("Error generating recipe:", error);
    return {
      success: false,
      error: error.message || "Failed to generate recipe",
    };
  }
}
