import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // State untuk input login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function login
  const handleLogin = async (e) => {
    e.preventDefault();

    // 1️⃣ LOGIN PAKAI SUPABASE
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 2️⃣ Jika gagal
    if (error) {
      alert("Login gagal: " + error.message);
      return;
    }

    // 3️⃣ Simpan status login (dipakai Header)
    localStorage.setItem("isLoggedIn", "true");

    // 4️⃣ Debug alert
    alert("Login berhasil! User ID: " + data.user.id);

    // 5️⃣ Redirect user
    navigate("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF7F0] px-4 relative">

      {/* TOMBOL KEMBALI */}
      <button
        className="absolute left-4 top-20 z-[999] p-2 bg-white/90 rounded-full shadow-sm hover:scale-110 transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} className="text-black" />
      </button>

      {/* CARD LOGIN */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md z-0">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Masuk ke Akun
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Masukkan email..."
              className="w-full mt-1 px-4 py-3 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password..."
              className="w-full mt-1 px-4 py-3 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-9 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* BUTTON LOGIN */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-black/90 transition"
          >
            Login
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">atau</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* LINK REGISTER */}
          <p className="text-center text-sm text-gray-600">
            Belum punya akun?
            <a href="/register" className="text-black font-medium underline ml-1">
              Daftar Sekarang
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
