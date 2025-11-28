// src/components/Header.jsx
import { Heart, ShoppingCart, User, Search, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Mencari:", query);
    }
  };

  const categories = [
    {
      name: "Apparel",
      path: "/category/apparel",
      submenu: [
        { label: "Shirts", path: "/category/apparel/shirts" },
        { label: "Pants", path: "/category/apparel/pants" },
        { label: "Shoes", path: "/category/apparel/shoes" },
      ],
    },
    {
      name: "Performance",
      path: "/category/performance",
      submenu: [
        { label: "Running", path: "/category/performance/running" },
        { label: "Sneakers", path: "/category/performance/sneakers" },
        { label: "Football", path: "/category/performance/football" },
        { label: "Basket", path: "/category/performance/basket" },
        { label: "Formals", path: "/category/performance/formal" },
      ],
    },
    {
      name: "Brand",
      path: "/category/brand",
      submenu: [
        { label: "Nike", path: "/category/nike" },
        { label: "Puma", path: "/category/puma" },
        { label: "Adidas", path: "/category/adidas" },
        { label: "Reebok", path: "/category/reebok" },
        { label: "Asics", path: "/category/asics" },
        { label: "New Balance", path: "/category/newbalance" },
      ],
    },
    {
      name: "Accessories",
      path: "/category/accessories",
      submenu: [
        { label: "Socks", path: "/category/accessories/socks" },
        { label: "Bags", path: "/category/accessories/bags" },
        { label: "Hat", path: "/category/accessories/hat" },
        { label: "Bandana", path: "/category/accessories/bandana" },
      ],
    },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-md bg-[#FAF7F0]">
      {/* MAIN HEADER */}
      <div className="flex items-center justify-between px-8 py-4">
        <div
          className="font-bold text-xl cursor-pointer relative -top-1"
          onClick={() => navigate("/")}
        >
          Kavva
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Cari produk..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full px-4 py-2 pr-10 bg-white border border-[#E5E1D8] rounded-xl outline-none focus:ring-2 focus:ring-[#D8D4CA] transition"
            />
            <Search
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 self-start mt-1">
          <button
            className="bg-transparent border-none outline-none p-0 hover:bg-transparent"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart strokeWidth={1.5} size={24} className="text-black" />
          </button>

          <button
            className="bg-transparent border-none outline-none p-0 hover:bg-transparent"
            onClick={() => navigate("/wishlist")}
          >
            <Heart strokeWidth={1.5} size={24} className="text-black" />
          </button>

          {user ? (
            <button
              className="bg-transparent border-none outline-none p-0 hover:bg-transparent"
              onClick={() => navigate("/dashboard")}
            >
              <User size={24} className="text-black" />
            </button>
          ) : (
            <button
              className="bg-transparent border-none outline-none p-0 hover:bg-transparent"
              onClick={() => navigate("/login")}
            >
              <span className="text-black text-sm font-medium">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY BAR */}
      <nav className="w-full px-8 pb-3">
        <ul className="flex items-center justify-center gap-10 text-sm font-bold text-gray-900">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="relative group cursor-pointer flex items-center gap-1"
            >
              <div className="flex items-center gap-2 pb-1 hover:text-black transition">
                {cat.name}

                {cat.submenu.length > 0 && (
                  <span className="transition-all duration-300">
                    <ChevronRight
                      size={16}
                      className="text-gray-600 group-hover:hidden block transition-all duration-300"
                    />
                    <ChevronDown
                      size={16}
                      className="text-gray-900 hidden group-hover:block transition-all duration-300"
                    />
                  </span>
                )}

                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </div>

              {cat.submenu.length > 0 && (
                <div
                  className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-300 z-50"
                >
                  <ul className="py-2">
                    {cat.submenu.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => navigate(item.path)}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
