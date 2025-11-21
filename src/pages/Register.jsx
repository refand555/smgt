import { useState } from "react";
import { Eye, EyeOff, ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";
import  supabase  from "../lib/supabaseClient";

export default function Register() {
 const [username, setName] = useState("");
 const [email, setEmail] = useState("");
 const [alamat, setAlamat] = useState("");
 const [no_hp, setno_hp] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");

 const handleRegister = async () => {
  // 1. VALIDASI SEBELUM APA PUN!
  if (!username || !email || !alamat || !no_hp || !password || !confirmPassword) {
    alert("Semua data wajib diisi!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi password tidak sama!");
    return;
  }

  // 2. SIGN UP SUPABASE
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // 3. INSERT KE DATABASE
  const { error: insertError } = await supabase
    .from("user")
    .insert({
      id: data.user.id,
      username,
      email,
      password,
      alamat,
      no_hp: no_hp,
      role: "user",
    });

  if (insertError) {
    alert(insertError.message);
    return;
  }

  alert("Registrasi berhasil!");
  navigate("/login");
};


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF7F0] px-4">
      <button
  className="absolute left-4 top-4 p-2 bg-white/80 rounded-full shadow-sm hover:scale-110 transition"
  onClick={() => navigate(-1)}
>
  <ArrowLeft size={20} className="text-black" />
</button>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Daftar Akun Baru
        </h1>

        <form
          className="space-y-5"
             onSubmit={(e) => {
             e.preventDefault();
             handleRegister();      // kembali ke halaman login
          }}
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama kamu..."
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-4 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8] focus:border-[#CFCBBF] focus:ring-2 focus:ring-[#D8D4CA] transition-all"
              required/>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-4 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8] focus:border-[#CFCBBF] focus:ring-2 focus:ring-[#D8D4CA] transition-all"
              required/>
          </div>

          {/* Alamat */}
          <div>
            <label className="text-sm font-medium text-gray-700">Alamat</label>
            <input
              type="text"
              placeholder="Masukkan Alamat..."
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full mt-1 px-4 py-4 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8] focus:border-[#CFCBBF] focus:ring-2 focus:ring-[#D8D4CA] transition-all"
              required/>
          </div>

          {/* No Hp */}
          <div>
            <label className="text-sm font-medium text-gray-700">No Hp</label>
            <input
              type="tel"
              placeholder="Masukkan No Hp..."
              value={no_hp}
              onChange={(e) => setno_hp(e.target.value)}
              className="w-full mt-1 px-4 py-4 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8] focus:border-[#CFCBBF] focus:ring-2 focus:ring-[#D8D4CA] transition-all"
              required/>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-4 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8]"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangi password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-4 py-4 rounded-xl outline-none bg-[#FAF7F0] border border-[#E5E1D8]"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-600"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            // onClick={handleRegister}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-black/90 transition"
          >
            Daftar
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Sudah punya akun?
          <a href="/login" className="text-black font-medium underline ml-1">
            Masuk Sekarang
          </a>
        </p>

      </div>
    </main>
  );
}
