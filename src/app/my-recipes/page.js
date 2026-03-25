import Image from "next/image";
import db from "@/utils/db";

async function getRecipes() {
  try {
    const result = await db.query(
      "SELECT * FROM recipes ORDER BY created_at DESC",
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export default async function MyRecipes() {
  const recipes = await getRecipes();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Recipes</h1>
        <p className="text-gray-600">
          {recipes.length === 0
            ? "You haven't created any recipes yet."
            : `You have ${recipes.length} recipe${recipes.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            Start by creating your first recipe!
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition">
            Create Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              {recipe.image_url && (
                <Image
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                  width={300}
                  height={192}
                />
              )}
              {!recipe.image_url && (
                <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                  <span className="text-6xl">🍳</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {recipe.name}
                </h3>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Ingredients:
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {recipe.ingredients}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Instructions:
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {recipe.instructions}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>
                    {new Date(recipe.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition text-sm">
                    View
                  </button>
                  <button className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded font-semibold transition text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
