"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/utils/db";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

export async function generateRecipe(formData) {
  try {
    const ingredients = formData.get("ingredients");
    const dietary = formData.get("dietary");
    const preferences = formData.get("preferences");
    const cuisineType = formData.get("cuisineType");

    const prompt = `You are an expert chef and culinary instructor. Your task is to create a delicious, practical recipe based entirely on the user's input. 

Assume the user already has access to basic pantry staples such as water, cooking oil, salt, and black pepper.

Keep in mind that the final recipe will be read by cooking enthusiasts who may be beginners in the kitchen. Ensure the tone is professional yet approachable. The instructions must be clear, sequential, and easy to follow without assuming advanced culinary knowledge. 

Crucially, do NOT include step numbers (e.g., "1.", "2.") or bullet points in the instructions. The application UI handles the numbering automatically. 

Do not include any conversational filler, introductory text, or blog-style padding. 

Please provide the recipe in the following JSON format. Output ONLY valid JSON without any markdown code block wrappers or additional text:
{
  "name": "Recipe Name",
  "ingredients": "Comma-separated list of ingredients with quantities",
  "instructions": "Step-by-step cooking instructions separated by a period and space, containing NO numbers or bullet points",
  "servings": "Number of servings",
  "prepTime": "Preparation time in minutes",
  "cookTime": "Cooking time in minutes"
}

User Input:
- Ingredients available: ${ingredients}
- Dietary requirements: ${dietary || "No specific dietary requirements"}
- Cuisine type: ${cuisineType || "Any cuisine"}
- Additional preferences: ${preferences || "None"}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    console.log(text);
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

export async function saveRecipe(recipe) {
  try {
    const query = `
      INSERT INTO recipes (name, ingredients, instructions, servings, prep_time, cook_time)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const result = await db.query(query, [
      recipe.name,
      recipe.ingredients,
      recipe.instructions,
      recipe.servings,
      recipe.prepTime,
      recipe.cookTime,
    ]);

    return {
      success: true,
      message: "Recipe saved successfully!",
      recipeId: result.rows[0].id,
    };
  } catch (error) {
    console.error("Error saving recipe:", error);
    return {
      success: false,
      error: error.message || "Failed to save recipe",
    };
  }
}
