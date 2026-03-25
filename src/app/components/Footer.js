export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span>🍳</span> Recipe Maker
            </h3>
            <p className="text-sm">
              Discover, create, and share delicious recipes with our community.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Browse Recipes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Create Recipe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  My Collection
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Forums
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            &copy; 2024 Recipe Maker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
