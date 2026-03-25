import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍳</span>
          <h1 className="text-3xl font-bold">Recipe Maker</h1>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-orange-100 transition">
            Home
          </Link>
          <Link href="/my-recipes" className="hover:text-orange-100 transition">
            My Recipes
          </Link>
          <Link href="/new-recipe" className="hover:text-orange-100 transition">
            Create
          </Link>
          <Link href="/explore" className="hover:text-orange-100 transition">
            Explore
          </Link>
          <Link href="/about" className="hover:text-orange-100 transition">
            About
          </Link>
        </nav>
        <button className="hidden md:block bg-white text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition">
          Sign In
        </button>
      </div>
    </header>
  );
}
