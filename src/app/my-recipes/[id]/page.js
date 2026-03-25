import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/db";

async function getRecipe(id) {
  try {
    const result = await db.query("SELECT * FROM recipes WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

export default async function RecipeDetail({ params }) {
  const recipe = await getRecipe((await params).id);

  if (!recipe) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recipe Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the recipe you&apos;re looking for.
          </p>
          <Link
            href="/my-recipes"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/my-recipes"
        className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8 font-semibold"
      >
        <span className="mr-2">←</span> Back to My Recipes
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {recipe.image_url && (
          <Image
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full h-96 object-cover"
            width={800}
            height={400}
          />
        )}
        {!recipe.image_url && (
          <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
            <span className="text-8xl">🍳</span>
          </div>
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {recipe.name}
          </h1>
          <p className="text-gray-600 mb-8">
            Created on {new Date(recipe.created_at).toLocaleDateString()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Servings</p>
              <p className="text-2xl font-semibold text-orange-600">
                {recipe.servings ?? "?"}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Prep Time</p>
              <p className="text-2xl font-semibold text-orange-600">
                {recipe.prep_time ?? "?"}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Cook Time</p>
              <p className="text-2xl font-semibold text-orange-600">
                {recipe.cook_time ?? "?"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.split(",").map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-3 flex-shrink-0">
                      •
                    </span>
                    <span className="text-gray-700">{ingredient.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.instructions
                  .split(".")
                  .filter(Boolean)
                  .map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="font-semibold text-orange-500 flex-shrink-0">
                        {index + 1}.
                      </span>
                      <span className="text-gray-700">
                        {instruction.trim() + "."}
                      </span>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
