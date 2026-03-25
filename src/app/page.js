import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Recipe Maker
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore thousands of recipes, create your own, and share your
            culinary masterpieces with our passionate cooking community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/my-recipes"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition inline-block"
            >
              Browse Recipes
            </Link>
            <Link
              href="/new-recipe"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition inline-block"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Recipe Maker?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">
                Vast Collection
              </h4>
              <p className="text-gray-600">
                Browse and discover thousands of recipes from cuisines around
                the world.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✨</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">
                Easy to Create
              </h4>
              <p className="text-gray-600">
                Share your favorite recipes with detailed instructions and
                beautiful photos.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">👥</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">
                Community Driven
              </h4>
              <p className="text-gray-600">
                Connect with food lovers, rate recipes, and get cooking tips
                from experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Recipes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-br from-orange-200 to-red-200 h-48 flex items-center justify-center">
                  <span className="text-6xl">🍝</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Delicious Pasta
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    A classic Italian pasta dish with homemade sauce and fresh
                    ingredients.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">⏱️ 30 min</span>
                    <button className="text-orange-500 hover:text-orange-600 font-semibold">
                      View →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start cooking?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of home cooks sharing their culinary creations.
          </p>
          <button className="bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
            Get Started Free
          </button>
        </div>
      </section>
    </main>
  );
}
