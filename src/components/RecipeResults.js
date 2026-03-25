"use client";

export default function RecipeResults({ recipe, error, onSave, onDiscard }) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-900 font-semibold mb-2">Error</h3>
        <p className="text-red-700">{decodeURIComponent(error)}</p>
      </div>
    );
  }

  if (recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Servings</p>
            <p className="text-xl font-semibold text-orange-600">
              {recipe.servings}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Prep Time</p>
            <p className="text-xl font-semibold text-orange-600">
              {recipe.prepTime} min
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Cook Time</p>
            <p className="text-xl font-semibold text-orange-600">
              {recipe.cookTime} min
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Ingredients
          </h3>
          <ul className="space-y-2">
            {recipe.ingredients.split(",").map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-3">•</span>
                <span className="text-gray-700">{ingredient.trim()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Instructions
          </h3>
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

        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Save Recipe
          </button>
          <button
            onClick={onDiscard}
            className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Discard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-12 text-center h-full flex flex-col items-center justify-center">
      <div className="text-5xl mb-4">🤖</div>
      <p className="text-gray-600">
        Fill in the form and click &quot;Generate Recipe&quot; to get started!
      </p>
    </div>
  );
}
