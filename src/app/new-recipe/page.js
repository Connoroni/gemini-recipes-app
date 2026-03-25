import RecipeForm from "./RecipeForm";

export default async function NewRecipe() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create New Recipe
        </h1>
        <p className="text-gray-600">
          Tell us about your ingredients and preferences, and AI will generate a
          recipe for you!
        </p>
      </div>

      <RecipeForm />
    </main>
  );
}
