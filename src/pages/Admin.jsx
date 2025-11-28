import { useState } from "react";
import { Trash2, Pencil, Plus, Menu, X } from "lucide-react";

// Dummy Data Orders
const dummyOrders = [
  {
    id: 1,
    noResi: "RESI001",
    namaPemesan: "Aldi Saputra",
    alamat: "Jl. Kenangan No. 21",
    produk: [
      { nama: "Nike Air Max", qty: 1, harga: 1500000 },
      { nama: "Adidas Hoodie", qty: 2, harga: 450000 },
    ],
  },
  {
    id: 2,
    noResi: "RESI002",
    namaPemesan: "Siti Rahma",
    alamat: "Jl. Sudirman No. 10",
    produk: [
      { nama: "Converse 70s", qty: 1, harga: 850000 },
    ],
  },
];

export default function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data produk (ditambah kolom grade)
  const [products, setProducts] = useState([
    {
      id: 1,
      nama: "Sepatu Santai",
      brand: "Nike",
      kategori: "Footwear",
      performance: "Running",
      stok: 12,
      grade: "BNIB",
      gambar1: "url-gambar-1",
      gambar2: "url-gambar-2",
    },
    {
      id: 2,
      nama: "Kaos Sport",
      brand: "Adidas",
      kategori: "Apparel",
      performance: "Training",
      stok: 25,
      grade: "VNDS",
      gambar1: "url-gambar-1",
      gambar2: "url-gambar-2",
    },
  ]);

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleInsert = () => {
    alert("Insert produk baru (dummy)");
  };

  const handleDeleteOrder = (id) => {
    alert("Order ID " + id + " berhasil dihapus (dummy)");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  // UI konten halaman berdasarkan menu
  const renderContent = () => {
    if (activePage === "profile") {
      return (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3">Profile Admin</h2>
          <p>Data admin diambil dari database (nanti kamu hubungkan Supabase).</p>
        </div>
      );
    }

    if (activePage === "products") {
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Data Produk</h1>
            <button
              onClick={handleInsert}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 transition"
            >
              <Plus size={18} /> Tambah Produk
            </button>
          </div>

          <div className="grid grid-cols-9 font-semibold border-b py-3 text-sm">
            <div>Nama</div>
            <div>Brand</div>
            <div>Kategori</div>
            <div>Performance</div>
            <div>Stok</div>
            <div>Grade</div>
            <div>Gambar 1</div>
            <div>Gambar 2</div>
            <div className="text-center">Aksi</div>
          </div>

          {products.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-9 items-center py-3 border-b text-sm"
            >
              <div>{p.nama}</div>
              <div>{p.brand}</div>
              <div>{p.kategori}</div>
              <div>{p.performance}</div>
              <div>{p.stok}</div>
              <div>{p.grade}</div>
              <div>{p.gambar1}</div>
              <div>{p.gambar2}</div>

              <div className="flex gap-3 justify-center">
                <button className="text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activePage === "orders") {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Data Order</h1>

          {dummyOrders.map((o) => (
            <div
              key={o.id}
              className="bg-white border rounded-lg p-4 shadow mb-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">No Resi: {o.noResi}</h3>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteOrder(o.id)}
                >
                  <Trash2 />
                </button>
              </div>

              <p className="mt-2 text-sm">Nama Pemesan: {o.namaPemesan}</p>
              <p className="text-sm">Alamat: {o.alamat}</p>

              <div className="mt-3 font-semibold">Produk:</div>
              <div className="mt-1 ml-2">
                {o.produk.map((p, idx) => (
                  <div key={idx} className="text-sm">
                    {p.nama} × {p.qty} - Rp{p.harga.toLocaleString()}
                  </div>
                ))}
              </div>

              <p className="font-bold mt-3">
                Total Harga: Rp
                {o.produk
                  .reduce((t, p) => t + p.harga * p.qty, 0)
                  .toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Selamat datang di Dashboard Admin</h2>
        <p className="mt-2">Silakan pilih menu di sidebar.</p>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 z-20 transition-all ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <button
          className="mb-6"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={26} />
        </button>

        <ul className="space-y-4 text-lg">
          <li className="cursor-pointer" onClick={() => setActivePage("profile")}>
            Profile Admin
          </li>
          <li className="cursor-pointer" onClick={() => setActivePage("products")}>
            Data Produk
          </li>
          <li className="cursor-pointer" onClick={() => setActivePage("orders")}>
            Data Order
          </li>
          <li
            className="cursor-pointer text-red-600 mt-6"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#FAF7F0] min-h-screen">
        <header className="w-full bg-white shadow py-4 px-6 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={26} />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </header>

        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
