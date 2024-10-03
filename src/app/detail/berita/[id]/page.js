import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";
import { FaRegStar } from "react-icons/fa6";
import Link from "next/link";

async function fetchArticleData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch article data");
  const data = await res.json();
  return data.data;
}

async function fetchMoreArticles(authorId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/author/${authorId}?status=published&limit=5`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch more articles");
  const data = await res.json();
  return data.data;
}

export default async function DetailBerita({ params }) {
  const { id } = params;

  try {
    const data = await fetchArticleData(id);
    const moreArticles = await fetchMoreArticles(data.article.authorId);

    const { article, author } = data || {};

    return (
      <div>
        <Header />
        <div className="mx-auto flex flex-col justify-center items-center my-5 gap-y-5">
          <p className="text-lg">
            {new Date(article?.tanggal).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            - <b>{article?.kategori}</b>
          </p>
          <p className="text-5xl font-bold text-center">{article?.judul}</p>
          <div className="flex flex-row gap-x-2">
            <div className="border border-hint rounded-full w-[50px] h-[50px] bg-border">
              <img
                src={
                  author?.role === "user"
                    ? `/images/${author.gambar}`
                    : author.gambar
                }
                alt="Author"
                className="object-cover rounded-full"
              />
            </div>
            <div className="my-auto">
              <h1 className="text-sm font-bold">{author?.nama}</h1>
              <p className="text-[9pt] text-hint">{author?.profesi}</p>
            </div>
            {article?.status === "published" ? (
              <div className="my-auto ml-10 flex flex-row items-center">
                <div className="flex flex-row mr-1">
                  <FaRegStar className="text-primary" />
                  <FaRegStar className="text-primary" />
                  <FaRegStar className="text-primary" />
                  <FaRegStar className="text-primary" /> <FaRegStar />
                </div>
                <p className="text-sm font-bold">(16,190)</p>
              </div>
            ) : (
              <div className="my-auto ml-10 flex flex-row items-center">
                <p className="text-sm text-yellow-600">[Drafted]</p>
              </div>
            )}
          </div>
        </div>
        <div className="relative w-full h-[400px] overflow-hidden border border-border mt-10">
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="absolute top-0 left-0 w-1/3 h-full overflow-hidden opacity-60">
              <img
                src={article?.gambar}
                alt={"Gambar Detail"}
                className="w-full h-full object-cover transform scale-x-[-1]"
              />
            </div>
            <div className="relative z-10 w-1/2 h-full">
              <img
                src={article?.gambar}
                alt={"Gambar Detail"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-60">
              <img
                src={article?.gambar}
                alt={"Gambar Detail"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="max-w-7xl ml-auto p-6 pl-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h2 className="font-bold text-lg mb-4">Sinopsis:</h2>
                <p className="text-gray-700">{article?.isinya}</p>
                {article?.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Read more
                  </a>
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg mb-4">More From Author</h2>
                <div className="space-y-3">
                  {moreArticles
                    .filter(
                      (articleMore) => articleMore.judul !== article?.judul
                    )
                    .map((articleMore) => (
                      <div key={articleMore._id}>
                        <Link
                          href={`/detail/berita/${articleMore._id}`}
                          className="flex items-center bg-gray-100 p-3 rounded-lg shadow"
                        >
                          <div className="border border-hint rounded-full w-[50px] h-[45px] bg-border flex items-center justify-center overflow-hidden">
                            <img
                              src={articleMore.gambar}
                              alt="gambar berita"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="pl-3">
                            <h3 className="font-semibold">
                              {articleMore.judul}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {new Date(
                                articleMore.tanggal
                              ).toLocaleDateString()}{" "}
                              - {articleMore.kategori}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              {article?.status === "published" ? (
                <div className="flex items-center gap">
                  <p className="font-bold">Beri Rating:</p>
                  <div className="flex flex-row ml-1">
                    <FaRegStar className="hover:text-primary" />
                    <FaRegStar className="hover:text-primary" />
                    <FaRegStar className="hover:text-primary" />
                    <FaRegStar className="hover:text-primary" />
                    <FaRegStar className="hover:text-primary" />
                  </div>
                </div>
              ) : (
                <div className="my-auto ml-10 flex flex-row items-center">
                  <p className="text-sm text-yellow-600">
                    [Berita ini belum diterbitkan]
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
