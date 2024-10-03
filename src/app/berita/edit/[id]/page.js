"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditArticle = ({ params }) => {
  const { id } = params;

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [isinya, setIsinya] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/articles/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch article");
          }
          const result = await response.json();

          setJudul(result.data.article.judul);
          setKategori(result.data.article.kategori);
          setGambar(result.data.article.gambar);
          setIsinya(result.data.article.isinya);

          if (result.data.article.status === "published") {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    validateFormEdit();
  }, [judul, kategori, gambar, isinya]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const validateFormEdit = () => {
    const newErrors = {};
    const judulMinLength = 20;
    const isinyaMinLength = 150;
    const isinyaMaxLength = 1500;

    if (!judul) {
      newErrors.judul = "Judul wajib diisi";
    } else if (judul.length < judulMinLength) {
      newErrors.judul = `Judul minimal ${judulMinLength} karakter`;
    }

    if (!kategori) {
      newErrors.kategori = "Kategori wajib diisi";
    }

    if (!gambar) {
      newErrors.gambar = "Gambar wajib diisi";
    } else if (!/^https?:\/\//.test(gambar)) {
      newErrors.gambar = "URL gambar harus diawali dengan https://";
    }

    if (!isinya) {
      newErrors.isinya = "Isi berita wajib diisi";
    } else if (isinya.length < isinyaMinLength) {
      newErrors.isinya = `Isi berita minimal ${isinyaMinLength} karakter`;
    } else if (isinya.length > isinyaMaxLength) {
      newErrors.isinya = `Isi berita maksimal ${isinyaMaxLength} karakter`;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ judul, kategori, gambar, isinya }),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white rounded shadow">
      <div className="mb-5">
        <a href="/dashboard" className="hover:underline">
          Kembali
        </a>
      </div>
      <div className="flex items-center mb-4 gap-x-5">
        <div className="mr-3">
          <img src="/logo.svg" alt="Logo" className="w-24" />
        </div>
        <h2 className="text-2xl font-bold">Edit Berita</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className={`border rounded px-3 py-2 w-full ${
              errors.judul ? "border-red-500" : ""
            }`}
          />
          {errors.judul && (
            <p className="text-red-500 text-sm">{errors.judul}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            className={`border rounded px-3 py-2 w-full ${
              errors.kategori ? "border-red-500" : ""
            }`}
          >
            <option value="">Pilih Kategori</option>
            <option value="entertainment">Entertainment</option>
            <option value="automotive">Automotive</option>
            <option value="health">Health</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="sport">Sport</option>
            <option value="foods">Foods</option>
          </select>
          {errors.kategori && (
            <p className="text-red-500 text-sm">{errors.kategori}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gambar URL</label>
          <input
            type="text"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            required
            className={`border rounded px-3 py-2 w-full ${
              errors.gambar ? "border-red-500" : ""
            }`}
          />
          {errors.gambar && (
            <p className="text-red-500 text-sm">{errors.gambar}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Isi Berita</label>
          <textarea
            value={isinya}
            onChange={(e) => setIsinya(e.target.value)}
            required
            className={`border rounded px-3 py-2 w-full ${
              errors.isinya ? "border-red-500" : ""
            }`}
            rows="4"
          />
          {errors.isinya && (
            <p className="text-red-500 text-sm">{errors.isinya}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
            Object.keys(errors).length > 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={loading || Object.keys(errors).length > 0}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
