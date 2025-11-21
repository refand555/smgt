import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Data user
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");

  // Ambil data user saat halaman dibuka
  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login"); // kalau belum login kirim ke login
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setUsername(data.username);
        setEmail(data.email);
        setAlamat(data.alamat);
        setNoHp(data.no_hp);
      }

      setLoading(false);
    };

    getUserData();
  }, [navigate]);

  // Update data user
  const handleUpdate = async () => {
    const { error } = await supabase
      .from("user")
      .update({
        username: username,
        email: email,
        alamat: alamat,
        no_hp: noHp,
      })
      .eq("id", userId);

    if (error) {
      alert("Gagal update: " + error.message);
    } else {
      alert("Profile berhasil diperbarui!");
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-col gap-4">

        <div>
          <label className="font-medium">Username</label>
          <input
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Alamat</label>
          <input
            className="w-full border p-2 rounded"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">No HP</label>
          <input
            className="w-full border p-2 rounded"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
          />
        </div>

        <button
          className="bg-black text-white py-2 rounded-lg hover:opacity-80"
          onClick={handleUpdate}
        >
          Update Profile
        </button>

        <button
          className="bg-red-500 text-white py-2 rounded-lg hover:opacity-80"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}
