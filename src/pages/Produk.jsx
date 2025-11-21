// src/pages/Sales.jsx
import { ShoppingCart, Heart } from "lucide-react";

const products = [
  // KAOS
  {
    id: 1,
    name: "Kaos Basic Putih",
    category: "Kaos",
    price: 120000,
    image:
      "https://via.placeholder.com/300x400?text=Kaos+Basic+Putih",
  },
  {
    id: 2,
    name: "Kaos Oversize Hitam",
    category: "Kaos",
    price: 150000,
    image:
      "https://via.placeholder.com/300x400?text=Kaos+Oversize+Hitam",
  },

  // CELANA
  {
    id: 3,
    name: "Celana Chino Cream",
    category: "Celana",
    price: 200000,
    image:
      "https://via.placeholder.com/300x400?text=Celana+Chino+Cream",
  },
  {
    id: 4,
    name: "Celana Jeans Biru",
    category: "Celana",
    price: 230000,
    image:
      "https://via.placeholder.com/300x400?text=Celana+Jeans+Biru",
  },
];

export default function Sales() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] px-6 py-10">
      <section className="max-w-6xl mx-auto">
        {/* Judul & Filter sederhana */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Koleksi Produk
            </h1>
            <p className="text-sm text-gray-600">
              Pilih kaos dan celana favoritmu di Kavva.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white">
              Semua
            </button>
            <button className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white">
              Kaos
            </button>
            <button className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white">
              Celana
            </button>
          </div>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* Gambar produk */}
              <div className="w-full aspect-[3/4] bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info produk */}
              <div className="p-3 md:p-4 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  {product.category}
                </p>
                <h2 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-sm md:text-base font-bold text-gray-900">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                {/* Tombol aksi */}
                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 rounded-full border border-gray-900 px-3 py-2 text-xs md:text-sm font-medium hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    <ShoppingCart size={16} />
                    Tambah ke Keranjang
                  </button>

                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-200 hover:scale-105 active:scale-95 transition-transform"
                    aria-label="Tambah ke wishlist"
                  >
                    <Heart size={18} className="stroke-gray-700" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
